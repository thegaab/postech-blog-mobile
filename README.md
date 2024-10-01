# Tech Challenge - Interface Mobile para Blogging

## Descrição do Projeto
O **Tech Challenge** é um projeto de desenvolvimento de software que tem como objetivo criar uma interface gráfica mobile utilizando **React Native** para uma aplicação de blogging. A interface será integrada a um back-end já existente, desenvolvido em Node.js, e permitirá interações completas entre docentes e alunos.

## Funcionalidades
A aplicação possui as seguintes funcionalidades principais:

### Página Principal (Lista de Posts)
- Exibe uma lista de posts com título, autor e uma breve descrição.
- Inclui um campo de busca para filtrar posts.

### Página de Leitura de Post
- Exibe o conteúdo completo de um post selecionado.
- Comentários opcionais.

### Página de Criação de Posts
- Formulário para criação de posts (título, conteúdo e autor).
- Botão para enviar ao servidor.

### Página de Edição de Posts
- Formulário para editar posts existentes.
- Carrega dados atuais do post para edição.

### Página de Criação de Professores
- Formulário para cadastro de professores.

### Página de Edição de Professores
- Formulário para edição de dados de professores.

### Página de Listagem de Professores
- Listagem paginada de professores com opções de editar e excluir.

### Página Administrativa
- Listagem completa de postagens com opções de editar e excluir.

### Autenticação e Autorização
- Implementa login e permissões específicas para professores e alunos.

## Tecnologias Utilizadas
- **React Native** para o desenvolvimento da interface mobile.
- Hooks e componentes funcionais para gerenciamento de estado e lógica da interface.
- REST API para comunicação com o back-end (posts, alunos, professores, autenticação).
- Context API ou Redux (opcional) para gerenciamento de estado global.

## Requisitos Técnicos
- **React Native**
- Integração com REST API (GET, POST, PUT, DELETE)
- Estilização conforme layout definido pelo grupo
- Gerenciamento de estado com Context API ou Redux (opcional)
- Validação de permissões para professores e alunos

## Configuração do Ambiente

### Pré-requisitos
- Node.js (versão X.X.X)
- Yarn ou npm
- Android Studio ou Xcode (para rodar em dispositivos Android/iOS)

### Passos para rodar o projeto
1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/seu-repositorio.git

2. Instale as dependências:
   ```
   yarn install
   ou
   npm install

3. Execute o projeto:
   ```
   yarn run start
   ou
   npm run start

## Arquitetura do Projeto
- components/: Componentes reutilizaveis da apliacação.
- services/: Módulo para realizar chamadas à API (integração com o back-end).
- assets/: Imagens, ícones e recursos estáticos.

## Boas praticas na contribuição
1. Faça o clone do projeto.
2. Crie uma nova branch:
   ```
   git checkout -b feature/nova-feature

3. Faça as alterações necessárias e faça commit:
   ```
   git commit -am 'Adiciona nova feature'

4. Envie as alterações para sua branch:
   ```
   git push origin feature/nova-feature

5. Abra um Pull Resquest e aguarde para aprovação.

## Equipe
- @cmoutella Carolina Moutella
- @ArthurRodrigues98 Arthur Eduardo
- @JessMotta Jéssica Motta

## Licença
Este projeto está sob a licença MIT.
   

