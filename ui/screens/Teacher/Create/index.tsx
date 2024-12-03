import React, { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Button, Box, Heading, Spinner } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import Input from "@/components/base/Input";
import { useNavigate } from "@/ui/navigation";
import createTeacher from "@/api/createTeacher";
import { useFocusEffect } from "@react-navigation/native";
import { useSessionContext } from "@/ui/providers/authProvider";

export default function CreateTeacherScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const createRequest = createTeacher({ name, username, password });

  const handleCreateTeacher = async () => {
    const teacher = await createRequest.submit();

    if (teacher) {
      Alert.alert("Sucesso", `Professor criado: ${teacher.name}`);
      navigate.to("teacherList");
    } else {
      Alert.alert("Não foi possível criar o professor no momento");
    }
  };

  const { authenticate } = useSessionContext();

  useFocusEffect(
    useCallback(() => {
      authenticate();
    }, [])
  );

  return (
    <BaseTemplate>
      <Box className="flex justify-center items-center h-full px-2">
        <Heading className="mb-4" colorScheme="secondary" color="primary.600">
          Novo professor
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
          <Button onPress={handleCreateTeacher} className="mt-3">
            {createRequest.loading ? <Spinner /> : "Criar Usuario!"}
          </Button>
        </Box>
      </Box>
    </BaseTemplate>
  );
}
