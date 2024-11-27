import React, { useState } from "react";
import { Alert, Text } from "react-native";
import { Button, Box, Heading, Spinner } from "native-base";
import postStudent from "@/api/postStudents";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import Input from "@/components/base/Input";
import { useNavigate } from "@/ui/navigation";

export default function CreateStudentScreen() {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const createStudent = postStudent({ name });

  const handleCreateStudent = async () => {
    const res = await createStudent.submit();
    Alert.alert("Sucesso", `Aluno criado: ${res.name}`);
    navigate.to("studentList");
  };

  return (
    <BaseTemplate>
      <Box className="flex items-center h-full px-2 py-20">
        <Box className="flex items-center mb-10">
          <Heading size={"2xl"} className="mb-2" colorScheme={"primary"}>
            Novo aluno
          </Heading>
          <Text className="text-white font-normal">
            Cadastre aqui um novo aluno
          </Text>
        </Box>

        <Box className="flex flex-col gap-2 mb-8 w-full">
          <Input
            label="Nome"
            name="name"
            value={name}
            onChangeText={(v: string) => setName(v)}
          />

          <Button onPress={handleCreateStudent} className="mt-3">
            {createStudent.loading ? <Spinner /> : "Criar aluno"}
          </Button>
        </Box>
      </Box>
    </BaseTemplate>
  );
}
