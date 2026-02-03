import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, services, message } = body;

        // Basic validation
        // Note: VIN is no longer required or expected from frontend to be non-empty,
        // but services must be an array with at least one item.
        if (!name || !phone || !services || !Array.isArray(services) || services.length === 0) {
            return NextResponse.json(
                { error: "Missing required fields or services" },
                { status: 400 }
            );
        }

        // Environment variables check
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
            console.error("Missing Google Sheets environment variables");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Auth
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0]; // Assuming the first sheet

        // Loop through each selected service and add a row
        for (const serviceName of services) {
            await sheet.addRow({
                ID: crypto.randomUUID(),
                Status: "not-verified",
                "Directus ID": "",
                Name: name,
                Email: email,
                Phone: phone,
                VIN: "", // Explicitly blank as requested
                Service: serviceName,
                Message: message,
                Date: new Date().toISOString(),
                "Service Date": "",
                "Warranty End Date": ""
            });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error submitting to Google Sheets:", error);
        // Log detailed error info
        if (error.response) {
            console.error("Google API Error Response:", error.response.data);
        }
        return NextResponse.json(
            { error: "Failed to submit form", details: error.message },
            { status: 500 }
        );
    }
}
