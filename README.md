# Chat em Tempo Real - Documentação

Aplicação de chat real-time com autenticação JWT, gerenciamento de usuários e WebSocket (Socket.io).

**Stack:** Express.js | MongoDB | Socket.io | JWT | bcryptjs

## 🚀 Tecnologias

- **Express.js** 5.2.1 - Framework web
- **Node.js** - ES Modules
- **MongoDB** 9.3.2 - Banco de dados NoSQL
- **Mongoose** - ODM
- **Socket.io** 4.8.3 - WebSocket real-time
- **JWT** 9.0.3 - Autenticação tokenizada
- **bcryptjs** 3.0.3 - Hash de senhas
- **express-validator** 7.3.1 - Validação
- **express-rate-limit** 8.5.1 - Rate limiting
- **Jest** 30.3.0 - Testes

## 📂 Estrutura do Projeto

```
src/
├── express/
│   ├── app.js              # Configuração Express
│   ├── index.js            # Inicialização
│   ├── socket_io.js        # WebSocket
│   ├── controllers/
│   │   ├── auth_controller.js
│   │   └── users_controller.js
│   ├── routers/
│   │   ├── auth.js
│   │   └── users.js
│   └── middlewares/
│       ├── auth.js
│       ├── error_handlers.js
│       ├── express_validator.js
│       └── socket_io.js
├── services/
│   ├── auth_service.js
│   ├── users_service.js
│   └── encryption.js
├── repositories/
│   └── users_repository.js
├── models/
│   └── users_model.js
├── interfaces/
│   └── IUserRepository.js
├── exceptions.js
└── db_connection.js

tests/
├── controller.auth.spec.js
├── controller.users.spec.js
└── jest.setup.js

public/
├── login/          # Frontend login/registro
└── chat/           # Interface chat
```

## 📸 Interface (Screenshots)

### Login - Sign In

![Login Sign In](./docs/screenshots/login-signin.png)

Página de entrada do sistema. O usuário insere **username** e **password** para receber um token JWT.

---

### Login - Register

![Login Register](./docs/screenshots/login-register.png)

Página de criação de conta. O usuário fornece **username**, **email** e **password** para se registrar.

---

### Chat em Tempo Real

![Chat Interface](./docs/screenshots/chat-interface.png)

Página principal do chat onde usuários conectados podem trocar mensagens em tempo real.

## 📦 Instalação e Execução

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar .env
```env
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/database
ALGORITHM=HS256
SECRET_KEY=sua_chave_secreta_aqui
TOKEN_EXPIRATION_TIME=30m
PORT=3000
NODE_ENV=development
```

### 3. Iniciar servidor
```bash
node src/express/index.js
```

Acesso: `http://localhost:3000`

### 4. Rodar testes
```bash
npm test
```

## 🔌 Rotas da API

### Autenticação

**POST** `/auth`

Gera token JWT.

Request:
```json
{
  "username": "joao",
  "password": "senha123"
}
```

Response (201):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Rate Limit: 5 req/15min

---

### Usuários

**POST** `/users`

Cria novo usuário (sem autenticação).

Request:
```json
{
  "username": "joao",
  "email": "joao@example.com",
  "password": "senha123"
}
```

Response (201):
```json
{
  "user_id": "507f1f77bcf86cd799439011",
  "username": "joao",
  "email": "joao@example.com"
}
```

---

**GET** `/users/:user_id`

Obtém dados do usuário (requer autenticação).

Header:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "user_id": "507f1f77bcf86cd799439011",
  "username": "joao",
  "email": "joao@example.com"
}
```

---

**PUT** `/users/:user_id`

Atualiza usuário (requer autenticação).

Request:
```json
{
  "username": "novo_nome",
  "email": "novo@example.com",
  "password": "nova_senha"
}
```

Response (200):
```json
{
  "message": "The user has been successfully updated."
}
```

---

**DELETE** `/users/:user_id`

Deleta usuário (requer autenticação).

Response (200):
```json
{
  "message": "The user has been successfully deleted"
}
```

---

**GET** `/health`

Verifica se servidor está online.

Response (200):
```json
{
  "message": "The server is up and running"
}
```

## 🔐 Autenticação

### JWT Token

1. Usuário faz login com username/password
2. Servidor verifica credenciais
3. Gera JWT assinado com SECRET_KEY
4. Cliente armazena em `sessionStorage`
5. Envia `Authorization: Bearer <token>` em requisições subsequentes

### Autorização

Cada usuário só pode acessar seus próprios dados. O middleware `verify_permission` valida isso.

## 🛡️ Segurança

- ✅ Senhas com hash bcryptjs (10 rounds)
- ✅ JWT assinado (HS256)
- ✅ XSS protection (sanitize-html em Socket.io)
- ✅ Rate limiting (5 login/15min, 50 gerais/15min)
- ✅ CORS habilitado
- ✅ Validação de entrada (express-validator)

## ✔️ Validações

- `username`: 5+ caracteres, único
- `email`: Email válido, único
- `password`: 8+ caracteres
- `user_id`: MongoDB ObjectId válido

## 📊 Tratamento de Erros

| Status | Significado | Exemplo |
|:---|:---|:---|
| 200 | Sucesso | GET /users/:id |
| 201 | Criado | POST /users |
| 400 | Validação falhou | Email inválido |
| 401 | Sem autenticação | Token inválido |
| 403 | Credenciais erradas | Senha incorreta |
| 404 | Não encontrado | Usuário não existe |
| 409 | Conflito | Username duplicado |

## 💬 WebSocket (Socket.io)

### Conectar com Autenticação

```javascript
const socket = io(window.location.origin, {
  auth: {
    token: localStorage.getItem("token")
  }
})
```

### Enviar Mensagem

```javascript
socket.emit("message", "Olá pessoal!")
```

### Receber Mensagem

```javascript
socket.on("message", (msg) => {
  console.log(msg)
  // { username: "joao", message: "Olá!", date: "14:30" }
})
```

### Validações

- ✅ Token JWT obrigatório
- ✅ Mensagens sem HTML (XSS safe)
- ✅ Tamanho: 1-250 caracteres

## 🧪 Testes

```bash
# Rodar todos
npm test
```

**Funcionalidades:**
- Conexão WebSocket com autenticação JWT
- Exibição de username em verde (#58d68d)
- Horário de cada mensagem
- Notificações de entrada/saída de usuários
- Auto-scroll para mensagens novas
- Limite de 250 caracteres por mensagem
- Sanitização automática (sem HTML/XSS)
