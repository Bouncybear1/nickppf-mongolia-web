import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, vin, service, message } = body;

        // Basic validation
        if (!name || !phone || !vin || !service) {
            return NextResponse.json(
                { error: "Missing required fields" },
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

        await sheet.addRow({
            ID: crypto.randomUUID(),
            Status: "not-verified",
            "Directus ID": "",
            Name: name,
            Email: email,
            Phone: phone,
            VIN: vin,
            Service: service,
            Message: message,
            Date: new Date().toISOString(),
            "Service Date": "",
            "Warranty End Date": ""
        });

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
