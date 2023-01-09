import User from "../../lib/database/schemas/user";
import UserStat from "../../lib/database/schemas/userStat";
import OpenedSkin from "../../lib/database/schemas/openedSkin";
import ProfileOverview from "../../components/Profile/ProfileOverview";
import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";

export default function Profile({ user, userstat, money, skins }) {
  return (
    <>
      <Head>
        <title>Profile | Case Clicker Online</title>
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
        />
      </Navigation>
    </>
  );
}
export async function getServerSideProps(context) {
  const { id } = context.params;

  const user = await User.findById(id);
  const userstat = await UserStat.findOne({ userId: id });
  const skins = await OpenedSkin.find({ userId: id })
    .sort({ price: -1 })
    .limit(5);

  return {
    props: {
      user: JSON.stringify(user),
      userstat: JSON.stringify(userstat),
      skins: JSON.stringify(skins),
    },
  };
}
