import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Button, Box, Heading, Spinner } from "native-base";
import postTeacher from "@/api/postTeacher";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import Input from "@/components/base/Input";

export default function CreateTeacherScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateTeacher = async () => {
    if (!name.trim()) {
      Alert.alert("Erro", "O campo Nome é obrigatório.");
      return;
    }

    try {
      const studentData = { name, username: username || undefined, password: password || undefined };
      const res = await postTeacher(teacherData).submit();
      Alert.alert("Sucesso", `Usuario criado: ${res.name}`);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar o usuario.");
      console.error(error);
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
                label="name"
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

              <Button onPress={handleCreateStudent} className="mt-3">
                 Criar Usuario!
              </Button>
            </Box>
          </Box>
        </BaseTemplate>
  );
}
