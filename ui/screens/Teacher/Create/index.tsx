import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Button, Box, Heading, Spinner } from "native-base";
import postTeacher from "@/api/postTeacher";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import Input from "@/components/base/Input";
import { useNavigate } from "@/ui/navigation";

export default function CreateTeacherScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const createTeacher = postTeacher({
    name: name,
    username: username,
    password: password,
  });

  const handleCreateTeacher = async () => {
    if (!name.trim() || !username.trim() || !password.trim()) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const res = await createTeacher.submit();

    if (!res || !res.name) {
      Alert.alert("Erro", "Não foi possível criar o pofessor.");
      console.log(createTeacher.err);
    } else {
      Alert.alert("Sucesso", `Professor criado: ${res.name}`);
      navigate.to("teacherList");
    }
  };

  return (
    <BaseTemplate>
      <Box className="flex justify-center items-center h-full px-2">
        <Heading className="mb-4" colorScheme="secondary" color="primary.600">
          Crie seu login
        </Heading>

        <Box className="mb-8 w-full">
          <Input
            label="Nome"
            name="name"
            value={name}
            onChangeText={(v: string) => setName(v)}
          />
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

          <Button onPress={handleCreateTeacher} className="mt-3">
            {createTeacher.loading ? <Spinner /> : "Criar Usuario!"}
          </Button>
        </Box>
      </Box>
    </BaseTemplate>
  );
}
