import sheetsApi from "#google-api/sheets/sheetsApi.js";
import { Spreadsheets } from "#postgres/knex.js";

class GoogleSheetsService {
    private async getSpreadsheetIds(): Promise<string[]> {
        const spreadsheetIds = await Spreadsheets().select("spreadsheet_id");
        return spreadsheetIds.map((spreadsheetId) => spreadsheetId.spreadsheet_id);
    }

    async updateSpreadsheets(values: string[][], range: string) {
        const spreadsheetIds = await this.getSpreadsheetIds();

        // Insert values in every spreadsheet
        await Promise.all(spreadsheetIds.map((spreadsheetId) => sheetsApi.updateSpreadsheet(spreadsheetId, values, range)));

        console.log("Successfully updated tables");
    }
}

export default new GoogleSheetsService();
