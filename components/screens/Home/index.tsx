import { useNavigate } from "@/ui/navigation";
import { Button, Text, View } from "react-native";

export function HomeScreen() {
  const navigate = useNavigate();
  return (
    <View className="flex justify-center items-center h-full bg-teal-800">
      <Text className="text-white">Hello World</Text>
      <Button title="go to Login" onPress={() => navigate.to("login")} />
    </View>
  );
}
