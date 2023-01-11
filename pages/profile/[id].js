import User from "../../lib/database/schemas/user";
import UserStat from "../../lib/database/schemas/userStat";
import OpenedSkin from "../../lib/database/schemas/openedSkin";
import Profile from "../../lib/database/schemas/profile";
import ProfileOverview from "../../components/Profile/ProfileOverview";
import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";
import xpToRank from "../../lib/xpToRank";

export default function Page({
  user,
  userstat,
  money,
  skins,
  profile,
  rank,
  inventory,
}) {
  return (
    <>
      <Head>
        <title>Profile of {user.name} | Case Clicker Online</title>
        <meta
          name="description"
          content="view your profile or from somebody else"
        />
      </Head>
      <Navigation money={money}>
        <ProfileOverview
          user={JSON.parse(user)}
          userstat={JSON.parse(userstat)}
          skins={JSON.parse(skins)}
          inventory={JSON.parse(inventory)}
          profile={JSON.parse(profile)}
          rank={JSON.parse(rank)}
        />
      </Navigation>
    </>
  );
}
export async function getServerSideProps(context) {
  const { id } = context.params;

  const user = await User.findById(id);
  const userstat = await UserStat.findOne({ userId: id });
  const profile = await Profile.findOne({ userId: id });
  const skins = await OpenedSkin.find({ userId: id })
    .sort({ price: -1 })
    .limit(5);
  const value = await OpenedSkin.aggregate([
    { $match: { userId: id } },
    { $group: { _id: null, value: { $sum: "$price" } } },
  ]);
  const count = await OpenedSkin.countDocuments({ userId: id });
  const inventory = { value: value[0].value, count };
  const rank = xpToRank(userstat.xp);

  return {
    props: {
      user: JSON.stringify(user),
      userstat: JSON.stringify(userstat),
      skins: JSON.stringify(skins),
      inventory: JSON.stringify(inventory),
      profile: JSON.stringify(profile),
      rank: JSON.stringify(rank),
    },
  };
}
