import { useNavigate } from "@/ui/navigation";
import { useSessionContext } from "@/ui/providers/authProvider";
import { Box, Button, Heading } from "native-base";

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
          <Button colorScheme="secondary" onPress={logout}>
            Logout
          </Button>
        ) : (
          <Button onPress={() => navigate.to("login")}>Login</Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
