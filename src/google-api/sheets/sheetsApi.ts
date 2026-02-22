import { google, sheets_v4 } from "googleapis";
import env from "#config/env/env.js";

enum valueInputOption {
    USER_ENTERED = "USER_ENTERED", // Let google convert string to correct types
    RAW = "RAW", // Insert all values as string
}

class SheetsApi {
    private readonly SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
    private readonly sheets: sheets_v4.Sheets;

    constructor() {
        // Auth with service account
        const authClient = new google.auth.GoogleAuth({
            scopes: this.SCOPES,
            credentials: {
                client_email: env.GOOGLE_SERVICE_EMAIL,
                private_key: env.GOOGLE_SERVICE_API_KEY.replace(/\\n/g, "\n"),
            },
        });
        const sheets = google.sheets({ version: "v4", auth: authClient });
        this.sheets = sheets;
    }

    async updateSpreadsheet(spreadsheetId: string, values: string[][], range: string): Promise<void> {
        await this.createSheetIfNotExist(spreadsheetId, range.split("!")[0]);

        await this.updateSheet(spreadsheetId, values, range);
    }

    async getSheetsList(spreadsheetId: string): Promise<sheets_v4.Schema$Sheet[]> {
        const response = await this.sheets.spreadsheets.get({
            spreadsheetId,
            fields: "sheets.properties",
        });
        const sheetsList = response.data.sheets || [];

        return sheetsList;
    }

    async createSheetIfNotExist(spreadsheetId: string, sheetName: string): Promise<void> {
        const sheetsList = await this.getSheetsList(spreadsheetId);

        const existingSheet = sheetsList.find((sheet) => sheet.properties?.title === sheetName);

        if (existingSheet) {
            return;
        }

        const requests = [
            {
                addSheet: {
                    properties: {
                        title: sheetName,
                    },
                },
            },
        ];

        try {
            await this.sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                requestBody: { requests },
            });
        } catch (error) {
            console.error("Error while creating new sheet:", error);
        }
    }

    // Inserts values in spreadsheet using range
    async updateSheet(spreadsheetId: string, values: string[][], range: string) {
        await this.sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: valueInputOption.USER_ENTERED,
            requestBody: { values },
        });
    }
}

export default new SheetsApi();
