# 🍔 FSW Donalds — Totem de Autoatendimento

Sistema de autoatendimento estilo totem para restaurantes, com cardápio digital, carrinho de compras e pagamento integrado via **Stripe**. Desenvolvido com **Next.js 15**, **TypeScript**, **Prisma** e **PostgreSQL**, o projeto simula a experiência real de um totem de fast-food, permitindo que o cliente navegue pelo cardápio, monte seu pedido e finalize o pagamento de forma autônoma.

🔗 **Deploy:** [totem-autoatendimento.vercel.app](https://totem-autoatendimento.vercel.app)

> 💡 **Para testar o app no deploy**, após acessar o link acima navegue para: `/fsw-donalds`
> URL completa: [totem-autoatendimento.vercel.app/fsw-donalds](https://totem-autoatendimento.vercel.app/fsw-donalds)

---

## 📸 Screenshots

<div align="center">

| Boas-vindas | Cardápio | Detalhes do Produto |
|-------------|----------|---------------------|
| ![Boas-vindas](./docs/tela-de-boas-vindas.png) | ![Cardápio](./docs/cardapio.png) | ![Detalhes do Produto](./docs/detalhes-produto.png) |

| Sacola | Finalizar Pedido | Checkout Stripe |
|--------|-----------------|-----------------|
| ![Sacola](./docs/sacola.png) | ![Finalizar Pedido](./docs/finalizar-pedido.png) | ![Checkout Stripe](./docs/checkout-stripe.png) |

| Visualizar Pedidos (CPF) | Meus Pedidos | Cardápio por Categoria |
|--------------------------|--------------|------------------------|
| ![Visualizar Pedidos](./docs/visualizar-pedidos-cpf.png) | ![Meus Pedidos](./docs/meus-pedidos.png) | ![Cardápio Bebidas](./docs/cardapio-bebidas.png) |

| Loading Pós-Pagamento |
|-----------------------|
| ![Loading](./docs/sucess-payment.png) |

</div>

---

## 📝 Descrição

O FSW Donalds é uma aplicação **mobile-first** construída com **Next.js 15 (App Router)**. O cliente acessa o sistema pelo slug do restaurante, escolhe entre consumir no local ou retirar, navega pelo cardápio por categorias, adiciona itens ao carrinho e finaliza o pedido com pagamento via cartão de crédito processado pelo Stripe.

O projeto utiliza **Server Components** para busca de dados, **Server Actions** para criação de pedidos e integração com Stripe, e **Client Components** apenas onde há interatividade (carrinho, quantidade, formulários).

---

## ✨ Funcionalidades

### 🏠 Entrada no Restaurante
- Acesso via slug único do restaurante (`/{slug}`)
- Tela de boas-vindas com logo e nome do estabelecimento
- Seleção do método de consumo: **comer no local** ou **para levar**

### 📋 Cardápio
- Listagem de categorias com navegação horizontal por scroll
- Produtos filtrados por categoria com imagem, nome, descrição e preço
- Navegação para página de detalhes do produto

### 🛒 Produto e Carrinho
- Página de detalhes com imagem, nome, preço, descrição e lista de ingredientes
- Controle de quantidade antes de adicionar ao carrinho
- Carrinho lateral (Sheet) com todos os itens adicionados
- Ajuste de quantidade e remoção de itens diretamente no carrinho
- Exibição do total e quantidade de itens em barra fixa no rodapé

### 💳 Finalização do Pedido
- Formulário com nome e CPF (com validação e máscara)
- Criação do pedido no banco via Server Action
- Redirecionamento para checkout do **Stripe** para pagamento por cartão
- Webhook para atualização automática do status do pedido após pagamento
- Tela de loading animada pós-pagamento com hambúrguer sendo montado camada por camada
- Redirecionamento seguro via `router.replace()` — elimina a página do Stripe do histórico do navegador, evitando que o botão nativo de voltar do celular retorne para o checkout expirado

### 📦 Acompanhamento de Pedidos
- Acesso à listagem de pedidos pelo CPF do cliente
- Exibição de status em tempo real: Pendente, Em preparo, Pagamento confirmado, Finalizado, Falhou
- Histórico com restaurante, itens e valor total de cada pedido

---

## 🛠️ Tecnologias

### Core
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) **Next.js 15** — Framework React com App Router, Server Components e Server Actions
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React 19** — Biblioteca para construção de interfaces
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript 5** — Tipagem estática

### Banco de Dados
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) **PostgreSQL** — Banco de dados relacional
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) **Prisma** — ORM type-safe com migrations e seed

### Estilização & UI
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) **Tailwind CSS** — Estilização utilitária com tema customizado
- **shadcn/ui** — Componentes acessíveis: Button, Card, Drawer, Form, Input, Label, ScrollArea, Separator, Sheet e Sonner

### Pagamentos
- ![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white) **Stripe** — Processamento de pagamentos via Checkout Session + Webhooks

### Formulários & Validação
- **React Hook Form** — Gerenciamento de formulários performático
- **Zod + @hookform/resolvers** — Validação de schemas com inferência de tipos
- **react-number-format** — Máscara para CPF

### Fontes
- **Poppins** — Tipografia principal da interface

---

## 🗂️ Estrutura de Pastas

