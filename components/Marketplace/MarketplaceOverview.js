import Offers from "./Offers";
import UserOffers from "./UserOffers";

export default function MarketplaceOverview({ toggleMoneyUpdate }) {
  return (
    <>
      <UserOffers />
      <Offers />
    </>
  );
}
