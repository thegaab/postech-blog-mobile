import { useNavigate } from "@/ui/navigation";
import { Text } from "react-native";
import { Button, Box } from "native-base";

export function HomeScreen() {
  const navigate = useNavigate();
  return (
    <Box className="flex justify-center items-center h-full bg-teal-800 w-full">
      <Text className="text-white">Hello World</Text>
      <Button onPress={() => navigate.to("login")}>Go to Login</Button>
    </Box>
  );
}
