## 👥 Integrantes do Grupo

| Nome | RM |
| :--- | :--- |
| Larissa de Freitas Moura | 555136 |
| Guilherme Francisco | 557648 |
#  OASIS Mobile - Global Solution 2025

> **Equilíbrio Híbrido Inteligente:** Uma solução para combater o Burnout e gerenciar a saúde mental no futuro do trabalho.

![Badge Concluído](https://img.shields.io/badge/STATUS-CONCLUÍDO-green)
![Badge React Native](https://img.shields.io/badge/React_Native-Expo-blue)
![Badge Java](https://img.shields.io/badge/Backend-Java_Spring-red)
![Badge Firebase](https://img.shields.io/badge/Deploy-Firebase-orange)

---

## 📺 Demonstração
**[CLIQUE AQUI PARA ASSISTIR AO VÍDEO NO YOUTUBE](https://youtu.be/Gd_OfkFbOZw)**

---

## 📱 Download do APK (Firebase)
O aplicativo foi compilado e publicado via Firebase App Distribution.



[Image of firebase logo]

**[📥 BAIXAR VERSÃO 1.0.0 (ANDROID)](https://appdistribution.firebase.dev/i/504de33bf4b0f59d)**

---

**API JAVA :**
**[LINK REPOSITORIO] (https://github.com/Gu1LhermeF5P/api_mobile)**
---

## 💡 O Problema e a Solução
No cenário de trabalho híbrido/remoto, as fronteiras entre vida pessoal e profissional desapareceram, levando ao **Burnout Silencioso**.

O **OASIS** não é apenas um monitor passivo. Ele é uma ferramenta ativa que:
1.  **Monitora o Humor:** Através de um Diário de Emoções interativo.
2.  **Analisa Riscos:** Utiliza algoritmos para identificar padrões de exaustão.
3.  **Intervém:** Bloqueia o uso em momentos críticos e guia o usuário para exercícios de respiração (Deep Breath).

---

## 🛠️ Tecnologias Utilizadas

### Mobile (Frontend)
* **React Native (Expo):** Framework principal.
* **React Navigation:** Gerenciamento de rotas (Stack & Tabs).
* **Axios:** Consumo da API REST.
* **React Native Chart Kit:** Gráficos de tendência emocional.
* **Context API:** Gerenciamento de estado (Autenticação e Tema).

### Backend (API)
* **Java 17 + Spring Boot 3:** Estrutura da API RESTful.
* **Spring Data JPA:** Persistência de dados.
* **H2 Database:** Banco de dados em memória (para facilidade de testes acadêmicos).
* **Lombok:** Redução de boilerplate.

---

## 📱 Funcionalidades (Checklist da Entrega)

- [x] **Autenticação Real:** Login e Cadastro integrados ao banco de dados Java.
- [x] **CRUD Completo:** Diário de emoções (Criar, Ler, Editar e Excluir registros).
- [x] **Dashboard Inteligente:** Cálculo de risco de Burnout e visualização gráfica.
- [x] **Intervenção de Saúde:** Funcionalidade de respiração com animação guiada.
- [x] **Navegação Robusta:** Uso de Stack Navigator e Bottom Tabs.
- [x] **Design System:** Identidade visual personalizada (Cores OASIS) e Design Flat.

---

## ⚙️ Como Rodar o Projeto Localmente

### Passo 1: Backend (Java)
1.  Abra a pasta `backend` no IntelliJ ou Eclipse.
2.  Aguarde o Maven baixar as dependências.
3.  Execute a classe `OasisApplication.java`.
4.  O servidor iniciará na porta **8080**.

### Passo 2: Frontend (Mobile)
1.  Abra a pasta `mobile` no VS Code.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  **IMPORTANTE:** Abra o arquivo `src/services/api.js` e coloque o **IP da sua máquina**:
    ```javascript
    baseURL: '[http://192.168.](http://192.168.)X.X:8080' // Troque pelo seu IPv4
    ```
4.  Inicie o projeto:
    ```bash
    npx expo start
    ```
5.  Escaneie o QR Code com o app **Expo Go** no seu celular (Android/iOS).

---

## 📄 Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Cria um novo usuário. |
| `POST` | `/auth/login` | Autentica o usuário. |
| `GET` | `/humor/{userId}` | Lista o histórico de um usuário. |
| `POST` | `/humor` | Salva um novo registro de humor. |
| `PUT` | `/humor/{id}` | Edita um registro existente. |
| `DELETE` | `/humor/{id}` | Remove um registro. |

---

> **Disclaimer:** Este projeto foi desenvolvido para fins acadêmicos como parte da avaliação "Global Solution" da FIAP.
