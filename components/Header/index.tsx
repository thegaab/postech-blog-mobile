import { useNavigate } from "@/ui/navigation";
import { Box, Button, Heading } from "native-base";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box className="flex justify-center items-center h-16 bg-stone-800 px-2 w-full">
      <Box className="flex flex-row justify-between items-center w-full">
        <Heading size="md" color="primary.400">
          PosTech
        </Heading>
        <Button onPress={() => navigate.to("login")}>Login</Button>
      </Box>
    </Box>
  );
};

export default Header;
