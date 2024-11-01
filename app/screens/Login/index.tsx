import Input from "@/ui/components/Input";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useNavigate } from "@/ui/utils/navigation";
import { Button } from "native-base";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <BaseTemplate>
      <View className="flex justify-center items-center relative pt-8">
        <Text className="text-lg font-semibold mb-3">Faça seu login</Text>

        <View>
          <Input
            label="Usuário"
            name="username"
            className="border border-1 border-teal-700 bg-teal-100"
            value={username}
            onChangeText={(v) => setUsername(v)}
          />
          <Input
            label="Senha"
            name="username"
            type="password"
            className="border border-1 border-teal-700 bg-teal-100"
            value={password}
            onChangeText={(v) => setPassword(v)}
          />
        </View>

        <Button onPress={() => navigate.to("home")}>Home</Button>
      </View>
    </BaseTemplate>
  );
}
