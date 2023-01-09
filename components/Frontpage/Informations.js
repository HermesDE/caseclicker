import { Title, Text, Grid, Container } from "@mantine/core";
import { openModal } from "@mantine/modals";
import RedeemCodeModal from "../Navigation/RedeemCodeModal";

export default function Informations() {
  return (
    <>
      <Container fluid mt={50}>
        <Grid>
          <Title order={2}>News and Informations</Title>
        </Grid>
        <Grid mt={10}>
          <Text weight={400}>
            Promocodes cannot be used multiple times with multiple accounts
            using the same email!
          </Text>
        </Grid>
        <Grid mt={10}>
          <Text
            onClick={() =>
              openModal({
                title: "Redeem Code",
                children: <RedeemCodeModal codeName={"2023"} />,
              })
            }
            sx={{ cursor: "pointer" }}
            color={"red"}
            weight={500}
          >
            Use code 2023 for two random knifes!
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
