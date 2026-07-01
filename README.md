AutoShine é um sistema web para gerenciamento de uma estética automotiva, desenvolvido como projeto acadêmico. A aplicação possui autenticação de usuários, cadastro de clientes, serviços, produtos e agendamentos, além de integração com banco de dados MySQL.

O projeto utiliza React no frontend, PHP orientado a objetos no backend e MySQL para armazenamento dos dados. A comunicação entre frontend e backend é feita por requisições HTTP, com APIs em PHP responsáveis pelas operações de CRUD.

Principais funcionalidades:
- Login de colaboradores
- Dashboard administrativo
- Cadastro, listagem, edição e exclusão de clientes
- Gerenciamento de serviços automotivos
- Controle de produtos
- Agendamento de serviços
- Integração com banco de dados relacional
- Backend com PDO e classes PHP
- Interface responsiva com React e Tailwind CSS

Tecnologias utilizadas:
- React
- JavaScript
- PHP
- MySQL
- PDO
- Axios
- Tailwind CSS
- Vite



 Requisitos
 --------------------
 1  Tela de Login funcionando  `Login.jsx` + `login.php`
 2  Menu com 5 opções (quem somos + ra + nome)  `Navbar.jsx` + `QuemSomos.jsx` 
 3  Banco de dados relacional  `banco.sql` (4 tabelas com FK) 
 4  Pelo menos uma opção com CRUD  Serviços, Clientes e Agendamentos 
 5  Backend com PHP orientado a objetos  `classes/` (Db, Usuario, Servico, Cliente, Agendamento) 
 6  Classe PDO para acessar banco  `Db.class.php` usa PDO 
 7  AXIOS para consumir API  ViaCEP em `BuscarCep.jsx` e `Clientes.jsx` 
 8  Tailwind CSS  configurado no frontend 


## Como rodar no XAMPP

### 1. Banco de dados
 Abre o XAMPP → inicia Apache e MySQL
 Acessa: http://localhost/phpmyadmin
 Cria banco chamado `estetica_automotiva`
 Importa o arquivo `banco.sql`

### 2. Backend PHP
Copia a pasta `backend` para:
```
C:/xampp/htdocs/estetica/backend/
```

### 3. Frontend React
Abre o terminal na pasta `frontend`:
```bash
npm install
npm run dev
```
Acessa: **http://localhost:5173**

## Usuários para testar
 Login | Senha 
-------|-------
 breno | 1 
 eduardo | 1 
 admin | admin 

## Estrutura
```
estetica/
├── banco.sql
├── backend/
│   ├── classes/
│   │   ├── Db.class.php       ← PDO
│   │   ├── Usuario.php
│   │   ├── Servico.php
│   │   ├── Cliente.php
│   │   └── Agendamento.php
│   └── api/
│       ├── cors.php
│       ├── login.php
│       ├── servicos.php
│       ├── clientes.php
│       └── agendamentos.php
└── frontend/
    └── src/
        ├── App.jsx
        ├── components/Navbar.jsx
        └── pages/
            ├── Login.jsx
            ├── Dashboard.jsx
            ├── QuemSomos.jsx     ← RA e nomes aqui
            ├── Servicos.jsx      ← CRUD
            ├── Clientes.jsx      ← CRUD + ViaCEP
            ├── Agendamentos.jsx  ← CRUD
            └── BuscarCep.jsx     ← ViaCEP via Axios
```
