import PropTypes from "prop-types";
import Nav from "@/components/Nav";
import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const AccountCard = ({ account }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`flex flex-col min-h-screen px-4 md:px-24 py-4 md:py-24 ${inter.className}`}>
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-white hidden md:block">Rates Radar</h1>
        <div className="space-x-4 hidden md:flex">
            <Nav />
        </div>
        <button className="md:hidden text-2xl no-underline hover:underline" onClick={() => setMenuOpen(!menuOpen)}>
          Menu
        </button>
      </nav>
      {menuOpen && (
        <div className="flex flex-col space-y-2 mb-12 md:hidden">
          <Nav />
        </div>
      )}
      <h1 className="text-center text-4xl my-4">{account.account_name}</h1>
      <h3 className="text-center text-2xl mb-8">{account.institution_name}</h3>
      <div className="border-2 border-white p-8 mx-auto w-full md:w-3/4 lg:w-1/2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl text-center font-bold mb-4 md:mb-0">{account.total_interest}% p.a.</h1>
          <div className="border-l-2 border-white h-full md:w-px md:mx-8"></div>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <p>MIN BALANCE<br/>{account.minimum_balance_requirement}</p>
            <p>MAX BALANCE<br/>{account.maximum_balance_requirement}</p>
            <p>PAYMENT FREQUENCY<br/>{account.interest_payment_frequency}</p>
            <p>FEES<br/>{account.account_fees}</p>
            <p>RATING<br/>{account.credit_rating}</p>
            <p>CATEGORY<br/>{account.account_category}</p>
          </div>
        </div>
      </div>
      <p className="my-8 mx-auto md:w-2/3 lg:w-1/2">{account.description}</p>
      <a href={account.url} className="text-center text-white-500 hover:underline">Learn More ↗</a>
    </div>
  );
};

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
    }),
  };

export default AccountCard;
