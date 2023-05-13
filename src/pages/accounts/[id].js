import { GoogleSpreadsheet } from "google-spreadsheet";
import AccountCard from "@/components/AccountCard";

export default function AccountPage({ account }) {
  return account ? <AccountCard account={account} /> : <p>Loading...</p>;
}

export async function getStaticPaths() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  await sheet.loadHeaderRow();
  const headerRow = sheet.headerValues;

  const rows = await sheet.getRows();

  const data = rows.map((row) => {
    const data = {};

    headerRow.forEach((header) => {
      const transformedKey = header.toLowerCase().replace(/ /g, "_");
      data[transformedKey] = row[header];
    });

    return data;
  });

  const paths = data.map((account) => {
    const accountSlug = `${account.institution_name}-${account.account_name}`.toLowerCase().replace(/ /g, "-");
    return { params: { id: accountSlug } };
  });

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  await sheet.loadHeaderRow();
  const headerRow = sheet.headerValues;

  const rows = await sheet.getRows();

  const data = rows.map((row) => {
    const data = {};

    headerRow.forEach((header) => {
      const transformedKey = header.toLowerCase().replace(/ /g, "_");
      data[transformedKey] = row[header];
    });

    return data;
  });

  const account = data.find((account) => {
    const accountSlug = `${account.institution_name}-${account.account_name}`.toLowerCase().replace(/ /g, "-");
    return accountSlug === params.id;
  });

  return { props: { account } };
}
