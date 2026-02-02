import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { createDirectusItem, fetchDirectus } from "@/lib/directus";

export async function GET() {
    try {
        // Environment variables check
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
            return NextResponse.json(
                { error: "Server configuration error: Missing Google Sheets credentials" },
                { status: 500 }
            );
        }

        // Auth for Google Sheets
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        let syncedCount = 0;
        let errors = [];

        for (const row of rows) {
            const status = row.get("Status");
            const directusId = row.get("Directus ID");

            // Check conditions: Status is verified AND Directus ID is empty
            if (status?.toLowerCase() === "verified" && !directusId) {
                try {
                    // 1. Client Lookup / Creation
                    const rawEmail = row.get("Email");
                    const clientEmail = rawEmail ? rawEmail.trim().toLowerCase() : null;
                    let clientId = null;

                    if (clientEmail) {
                        try {
                            const existingUsers = await fetchDirectus("directus_users", {
                                "filter[email][_eq]": clientEmail
                            });

                            if (existingUsers && existingUsers.length > 0) {
                                clientId = existingUsers[0].id;
                                console.log(`Found existing user: ${clientEmail} (${clientId})`);
                            } else {
                                let roleId = null;
                                const HARDCODED_ROLE_ID = "4f72457e-7770-4d4f-bdb4-16a00ea6feb6";

                                try {
                                    // Try search first
                                    const roles = await fetchDirectus("directus_roles", {
                                        "filter[name][_eq]": "Үйлчлүүлэгч"
                                    });
                                    if (roles && roles.length > 0) roleId = roles[0].id;
                                    else {
                                        console.warn("Role search empty. Using fallback.");
                                        roleId = HARDCODED_ROLE_ID;
                                    }
                                } catch (roleErr) {
                                    console.warn("Role search failed. Using fallback.", roleErr);
                                    roleId = HARDCODED_ROLE_ID;
                                }

                                if (roleId) {
                                    try {
                                        console.log(`Creating user with Role ID: ${roleId}`);
                                        const newUser = await createDirectusItem("directus_users", {
                                            email: clientEmail,
                                            first_name: row.get("Name"),
                                            role: roleId,
                                            phone_number: row.get("Phone")
                                        });
                                        clientId = newUser.id;
                                        console.log(`Created new client user: ${clientEmail} (${clientId})`);
                                    } catch (createErr: any) {
                                        // Handle Duplicate User (Race condition or Permission issue)
                                        const errJson = JSON.stringify(createErr.message || "");
                                        if (errJson.includes("RECORD_NOT_UNIQUE")) {
                                            console.warn("User already exists (RECORD_NOT_UNIQUE). Accessing Directus to retrieve ID manually not possible without Read permissions.");
                                            // Optional: If we had an Admin token, we could force fetch. 
                                            // For now, fail gracefully or leave client null.
                                        } else {
                                            throw createErr;
                                        }
                                    }
                                }
                            }
                        } catch (uErr: any) {
                            console.error("Error handling user sync:", uErr);
                        }
                    }

                    // Map data to Directus Order Schema
                    const orderData: any = {
                        submission_id: row.get("ID"),
                        client_name: row.get("Name"),
                        client_email: row.get("Email"),
                        client_phone: row.get("Phone"),
                        vin: row.get("VIN"),
                        service: row.get("Service"),
                        message: row.get("Message"),
                        status: "verified",
                        request_date: row.get("Date"),
                        service_date: row.get("Service Date") || null,
                        warranty_end_date: row.get("Warranty End Date") || null,
                    };

                    if (clientId) {
                        // RELATIONSHIP FIX:
                        // If 'orders.client' is Many-to-One (M2O), use primitive ID: orderData.client = clientId;
                        // If 'orders.client' is One-to-Many (O2M) (Unlikely but possible), it expects structure.
                        // Assuming M2O:
                        orderData.client = clientId;

                        // If error persists, user might need to check Field Type.
                        // For M2O, 'client': "uuid" is correct.
                    }

                    // Create item in Directus
                    console.log("Creating Order with data:", JSON.stringify(orderData, null, 2));
                    const createdItem = await createDirectusItem("orders", orderData);

                    // Write back Directus ID
                    row.set("Directus ID", createdItem.id);
                    await row.save();

                    syncedCount++;
                } catch (err: any) {
                    console.error(`Failed to sync row ID ${row.get("ID")}:`, err);
                    errors.push({ id: row.get("ID"), error: err.message });
                }
            }
        }

        return NextResponse.json({
            success: true,
            synced: syncedCount,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error: any) {
        console.error("Sync error:", error);
        return NextResponse.json(
            { error: "Failed to execute sync", details: error.message },
            { status: 500 }
        );
    }
}
