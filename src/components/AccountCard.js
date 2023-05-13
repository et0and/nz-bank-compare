import PropTypes from "prop-types";

const AccountCard = ({ account }) => (
    <div key={account.id} className="bg-white rounded-lg p-6 shadow-md overflow-hidden">
        {Object.entries(account).map(([key, value]) => (
        <p
            key={key}
            className={`text-gray-500 mb-2 break-words ${
            key === "total_interest" ? "text-2xl font-bold" : ""
            }`}
        >
            {key}: {value}
        </p>
        ))}
    </div>
);

// PropTypes for SavingsAccountCard component
AccountCard.propTypes = {
    account: PropTypes.shape({
      institution_name: PropTypes.string.isRequired,
      institution_type: PropTypes.string.isRequired,
      account_name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      account_category: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      credit_rating: PropTypes.string.isRequired,
      total_interest: PropTypes.string.isRequired,
      interest_calculation_frequency: PropTypes.string,
      interest_payment_frequency: PropTypes.string.isRequired,
      interest_conditions: PropTypes.string,
      withdrawal_restrictions: PropTypes.string,
      minimum_balance_requirement: PropTypes.string,
      maximum_balance_requirement: PropTypes.string,
      account_fees: PropTypes.string.isRequired,
      service_fees_url: PropTypes.string.isRequired,
      overdraft_available: PropTypes.string,
      eligibility_criteria: PropTypes.string,
      online_banking: PropTypes.string.isRequired,
      branch_access: PropTypes.string.isRequired,
    }).isRequired,
  };

export default AccountCard;
