import { TeacherAuth } from "@/types/apiResponse";
import { getToken } from "@/ui/services/storage";
import { useState } from "react";

type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";
type RequestError = {
  status: number;
  message?: string;
};

export default function apiRequest(
  method: RequestMethods,
  path: string,
  body?: any
) {
  // Estado para controle de loading
  const [isLoading, setIsLoading] = useState<boolean>(false); // Use boolean explicitly here
  const [err, setErr] = useState<boolean>(false);

  // Cabeçalhos da requisição
  const requestHeaders = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    "Content-Type": "application/json",
  };

  const submitRequest = async () => {
    const currAuth: TeacherAuth = await getToken(); // Obtém o token de autenticação
    setIsLoading(true); // Ativa o loading antes de fazer a requisição

    const requestParams = {
      headers: {
        ...requestHeaders,
        Authorization: `Bearer ${currAuth?.token ?? ""}`, // Adiciona o token no cabeçalho
      },
      method: method, // Define o método da requisição (GET, POST, etc.)
      body: body ? JSON.stringify(body) : "", // Define o corpo da requisição, se existir
    };

    try {
      // Faz a requisição para o endpoint especificado
      const res = await fetch(
        `https://postech-blog-api.onrender.com${path}`,
        requestParams
      );

      // Verifica se a resposta é um erro (status 4xx ou 5xx)
      if (!res.ok) {
        const errorDetails = await res.json(); // Tenta pegar os detalhes do erro
        throw new Error(
          `Erro na requisição: ${res.status} - ${errorDetails.message || "Sem detalhes"}`
        );
      }

      // Se a resposta for OK, retorna os dados
      const data = await res.json();
      setIsLoading(false); // Desativa o loading após receber a resposta
      return data;
    } catch (error: any) {
      setIsLoading(false); // Desativa o loading se ocorrer erro

      // Se o erro for uma instância de Error, imprime os detalhes no console
      if (error instanceof Error) {
        console.error("Detalhes do erro:", error.message);
      }

      // Marca o erro como verdadeiro para atualizar o estado
      setErr(true);

      // Retorna um objeto de erro com a mensagem
      return { error: true, message: error.message || "Erro desconhecido" };
    }
  };

  return {
    submit: submitRequest, // Função para enviar a requisição
    loading: isLoading,    // Estado que indica se a requisição está carregando
    err: err,              // Estado que indica se houve erro
  };
}
