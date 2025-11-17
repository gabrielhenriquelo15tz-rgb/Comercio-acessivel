# E-commerce Acessível

Bem-vindo ao repositório do E-commerce Acessível! Este projeto é uma plataforma de comércio eletrônico desenvolvida com foco em inclusão e acessibilidade, projetada para atender às necessidades de idosos e pessoas com diversas deficiências. Nosso objetivo é proporcionar uma experiência de compra online simples, funcional e acessível a todos.

## 🌟 Funcionalidades Principais

*   **Navegação Intuitiva**: Layout limpo e fácil de usar.
*   **Configurações de Acessibilidade**:
    *   Modo de Alto Contraste.
    *   Ajuste de Tamanho da Fonte (16px, 20px, 24px, 32px).
    *   Modo Simplificado (reduz a complexidade visual).
    *   Leitura por Voz (títulos de página e descrições de produtos).
    *   Busca por Voz (na barra de pesquisa do cabeçalho).
*   **Autenticação Flexível**: Login/Cadastro por email e senha, login simplificado por SMS e opções de SSO (Single Sign-On) de demonstração.
*   **Painel Administrativo (Demo)**: Gerenciamento de produtos (adicionar, editar, excluir) para usuários com perfil de administrador.
*   **Carrinho de Compras e Checkout**: Processo de compra simplificado com opções de pagamento (PIX, Cartão de Crédito, Pagamento Assistido).
*   **Listagem e Detalhes de Produtos**: Visualização detalhada de produtos com informações relevantes e recursos de acessibilidade.
*   **Páginas de Suporte**: Ajuda, FAQ e informações de contato.
*   **Sobre o Projeto**: Detalhes sobre a arquitetura, tecnologias e equipe ideal.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

*   **Front-end**:
    *   [React](https://react.dev/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Vite](https://vitejs.dev/) (para o ambiente de desenvolvimento e build)
    *   [Tailwind CSS](https://tailwindcss.com/) (para estilização rápida e responsiva)
    *   [shadcn/ui](https://ui.shadcn.com/) (biblioteca de componentes UI acessíveis e personalizáveis)
    *   [React Router DOM](https://reactrouter.com/en/main) (para gerenciamento de rotas)
    *   [Lucide React](https://lucide.dev/icons/) (para ícones)
    *   [Sonner](https://sonner.emilkowal.ski/) (para notificações de toast)
    *   [React Query](https://tanstack.com/query/latest) (para gerenciamento de estado assíncrono)
    *   API de Web Speech (para reconhecimento e síntese de fala)
*   **Dados Locais (Temporário)**:
    *   `src/lib/localData.ts` (simula uma API de backend para produtos)
    *   `uuid` (para geração de IDs únicos)
*   **Context API**:
    *   `AccessibilityContext` (para gerenciar configurações de acessibilidade globalmente)
    *   `AuthContext` (para gerenciar o estado de autenticação do usuário)

## 🛠️ Como Configurar e Rodar o Projeto

Siga estas instruções para ter uma cópia do projeto rodando em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/) (versão 18 ou superior) e um gerenciador de pacotes (npm, Yarn ou pnpm) instalados.

### Instalação

1.  **Clone o repositório**:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd e-commerce-acessivel
    ```
2.  **Instale as dependências**:
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```
3.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    ```
    O aplicativo estará disponível em `http://localhost:8080` (ou outra porta disponível).

## 📂 Estrutura do Projeto

A estrutura do projeto segue as convenções de um aplicativo React com Vite:

```
.
├── public/                 # Arquivos estáticos (imagens, favicon)
├── src/
│   ├── App.tsx             # Componente principal e rotas
│   ├── main.tsx            # Ponto de entrada da aplicação
│   ├── globals.css         # Estilos globais e variáveis CSS
│   ├── components/         # Componentes reutilizáveis (Header, Footer, UI de shadcn/ui)
│   ├── contexts/           # Contextos globais (AccessibilityContext, AuthContext)
│   ├── hooks/              # Hooks personalizados (use-speech, use-mobile)
│   ├── lib/                # Funções utilitárias e dados locais (localData.ts)
│   ├── pages/              # Páginas principais da aplicação (Home, ProductList, AdminDashboard, etc.)
│   └── utils/              # Utilitários diversos (toast.ts)
├── tailwind.config.ts      # Configuração do Tailwind CSS
├── postcss.config.js       # Configuração do PostCSS
├── vite.config.ts          # Configuração do Vite
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências e scripts do projeto
```

## ♿ Acessibilidade

Este projeto foi construído com um forte foco em acessibilidade, seguindo as diretrizes WCAG 2.1 AA. As principais características incluem:

*   **HTML Semântico**: Uso correto de tags HTML para estruturar o conteúdo de forma lógica.
*   **Atributos ARIA**: Implementação de atributos `aria-label`, `aria-describedby`, `aria-current`, etc., para fornecer informações adicionais a tecnologias assistivas.
*   **Navegação por Teclado**: Todos os elementos interativos são acessíveis e operáveis via teclado.
*   **Foco Visível**: Indicadores de foco claros para todos os elementos interativos.
*   **Contraste de Cores**: Cores selecionadas para garantir contraste adequado, com um modo de alto contraste dedicado.
*   **Tamanho de Fonte Ajustável**: Permite que os usuários aumentem o tamanho do texto para melhor legibilidade.
*   **Modo Simplificado**: Uma opção para reduzir a complexidade visual da interface.
*   **Suporte a Leitores de Tela**: Compatibilidade com leitores de tela populares.
*   **Recursos de Voz**: Integração de reconhecimento e síntese de fala para interação e leitura de conteúdo.

## 🔑 Autenticação (Demonstração)

Para fins de demonstração, você pode usar as seguintes credenciais na página de Login (`/auth`):

*   **Administrador**:
    *   Email: `admin@example.com`
    *   Senha: `adminpass`
*   **Usuário Comum**:
    *   Email: `user@example.com`
    *   Senha: `userpass`

O login como administrador redirecionará para o `/admin` dashboard, enquanto o login como usuário comum redirecionará para a página inicial (`/`).

## 📊 Gerenciamento de Produtos (Painel Administrativo)

O painel administrativo (`/admin`) permite que usuários com a função `admin` gerenciem os produtos. Você pode:

*   Visualizar a lista de produtos existentes.
*   Adicionar novos produtos com nome, descrição, preço, URL da imagem e texto alternativo.
*   Editar detalhes de produtos existentes.
*   Excluir produtos do catálogo.

As alterações são persistidas apenas localmente na memória para esta demonstração.

## 🤝 Contribuição

Contribuições são bem-vindas! Se você tiver sugestões, relatórios de bugs ou quiser adicionar novas funcionalidades, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.