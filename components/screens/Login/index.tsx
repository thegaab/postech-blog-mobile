import { useNavigate } from "@/ui/navigation";
import { Button, Text, View } from "react-native";

export function LoginScreen() {
  const navigate = useNavigate();

  return (
    <View className="flex justify-center items-center h-full bg-rose-400">
      <Text className="text-white">Hello World</Text>
      <Button title="go to Home" onPress={() => navigate.to("home")} />
    </View>
  );
}
