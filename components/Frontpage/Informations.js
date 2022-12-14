import { Title, Text, Grid, Container } from "@mantine/core";
import { openModal } from "@mantine/modals";
import RedeemCodeModal from "../Navigation/RedeemCodeModal";

export default function Informations() {
  return (
    <>
      <Container fluid mt={50}>
        <Grid>
          <Title order={1}>News and Informations</Title>
        </Grid>
        <Grid mt={10}>
          <Text weight={400}>
            Attention! This application is currently under rapid development and
            is still in an early testing phase. It is not guaranteed that all
            user data will be preserved.
          </Text>
        </Grid>
        <Grid mt={10}>
          <Text
            onClick={() =>
              openModal({
                title: "Redeem Code",
                children: <RedeemCodeModal codeName={"xmas"} />,
              })
            }
            sx={{ cursor: "pointer" }}
            color={"red"}
            weight={500}
          >
            Use code xmas for 1000 dollars!
          </Text>
        </Grid>
        <Grid mt={30}>
          <Text color={"yellow"} weight={500}>
            <a
              href="https://discord.gg/hdPqd2z5NZ"
              target={"_blank"}
              rel="noreferrer"
            >
              Join our discord!
            </a>
          </Text>
        </Grid>
      </Container>
    </>
  );
}
