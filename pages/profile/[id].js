import User from "../../lib/database/schemas/user";
import UserStat from "../../lib/database/schemas/userStat";
import OpenedSkin from "../../lib/database/schemas/openedSkin";
import Profile from "../../lib/database/schemas/profile";
import ProfileOverview from "../../components/Profile/ProfileOverview";
import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";

export default function Page({ user, userstat, money, skins, profile }) {
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
          profile={JSON.parse(profile)}
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

  return {
    props: {
      user: JSON.stringify(user),
      userstat: JSON.stringify(userstat),
      skins: JSON.stringify(skins),
      profile: JSON.stringify(profile),
    },
  };
}
