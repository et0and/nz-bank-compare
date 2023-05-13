import { GoogleSpreadsheet } from "google-spreadsheet";

export default async function handle(_, res) {
  try {
    // Create a new instance of GoogleSpreadsheet with the provided sheet ID
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    // Authenticate using the service account credentials
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load the spreadsheet information
    await doc.loadInfo();

    // Get the first sheet assuming the data is in it
    const sheet = doc.sheetsByIndex[0];

    // Load the header row values
    await sheet.loadHeaderRow();
    const headerRow = sheet.headerValues;

    // Get all the rows of data
    const rows = await sheet.getRows();

    // Map each row to a JSON object using the header values as keys
    const jsonData = rows.map((row) => {
      const data = {};

      headerRow.forEach((header) => {
        // Transform the header key to lowercase and replace spaces with underscores
        const transformedKey = header.toLowerCase().replace(/ /g, "_");
        data[transformedKey] = row[header];
      });

      return data;
    });

    // Send the JSON data as the response
    res.status(200).json(jsonData);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
