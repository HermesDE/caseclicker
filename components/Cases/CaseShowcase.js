import { Center, Container, Grid, Loader, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import CaseCard from "./CaseCard";
import useSound from "use-sound";
import { useLocalStorage } from "@mantine/hooks";

export default function CaseShowcase({
  toggleMoneyUpdate,
  money,
  userOpenedCases,
  rank,
}) {
  const [cases, setCases] = useState([]);
  const [customCases, setCustomCases] = useState([]);
  const [caseOpenSound] = useSound("/sounds/caseOpen.mp3", { volume: 0.1 });
  const [caseOpenAnimationSound] = useSound("/sounds/caseOpenAnimation.mp3", {
    volume: 0.1,
  });

  const [loading, setLoading] = useState(true);
  const [cardSize] = useLocalStorage({
    key: "cardSize",
    defaultValue: "normal",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/cases");
      if (!response.ok) return;
      let cases = await response.json();
      cases = cases.sort((a, b) => a.rankNeeded - b.rankNeeded);
      setCases(cases);
    }
    async function fetchCustomCases() {
      const response = await fetch("/api/customCases");
      if (!response.ok) return;
      let cases = await response.json();
      cases = cases.sort((a, b) => a.rankNeeded - b.rankNeeded);
      setCustomCases(cases);
    }
    setLoading(true);
    fetchData();
    fetchCustomCases();
    setLoading(false);
  }, []);

  return (
    <Container fluid>
      {loading || !cardSize ? (
        <Center mt={50}>
          <Loader size={"xl"} color="orange" />
        </Center>
      ) : (
        <Tabs
          styles={{ tab: { fontSize: 20, fontWeight: 500 } }}
          defaultValue={"cases"}
        >
          <Tabs.List mb={20} grow position="center">
            <Tabs.Tab p={20} value="cases">
              Cases
            </Tabs.Tab>
            <Tabs.Tab p={20} value="customCases">
              Custom Cases
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="cases">
            <Grid grow>
              {cases.length > 0 &&
                cases.map((c) => {
                  return (
                    <Grid.Col
                      key={c._id}
                      xs={12}
                      sm={6}
                      lg={6}
                      xl={cardSize === "small" ? "content" : 4}
                    >
                      <CaseCard
                        toggleMoneyUpdate={toggleMoneyUpdate}
                        id={c._id}
                        name={c.name}
                        iconUrl={c.iconUrl}
                        price={c.price}
                        money={money}
                        rank={rank}
                        link={c.link}
                        neededOpenedCases={c.neededOpenedCases}
                        rankNeeded={c.rankNeeded}
                        userOpenedCases={userOpenedCases}
                        caseOpenSound={caseOpenSound}
                        caseOpenAnimationSound={caseOpenAnimationSound}
                        customCase={false}
                        moneyEarned={c.moneyEarned}
                        moneySpend={c.moneySpend}
                        openedCount={c.openedCount}
                        size={cardSize}
                      />
                    </Grid.Col>
                  );
                })}
            </Grid>
          </Tabs.Panel>
          <Tabs.Panel value="customCases">
            <Grid>
              {customCases.length > 0 &&
                customCases.map((c) => {
                  return (
                    <Grid.Col key={c._id} xs={12} sm={6} lg={6} xl={4}>
                      <CaseCard
                        toggleMoneyUpdate={toggleMoneyUpdate}
                        id={c._id}
                        name={c.name}
                        iconUrl={c.iconUrl}
                        price={c.price}
                        money={money}
                        link={c.link}
                        neededOpenedCases={c.neededOpenedCases}
                        rankNeeded={c.rankNeeded}
                        userOpenedCases={userOpenedCases}
                        caseOpenSound={caseOpenSound}
                        caseOpenAnimationSound={caseOpenAnimationSound}
                        customCase={true}
                        moneySpend={c.moneySpend}
                        moneyEarned={c.moneyEarned}
                        openedCount={c.openedCount}
                        size={cardSize}
                        rank={rank}
                      />
                    </Grid.Col>
                  );
                })}
            </Grid>
          </Tabs.Panel>
        </Tabs>
      )}
    </Container>
  );
}