```bash
totem-autoatendimento/
├── prisma/
│   ├── schema.prisma            # Models: Restaurant, MenuCategory, Product, Order, OrderProduct
│   └── seed.ts                  # Seed do banco de dados
├── public/                      # Assets estáticos (ícones, imagens)
│   ├── dine_in.png
│   └── takeaway.png
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout raiz — fonte, CartProvider, Toaster
│   │   ├── globals.css          # Tokens de tema (CSS custom properties)
│   │   ├── page.tsx             # Página inicial (placeholder)
│   │   ├── api/
│   │   │   └── stripe/
│   │   │       └── webhook/
│   │   │           └── route.ts # Webhook Stripe — atualiza status do pedido
│   │   └── [slug]/
│   │       ├── page.tsx         # Tela de entrada do restaurante (escolha do método)
│   │       ├── menu/
│   │       │   ├── page.tsx     # Cardápio por categorias
│   │       │   ├── [productId]/
│   │       │   │   └── page.tsx # Detalhes do produto
│   │       │   ├── actions/
│   │       │   │   ├── create-order.ts           # Server Action: cria pedido no banco
│   │       │   │   └── create-stripe-checkout.ts # Server Action: redireciona para /success após pagamento
│   │       │   ├── components/
│   │       │   │   ├── categories.tsx            # Navegação por categorias + barra do carrinho
│   │       │   │   ├── header.tsx                # Header com imagem de capa
│   │       │   │   ├── products.tsx              # Listagem de produtos
│   │       │   │   ├── cart-sheet.tsx            # Sheet lateral do carrinho
│   │       │   │   ├── cart-product-item.tsx     # Item individual no carrinho
│   │       │   │   └── finish-order-dialog.tsx   # Drawer de finalização com form + Stripe
│   │       │   ├── contexts/
│   │       │   │   └── cart.tsx                  # Context API do carrinho
│   │       │   └── helpers/
│   │       │       └── cpf.ts                    # Validação e formatação de CPF
│   │       ├── success/
│   │       │   └── page.tsx     # Tela animada pós-pagamento — limpa histórico do Stripe
│   │       └── orders/
│   │           ├── page.tsx     # Página de pedidos (requer CPF)
│   │           └── components/
│   │               ├── cpf-form.tsx              # Drawer para inserir CPF
│   │               └── order-list.tsx            # Listagem de pedidos — volta para home do restaurante
│   ├── components/
│   │   └── ui/                  # Componentes shadcn/ui
│   ├── helpers/
│   │   └── format-currency.ts   # Formatação BRL (Intl.NumberFormat)
│   └── lib/
│       ├── prisma.ts            # Singleton do PrismaClient
│       └── utils.ts             # cn() — merge de classes Tailwind
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── components.json
└── package.json
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- **Node.js** v20+
- **npm**
- Banco de dados **PostgreSQL** disponível (local ou nuvem)
- Conta no **Stripe** para obter as chaves de API

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/RaphaelOkuyama/totem-autoatendimento.git
cd totem-autoatendimento
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**
```bash
cp .env.example .env
```
Preencha o arquivo `.env` conforme indicado na seção abaixo.

**4. Execute as migrations e o seed do banco**
```bash
npx prisma migrate dev
npx prisma db seed
```

**5. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

O app estará disponível em: `http://localhost:3000`

**6. (Opcional) Configure o webhook do Stripe localmente**

Instale o [Stripe CLI](https://stripe.com/docs/stripe-cli) e execute:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Copie o webhook secret gerado e adicione ao `.env` como `STRIPE_WEBHOOK_SECRET_KEY`.

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
# Banco de dados PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET_KEY="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
```

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | String de conexão do PostgreSQL |
| `STRIPE_SECRET_KEY` | Chave secreta da conta Stripe (painel → Developers → API Keys) |
| `STRIPE_WEBHOOK_SECRET_KEY` | Secret do webhook Stripe (gerado pelo Stripe CLI ou painel) |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Chave pública da conta Stripe |

---

## 📦 Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor em modo de desenvolvimento |
| `npm run build` | Cria a versão otimizada para produção |
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Executa a verificação de código (ESLint) |
| `npx prisma studio` | Abre o Prisma Studio para visualizar o banco |
| `npx prisma db seed` | Popula o banco com dados iniciais |

---

## 🗃️ Modelo de Dados

```
Restaurant
  ├── MenuCategory[]
  │     └── Product[]
  ├── Product[]
  └── Order[]
        ├── OrderProduct[] → Product
        ├── status: PENDING | IN_PREPARATION | PAYMENT_CONFIRMED | PAYMENT_FAILED | FINISHED
        └── consumptionMethod: DINE_IN | TAKEAWAY
```

Cada pedido armazena o nome e CPF do cliente, o método de consumo e todos os produtos com preço e quantidade no momento da compra.

---

## 💳 Fluxo de Pagamento

```
Cliente finaliza pedido
    ↓
Server Action: createOrder() → salva pedido com status PENDING no banco
    ↓
Server Action: createStripeCheckout() → cria sessão de checkout no Stripe
    ↓
Redirect para página de pagamento do Stripe
    ↓
Stripe dispara evento webhook (checkout.session.completed ou charge.failed)
    ↓
API Route /api/stripe/webhook → atualiza status do pedido no banco
    ↓
success_url aponta para /{slug}/success (página intermediária)
    ↓
router.replace() → remove Stripe do histórico e redireciona para /{slug}/orders?cpf=...
    ↓
Tela animada de loading (hambúrguer + steps + countdown) enquanto redireciona
```

> ⚠️ **Por que a rota `/success`?** O `router.replace()` destrói a entrada do Stripe no histórico do navegador. Sem ela, o gesto de arrastar para voltar no iPhone e o botão nativo do Android retornam para a tela "Sessão expirada" do Stripe.

---

## 📬 Contato

Desenvolvido por **Raphael Okuyama**

- 🌐 Portfólio: [portfolio-raphael-okuyama.vercel.app](https://portfolio-raphael-okuyama.vercel.app)
- 💼 LinkedIn: [raphael-okuyama](https://www.linkedin.com/in/raphael-okuyama/)
- 🐙 GitHub: [@RaphaelOkuyama](https://github.com/RaphaelOkuyama)

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

Copyright © 2026 **Raphael Okuyama**