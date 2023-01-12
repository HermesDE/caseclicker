import { Center, Container, Grid, Loader, Select, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import CaseCard from "./CaseCard";
import useSound from "use-sound";
import { useLocalStorage } from "@mantine/hooks";
import findRankById from "../../lib/findRankById";

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

  const [count, setCount] = useState("1");

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
        <>
          <Select
            label="Open multiple cases"
            data={[
              { label: "1x", value: "1" },
              {
                label:
                  rank.id < 3 ? `2x ${findRankById(3).name} required` : "2x",
                value: "2",
                disabled: rank.id < 3,
              },
              {
                label:
                  rank.id < 5 ? `3x ${findRankById(5).name} required` : "3x",
                value: "3",
                disabled: rank.id < 5,
              },
              {
                label:
                  rank.id < 6 ? `4x ${findRankById(6).name} required` : "4x",
                value: "4",
                disabled: rank.id < 6,
              },
              {
                label:
                  rank.id < 7 ? `5x ${findRankById(7).name} required` : "5x",
                value: "5",
                disabled: rank.id < 7,
              },
              {
                label:
                  rank.id < 10 ? `6x ${findRankById(10).name} required` : "6x",
                value: "6",
                disabled: rank.id < 10,
              },
              {
                label:
                  rank.id < 11 ? `7x ${findRankById(11).name} required` : "7x",
                value: "7",
                disabled: rank.id < 11,
              },
              {
                label:
                  rank.id < 12 ? `8x ${findRankById(12).name} required` : "8x",
                value: "8",
                disabled: rank.id < 12,
              },
              {
                label:
                  rank.id < 13 ? `9x ${findRankById(13).name} required` : "9x",
                value: "9",
                disabled: rank.id < 13,
              },
              {
                label:
                  rank.id < 14
                    ? `10x ${findRankById(14).name} required`
                    : "10x",
                value: "10",
                disabled: rank.id < 14,
              },
            ]}
            value={count}
            onChange={setCount}
          />
          <Tabs
            styles={{ tab: { fontSize: 20, fontWeight: 500 } }}
            defaultValue={"cases"}
            mt={10}
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
                          count={parseInt(count)}
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
                          count={parseInt(count)}
                        />
                      </Grid.Col>
                    );
                  })}
              </Grid>
            </Tabs.Panel>
          </Tabs>
        </>
      )}
    </Container>
  );
}
