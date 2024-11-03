import { useNavigate } from "@/ui/navigation";
import { Text } from "react-native";
import { Button, Box } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";

export function LoginScreen() {
  const navigate = useNavigate();

  return (
    <BaseTemplate>
      <Box className="flex justify-center items-center h-full bg-rose-400">
        <Text className="text-white">Hello World</Text>
        <Button onPress={() => navigate.to("home")}>Go to Home</Button>
      </Box>
    </BaseTemplate>
  );
}
