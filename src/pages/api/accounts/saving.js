import { GoogleSpreadsheet } from 'google-spreadsheet';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function saving(req, res) {
    try {
        // Initialize Google Spreadsheet
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
        });
        await doc.loadInfo();

        // Choose the first sheet in the spreadsheet
        const sheet = doc.sheetsByIndex[0];

        // Load all rows from the sheet
        await sheet.loadCells();

        const rows = [];
        const headerRow = sheet.getRow(0);

        // Iterate through each row and create an object
        for (let i = 1; i < sheet.rowCount; i++) {
            const row = {};
            for (let j = 0; j < sheet.columnCount; j++) {
                const headerCell = headerRow.getCell(j);
                const cell = sheet.getCell(i, j);
                row[headerCell.value] = cell.value;
            }
            rows.push(row);
        }

        // Return the rows as JSON
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error converting Google Spreadsheet to JSON:', error);
        res.status(500).json({ error: 'Failed to convert Google Spreadsheet to JSON' });
    }
};