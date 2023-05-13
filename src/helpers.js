// Define a helper function to fetch accounts from the API endpoint
export const fetchAccounts = async () => {
  try {
    // Fetch data from the API endpoint
    const response = await fetch("http://localhost:3000/api/accounts");
    // Convert the response to JSON
    return await response.json();
  } catch (error) {
    // Log any errors
    console.log("Error:", error);
    // Return an empty array if an error occurs
    return [];
  }
};