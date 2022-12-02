import { Grid, SegmentedControl } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import CaseCard from "../Cases/CaseCard";
import SkinCard from "../Inventory/SkinCard";

export default function CardSizeSettings() {
  const [cardSize, setCardSize] = useLocalStorage({
    key: "cardSize",
    defaultValue: "normal",
  });

  return (
    <Grid>
      <Grid.Col span={"content"}>
        <SegmentedControl
          data={[
            { value: "small", label: "Small" },
            { value: "normal", label: "Normal" },
          ]}
          size={"md"}
          value={cardSize}
          onChange={setCardSize}
        />
      </Grid.Col>
      <Grid.Col span={"content"}>
        <SkinCard
          showcase={true}
          name="StatTrak™ AK-47 | Fire Serpent (Factory New)"
          classId="2258156525"
          iconUrl="-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszOeC9H_9mkhIWFg8j1OO-GqWlD6dN-teXI8oThxg3n8kM5ZD-nJI-UJ1c2MFjU-VXolezugZXpvMyan3I3v3Qjty2OlhKpwUYbndZ_4hw"
          price={10000}
          exterior="Factory New"
          rarity="Covert"
          rarityColor="eb4b4b"
          float={0.058655774321281155}
          type="Weapon"
          knifeType={null}
          size={cardSize}
          statTrak={true}
        />
      </Grid.Col>
      <Grid.Col span={"content"}>
        <CaseCard
          name="Operation Phoenix Weapon Case"
          iconUrl={
            "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUuh6qZJmlD7tiyl4OIlaGhYuLTzjhVupJ12urH89ii3lHlqEdoMDr2I5jVLFFSv_J2Rg.png"
          }
          price={4}
          link="https://csgostash.com/case/11/Operation-Phoenix-Weapon-Case"
          neededOpenedCases={0}
          size={cardSize}
          showcase={true}
        />
      </Grid.Col>
    </Grid>
  );
}
