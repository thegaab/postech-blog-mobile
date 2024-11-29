import apiRequest from "./api";

interface PostCreateData {
  title: string;
  text: string;
  keyWords: string[];
}

export default function createPost(postData: PostCreateData) {
  // A requisição POST para criar um novo post
  const req = apiRequest("POST", "/posts/new", postData);
  console.log("Dados enviados:", postData);

  async function submit() {
    try {
      // Envia a requisição e espera pela resposta
      const res = await req.submit();
      console.log("Resposta recebida:", res);
      
      // Retorna os dados da resposta
      return res;
    } catch (error) {
      console.error("Erro ao criar o post", error);
      throw error; 
    }
  }

  return { submit };
}
