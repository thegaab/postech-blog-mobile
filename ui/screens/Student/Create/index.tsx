import React, { useState } from "react";
import { Alert } from "react-native";
import { Button, Box, Heading, Spinner } from "native-base";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import Input from "@/components/base/Input";
import createStudent from "@/api/createStudent";

export default function CreateStudentScreen() {
  const [name, setName] = useState("");

  const createRequest = createStudent({ name: name });

  const handleCreateStudent = async () => {
    const student = await createRequest.submit();
    Alert.alert("Sucesso", `Aluno criado: ${student.name}`);
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
          <Button onPress={handleCreateStudent} className="mt-3">
            {createRequest.loading ? <Spinner /> : "Criar aluno!"}
          </Button>
        </Box>
      </Box>
    </BaseTemplate>
  );
}
