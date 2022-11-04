import { Container, Grid, Text, Title } from "@mantine/core";

export default function LegalNotice() {
  return (
    <Container>
      <Grid mt={20}>
        <Title underline>Impressum – Legal Notice</Title>
      </Grid>
      <Grid mt={20}>
        <Title order={4}>Angaben gemäß § 5 TMG </Title>
      </Grid>
      <Grid>
        <p>
          Valentin Wagner<br></br>
          Brühlerwallstraße 5<br></br>
          99084 Erfurt<br></br>
          Deutschland / Germany
        </p>
      </Grid>
      <Grid>
        <Title order={4}>Kontakt</Title>
      </Grid>
      <Grid>
        <p>
          Telefon: 000000<br></br>
          E-Mail:{" "}
          <a href="mailto:info@case-clicker.com">info@case-clicker.com</a>
        </p>
      </Grid>
      <Grid>
        <Title order={4}>Haftungsausschluss</Title>
      </Grid>
      <Grid mt={10}>
        <Text weight={500}>Haftung für Inhalte</Text>
      </Grid>
    </Container>
  );
}
