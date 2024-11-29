import React, { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Button, Box, Heading, Spinner } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import Input from "@/components/base/Input";
import createStudent from "@/api/createStudent";
import { useNavigate } from "@/ui/navigation";
import { useFocusEffect } from "@react-navigation/native";
import { useSessionContext } from "@/ui/providers/authProvider";

export default function CreateStudentScreen() {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const createRequest = createStudent({ name: name });

  const handleCreateStudent = async () => {
    const student = await createRequest.submit();

    if (student) {
      Alert.alert("Sucesso", `Aluno criado: ${student.name}`);
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
          Crie seu login
        </Heading>
        <Box className="mb-8 w-full">
          <Input
            label="name"
            name="name"
            value={name}
            onChangeText={(v: string) => setName(v)}
          />
          <Button onPress={handleCreateStudent} className="mt-3">
            {createRequest.loading ? <Spinner /> : "Criar aluno!"}
          </Button>
        </Box>
      </Box>
    </BaseTemplate>
  );
}
