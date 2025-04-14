# Dragon Web App

Este é um aplicativo web construído com React e Vite para gerenciamento de dragões. O aplicativo permite aos usuários realizar login, visualizar uma lista de dragões, cadastrar novos dragões, editar ou excluir dragões existentes, além de visualizar os detalhes de cada dragão específico.

## Funcionalidades

- **Página de Login**:

  - A única página acessível para usuários não autenticados.
  - O usuário pode fazer login com o email `me@email.com` e a senha `*Abc`.
  - Após o login, o usuário é redirecionado para a página principal.

- **Página de Lista de Dragões**:

  - Exibe a lista de dragões, ordenada alfabeticamente pelos nomes.
  - O usuário pode ver, editar ou excluir os dragões diretamente da lista.

- **Página de Cadastro de Dragões**:

  - Permite cadastrar novos dragões com nome, tipo e histórias.

- **Página de Detalhes de Dragão**:
  - Exibe as informações de um dragão específico, incluindo:
    - Criado em;
    - Nome;
    - Tipo.
    - Histórias.

## Estrutura do Projeto

O projeto segue a seguinte estrutura de pastas:

```
src/
├── assets/          # Recursos estáticos (imagens, ícones, etc.)
├── components/      # Componentes reutilizáveis
│   ├── Input/
│   └── PrimaryButton/
├── contexts/        # Gerenciamento de estado global
├── hooks/           # Hooks personalizados
│   └── useAuth.js
├── pages/           # Páginas principais (Login, Home, etc.)
│   ├── Login/
│   └── Home/
├── routes/          # Arquivos de rotas do aplicativo
└── services/        # Interações com APIs ou outras fontes
```

Dentro de cada **componente**, há uma pasta contendo o arquivo `index.jsx`, o respectivo arquivo de estilo `*.module.css` e o arquivo de teste `*.test.jsx`.
Já nas páginas, há apenas o `index.jsx` e o arquivo de estilo `*.module.css`.

### Exemplo de estrutura de um componente

```
components/
├── Input/
│   ├── index.jsx          # Componente React
│   ├── Input.module.css   # Estilo específico do componente
│   └── Input.test.jsx     # Teste do componente
```

### Exemplo de estrutura de uma página

```
pages/
├── Login/
│   ├── index.jsx          # Página React
│   └── Login.module.css   # Estilo específico da página
```

## Como Rodar Localmente

### Pré-requisitos

- **Node.js**: [Instalar Node.js](https://nodejs.org/)
- **Docker**: [Instalar Docker](https://www.docker.com/get-started)
- **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)

1. Clone este repositório em seu computador:

   ```bash
   git clone https://github.com/jean-cassio/dragon-web-app.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd dragon-web-app
   ```

3. **Usando Docker e Docker Compose**

   Para rodar o projeto com Docker, basta executar o comando:

   ```bash
   docker-compose up --build
   ```

   Isso irá construir a imagem Docker e iniciar o aplicativo usando o Nginx para servir o conteúdo. O aplicativo estará disponível em `http://localhost:8080`.

4. **Sem Docker** (apenas com Node.js):

   Caso prefira rodar o projeto sem Docker, basta seguir os seguintes passos:

   1. Instale as dependências do projeto:

      ```bash
      npm install
      ```

   2. Inicie o servidor de desenvolvimento:

      ```bash
      npm run dev
      ```

   3. O aplicativo estará disponível em `http://localhost:3010`.

### Acessando o App

- **Login inicial**:
  - Email: `me@email.com`
  - Senha: `*Abc`

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Ferramenta de build e bundling para aplicações modernas.
- **React Router**: Gerenciamento de rotas.
- **React Toastify**: Biblioteca para mostrar notificações de sucesso e erro.
- **Axios**: Para realizar chamadas HTTP.
- **CSS Modules**: Estilos em componentes de forma modular.
- **Docker**: Para facilitar o empacotamento e a execução do aplicativo em contêineres.
- **Docker Compose**: Para orquestrar múltiplos containers, incluindo o aplicativo e o Nginx.
- **Nginx**: Servidor web usado para servir o conteúdo do aplicativo.

## Testes Automatizados

O projeto utiliza **Jest** e **React Testing Library** para testes unitários e de componentes.

### Bibliotecas de Teste

- **Jest**: Test runner e framework de asserção.
- **@testing-library/react**: Utilitários para renderização e interação com componentes React.
- **@testing-library/jest-dom**: Matchers customizados para melhorar os testes com o DOM.
- **jsdom**: Emulação de DOM no Node.js.

### Rodando os Testes

```bash
npm test
```

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
