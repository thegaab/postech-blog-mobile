import { useState } from "react";
import Input from "../base/Input";

const SearchBar = () => {
  const [value, setValue] = useState<string>("");
  return (
    <Input
      variant={"rounded"}
      placeholder="Busque aqui"
      name="searchBar"
      value={value}
      onChangeText={(v) => setValue(v)}
    />
  );
};

export default SearchBar;
