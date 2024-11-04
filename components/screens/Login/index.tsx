import { useNavigate } from "@/ui/navigation";
import { Button, Box, Heading } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import { useState } from "react";
import Input from "@/components/base/Input";
import login from "@/api/login";

export function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const loginRequest = login(username, password);

  const submit = async () => {
    const auth: boolean = await loginRequest.submit();

    if (auth) {
      navigate.to("home");
    } else {
      // toaster err
    }
  };

  return (
    <BaseTemplate>
      <Box className="flex justify-center items-center h-full px-2">
        <Heading className="mb-4" colorScheme="secondary" color="primary.600">
          Faça seu login
        </Heading>

        <Box className="mb-8 w-full">
          <Input
            label="Usuário"
            name="username"
            value={username}
            onChangeText={(v: string) => setUsername(v)}
          />
          <Input
            label="Senha"
            name="username"
            value={password}
            type="password"
            onChangeText={(v: string) => setPassword(v)}
          />

          <Button onPress={() => submit()} className="mt-3">
            {loginRequest.loading ? "Autenticando..." : "Entrar!"}
          </Button>
        </Box>

        <Button colorScheme="secondary" onPress={() => navigate.to("home")}>
          Usar deslogado
        </Button>
      </Box>
    </BaseTemplate>
  );
}
