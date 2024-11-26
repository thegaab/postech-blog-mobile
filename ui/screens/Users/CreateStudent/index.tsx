import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Button, Box, Heading, Spinner } from "native-base";
import postStudent from "@/api/postStudents";
import BaseTemplate from "@/ui/templates/BaseTemplate";
import Input from "@/components/base/Input";

export default function CreateStudentScreen() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  const handleCreateStudent = async () => {
    if (!name.trim()) {
      Alert.alert("Erro", "O campo Nome é obrigatório.");
      return;
    }

    try {
      const studentData = { name, grade: grade || undefined };
      const res = await postStudent(studentData).submit();
      Alert.alert("Sucesso", `Aluno criado: ${res.name}`);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar o aluno.");
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
                label="Grade"
                name="grade"
                value={grade}
                onChangeText={(v: string) => setGrade(v)}
              />

              <Button onPress={handleCreateStudent} className="mt-3">
                 Criar aluno!
              </Button>
            </Box>
          </Box>
        </BaseTemplate>
  );
}
