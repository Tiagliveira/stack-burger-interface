# 🍔 Stack Burger - Plataforma de Delivery SaaS (Front-End)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

> **Aplicação Full Stack de Delivery com funcionalidades Real-Time, Pagamentos e Infraestrutura em VPS.**

O **Stack Burger** não é apenas um cardápio digital, é uma solução completa de SaaS (Software as a Service) para gestão de pedidos. A aplicação conecta clientes e cozinha em tempo real utilizando WebSockets, elimina a necessidade de "refresh" de página e automatiza a logística de entrega baseada em CEP.

---

## Funcionalidades Avançadas

### Experiência do Cliente (Client-Side)
- **Real-Time Updates:** O status do pedido (Preparando -> Saiu para Entrega) atualiza instantaneamente na tela do cliente via **Socket.io**.
- **Logística Inteligente:** Cálculo de taxa de entrega dinâmico baseado em faixas de CEP.
- **Regras de Cancelamento:** Implementação de SLA onde o cancelamento só é permitido em até 30 minutos e se o pedido não estiver em rota.
- **Pagamentos Reais:** Checkout transparente integrado com **Stripe**.

### Painel Administrativo & Segurança
- **RBAC (Role-Based Access Control):** Rotas protegidas onde apenas administradores acessam relatórios financeiros.
- **Dashboard Financeiro:** Gráficos e métricas de vendas.
- **Gestão de Produtos:** Controle total de catálogo, estoque e promoções.

---

## Arquitetura & Tecnologias

O projeto foi desenhado focando em performance e escalabilidade, migrando de hospedagem compartilhada para infraestrutura própria.

| Categoria | Tecnologias |
|-----------|-------------|
| **Front-End** | React.js, TypeScript, Tailwind CSS, Context API |
| **Real-Time** | Socket.io Client |
| **Integrações** | Stripe SDK, ViaCEP API |
| **Infraestrutura** | Docker Containers, VPS Linux, Nginx (Reverse Proxy) |

---

## Preview

<p align="center">
  <img src="https://github.com/Tiagliveira/dev-burg-interface/blob/main/public/imageReadme.png?raw=true" alt="Stack Burger Interface" width=60%/>
</p>

---

## Como Rodar Localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** e o **Docker** instalados.

1. **Clone o repositório**
```bash
git clone [https://github.com/Tiagliveira/stack-burger-interface.git](https://github.com/Tiagliveira/stack-burger-interface.git)
cd stack-burger-interface

###Instale as dependências
npm install

###Configure as Variáveis de Ambiente (.env)
VITE_API_URL=http://localhost:3001

###Inicie o Projeto
npm run dev
```
Nota: Para funcionalidade completa, é necessário rodar a API (Back-end) simultaneamente. [Acesse o Repositório da API aqui(https://github.com/Tiagliveira/stack-burger-api)]

## Infraestrutura & Deploy
A aplicação em produção roda em uma VPS Linux, orquestrada via Easypanel/Docker.

Front-end: Containerizado e servido via Nginx.

Back-end: Node.js em cluster pm2/Docker.

Banco de Dados: Instances isoladas de PostgreSQL e MongoDB.

## Autor

Desenvolvido por **Tiago Oliveira**.
Estudante de Análise e Desenvolvimento de Sistemas, focado em migrar do Front-end básico para aplicações Full Stack completas.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiagoliveiradev)
