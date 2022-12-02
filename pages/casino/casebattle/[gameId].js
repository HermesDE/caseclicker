import { useRouter } from "next/router";

export default function CaseBattle() {
  const router = useRouter();
  const { gameId } = router.query;

  return <p>{gameId}</p>;
}
