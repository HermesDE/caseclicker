import { Card, Group, Image, ScrollArea, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function CaseBattleGameCard({ game }) {
  const router = useRouter();
  return (
    <motion.div whileHover={{ scale: 1.01 }}>
      <Card
        onClick={() => router.push(`/casino/casebattle/${game.id}`)}
        sx={{ height: 100, cursor: "pointer" }}
      >
        <Group align={"center"}>
          <Text>{game.id}</Text>
          <ScrollArea style={{ width: 200 }}>
            <Group>
              {game.cases.map((c, i) => {
                return (
                  <Image
                    key={i}
                    alt="case"
                    width={50}
                    src={`/pictures/cases/${c.iconUrl}`}
                  />
                );
              })}
            </Group>
          </ScrollArea>
        </Group>
      </Card>
    </motion.div>
  );
}
