import { Entypo } from "@expo/vector-icons";
import Input from "../base/Input";
import { Box } from "native-base";
import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

interface SearchBarProps {
  onSearch: (s: string) => void;
  onClear: (s: string) => void;
}

const SearchBar = ({ onSearch, onClear }: SearchBarProps) => {
  const [value, setValue] = useState<string>("");
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searching, setSearching] = useState<string>("");

  const handleSearch = () => {
    onSearch(value);
    setSearching(value);
    setSearchActive(true);
  };

  const handleErase = () => {
    onClear("");
    setValue("");
    setSearching("");
    setSearchActive(false);
  };

  const SearchIcon = () => {
    if (!searchActive || value !== searching) {
      return (
        <Entypo
          size={20}
          name="magnifying-glass"
          onPress={handleSearch}
          onPressIn={() => Keyboard.dismiss()}
          selectionColor="primary"
        />
      );
    }

    if (value.length >= 1) {
      return (
        <Entypo
          size={20}
          name="circle-with-cross"
          onPress={handleErase}
          selectionColor="primary"
        />
      );
    }

    return undefined;
  };

  return (
    <Input
      variant={"rounded"}
      placeholder="Busque aqui"
      name="searchBar"
      value={value}
      onChangeText={(v) => setValue(v)}
      InputRightElement={
        <Box className="mr-4 ml-3">
          <SearchIcon />
        </Box>
      }
    />
  );
};

export default SearchBar;
