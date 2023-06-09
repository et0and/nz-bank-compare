import FullAccountCard from "@/components/FullAccountCard";
import { fetchAccountsData, fetchAccountData } from "@/helpers";

// Define the AccountPage component, which takes an account as a prop
export default function AccountPage({ account }) {
  // If the account exists, render the FullAccountCard component, else display 'Loading...'
  return account && (
    <FullAccountCard account={account} />
  );
};
// Define getStaticPaths to pre-render pages based on data fetched from the API
export async function getStaticPaths() {
  // Fetch the account data
  const accountsData = await fetchAccountsData();
  // Map over the data to generate the paths used for static generation
  const paths = accountsData.map((account) => {
    // Return an object with params containing the slug as id
    return { params: { slug: account.slug } };
  });

  // Return the paths for static generation and enable fallback for not-yet-generated pages
  return { paths, fallback: true };
};

// Define getStaticProps to fetch data for each page
export async function getStaticProps({ params }) {
  // Fetch the account data
  const accountData = await fetchAccountData(params.slug);
  // Return the account as a prop
  return {
    props: {
      account: accountData,
    },
  };
}
