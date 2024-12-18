import { useNavigate } from "@/ui/navigation";
import { useSessionContext } from "@/ui/providers/authProvider";
import { Box, Button, Heading } from "native-base";
import { Menu } from "../Menu";

const Header = () => {
  const navigate = useNavigate();
  const { isLogged, logout } = useSessionContext();

  return (
    <Box className="flex justify-center items-center h-16 bg-stone-800 px-2 w-full">
      <Box className="flex flex-row justify-between items-center w-full">
        <Heading
          size="md"
          color="primary.600"
          onPress={() => navigate.to("home")}
        >
          PosTech
        </Heading>
        {isLogged ? (
          <Menu />
        ) : (
          <Button colorScheme="secondary" onPress={() => navigate.to("login")}>
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
