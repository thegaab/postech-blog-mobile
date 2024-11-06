import { useState } from "react";
import Input from "../base/Input";

interface SearchBarProps {
  value: string;
  onChange: (s: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <Input
      variant={"rounded"}
      placeholder="Busque aqui"
      name="searchBar"
      value={value}
      onChangeText={(v) => onChange(v)}
    />
  );
};

export default SearchBar;
