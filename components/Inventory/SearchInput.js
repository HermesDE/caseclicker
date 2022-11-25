import { Grid, TextInput } from "@mantine/core";
import SearchIcon from "../icons/SearchIcon";
import { useState, useEffect } from "react";

export default function SearchInput({ setSearch, mt }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setSearch(input);
    }, 1000);
    return () => clearTimeout(searchTimeout);
  }, [input, setSearch]);

  return (
    <Grid mt={mt}>
      <Grid.Col md={3}>
        <TextInput
          placeholder="Search skins"
          icon={<SearchIcon size={20} />}
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          aria-label="Search skins"
        />
      </Grid.Col>
    </Grid>
  );
}
