import { GoogleSpreadsheet } from "google-spreadsheet";

// Define a helper function to create and authenticate the Google Spreadsheet instance
const authenticateGoogleSheet = async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  return sheet;
};

// Define a helper function to get rows and header values from the sheet
const getRowsAndHeader = async (sheet) => {
  await sheet.loadHeaderRow();
  const headerValues = sheet.headerValues;
  const rows = await sheet.getRows();
  return { headerValues, rows };
};

// Define a helper function to create JSON objects from rows and header values
const createDataFromRows = (rows, headerValues) => {
  return rows.map((row) => {
    let data = {};
    headerValues.forEach((header) => {
      const transformedKey = header.toLowerCase().replace(/ /g, "_");
      data[transformedKey] = row[header];
    });
    const slug = `${data.institution_name} ${data.account_name}`
      .toLowerCase()
      .replace(/ /g, "-");
    return { ...data, slug };
  });
};

export const fetchAccountsData = async () => {
  try {
    const sheet = await authenticateGoogleSheet();
    const { headerValues, rows } = await getRowsAndHeader(sheet);
    const accountsData = createDataFromRows(rows, headerValues);
    return accountsData;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};

export const fetchAccountData = async (slug) => {
  try {
    const sheet = await authenticateGoogleSheet();
    const { headerValues, rows } = await getRowsAndHeader(sheet);
    const accountsData = createDataFromRows(rows, headerValues);
    return accountsData.find((account) => account.slug === slug);
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};