# 🍔 Stack-Burger

**Stack-Burger** é uma aplicação web para hamburguerias que permite aos clientes realizarem pedidos online através de um cardápio virtual. Os pedidos são adicionados ao carrinho e enviados diretamente ao estabelecimento. A plataforma também oferece um painel administrativo completo para gestão de produtos e pedidos.

---

## Funcionalidades

### Área do Cliente
- Visualização do cardápio virtual
- Adição de itens ao carrinho
- Cadastro e login com geração de token JWT
- Feedback visual com Toastify
- Finalização de pedidos com integração Stripe

### Área Administrativa
- Cadastro, edição e exclusão de produtos
- Upload de imagens (armazenadas localmente, com URL salva no banco)
- Criação de promoções
- Visualização e gerenciamento de pedidos

---

## Tecnologias Utilizadas

| Frontend | Backend | Banco de Dados | Outros |
|----------|---------|----------------|--------|
| React | Node.js | PostgreSQL | Docker |
| React Toastify | Express | MongoDB | Stripe API |
| React Multi Carousel | JWT | | Biome |
| Material UI | Yup | | bcrypt |
| pnpm / yarn | Middlewares personalizados | | MVC Architecture |
| @phosphor-icons | | | Outklout (rotas) |

---
 Imagem do Projeto
<p align="center">
  <img src="https://github.com/Tiagliveira/dev-burg-interface/blob/main/public/imageReadme.png?" alt="Dev-Burg Interface" width="600"/>
</p>

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Docker instalado
- Node.js e pnpm/yarn instalados

 [Repositório do Front-End](https://github.com/Tiagliveira/stack-burger-api)

### Backend

```bash
pnpm install
pnpm dev
bs

 O frontend só funciona com o backend rodando. Certifique-se de configurar corretamente os arquivos .env com dados de banco e segurança.

 Testes e Dados
- Logins e pedidos de teste disponíveis
- Banco de dados: PostgreSQL e MongoDB
- Dados de imagem são salvos como URL no banco, com arquivos armazenados localmente

 Deploy
Ainda não disponível online. O deploy será realizado após ajustes finais.

 Repositório Backend
https://github.com/Tiagliveira/stack-burger-api

 Desenvolvedor
Aplicação desenvolvida por Tiago Oliveira.



