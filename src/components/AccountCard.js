import PropTypes from "prop-types";
import Link from "next/link";

const AccountCard = ({ account }) => (
  <div className="bg-white rounded-lg p-6 shadow-md overflow-hidden hover:bg-gray-300 transition-colors duration-200">
    <h1 className="text-2xl text-black font-bold mb-2">{account.total_interest}% p.a.</h1>
    <h2 className="text-xl text-black mb-2">{account.account_name}</h2>
    <h3 className="text-lg text-black mb-2">{account.institution_name}</h3>
    <div className="grid grid-cols-2 gap-2 text-sm text-black mb-4">
        <p><strong>Min Balance:</strong> {account.minimum_balance_requirement}</p>
        <p><strong>Max Balance:</strong> {account.maximum_balance_requirement}</p>
        <p><strong>Fees:</strong> {account.account_fees}</p>
        <p><strong>Rating:</strong> {account.credit_rating}</p>
      </div>
    <Link href={`/accounts/${account.slug}`}>
      <p className="text-blue-500 cursor-pointer no-underline hover:underline">View More</p>
    </Link>
  </div>
);

AccountCard.propTypes = {
  account: PropTypes.shape({
    institution_name: PropTypes.string.isRequired,
    account_name: PropTypes.string.isRequired,
    total_interest: PropTypes.string.isRequired,
    minimum_balance_requirement: PropTypes.string.isRequired,
    maximum_balance_requirement: PropTypes.string.isRequired,
    account_fees: PropTypes.string.isRequired,
    credit_rating: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};

export default AccountCard;
