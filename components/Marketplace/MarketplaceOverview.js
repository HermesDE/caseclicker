import Offers from "./Offers";
import UserOffers from "./UserOffers";

export default function MarketplaceOverview({ toggleMoneyUpdate, money }) {
  return (
    <>
      <UserOffers />
      <Offers toggleMoneyUpdate={toggleMoneyUpdate} money={money} />
    </>
  );
}
