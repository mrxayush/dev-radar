# DevRadar 🔍⚡
### *Live GitHub Developer Scout & Talent Analytics Platform*

A unique, production-ready full-stack platform built with **Spring Boot 3, Spring Data JPA, Spring Security (JWT-based RBAC), RestClient consuming the live GitHub Public REST API**, and a modern **React 18 + Tailwind CSS** frontend.

---

## 🌟 Why DevRadar is the Ultimate Fresher Project

1. **Interactive Interview Moment:** You can literally ask your interviewer:  
   > *"Sir, what is your GitHub username? Let's analyze your live profile on my app right now!"*  
   Their verified avatar, top repositories, star count, and calculated Dev Score will appear live on your screen via your Spring Boot backend!
2. **Zero API Key Barrier:** Uses the official public **GitHub REST API v3** (`https://api.github.com/users/{username}`) which requires **no credit card, no complex credentials, and zero setup**.
3. **100% Defendable Architecture:** Clean JPA entities, transparent relational mappings (`User` $\rightarrow$ `CandidateBookmark`), stateless JWT authentication, and clear role boundaries.

---

## 🚀 Key Features

- **Live GitHub Profile & Repository Telemetry:**
  - Streams public developer bio, avatar, company, location, and member age.
  - Automatically fetches top repositories, forks, and star counts.
  - Aggregates programming language distributions into verified skill tags.
- **Automated "Dev Score" Computation Engine (0–100):**
  - Algorithmically evaluates candidate profile strength:
    $$\text{Dev Score} = \min(30, \text{Repos} \times 3) + \min(30, \text{Stars} \times 4) + \min(20, \text{Followers} \times 2) + \text{Profile Completeness (up to 20 pts)}$$
- **Role-Based Talent Pipeline (RBAC):**
  - **Tech Recruiter (`ROLE_RECRUITER`):** Search any developer, bookmark candidates to a personal talent pipeline, write private interview notes, assign 1–5 star ratings, track hiring stages (`Reviewing`, `Interview Scheduled`, `Hired`, `Rejected`), and inspect aggregate analytics.
  - **Candidate (`ROLE_CANDIDATE`):** Search developers and evaluate their own GitHub profile score.
- **Resilient Fallback Mode:**
  - If GitHub's unauthenticated rate limit is reached or internet connectivity drops, the backend automatically generates a realistic profile fallback so your demo **never fails or crashes during an interview**.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Java 17, Spring Boot 3.2.3, Spring Data JPA, Spring Security 6 (JWT HMAC-SHA256), RestTemplate / RestClient, H2 In-Memory Database, SpringDoc OpenAPI 3 |
| **Frontend** | React 18, Tailwind CSS, Axios with Request/Response Interceptors, Plus Jakarta Sans |
| **External API** | Official GitHub Public REST API v3 |

---

## ⚙️ How to Run Locally

### 1. Start the Spring Boot Backend

```bash
cd "C:\DevRadar\backend"
mvn clean spring-boot:run
```
- **Backend API:** `http://localhost:8080`
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **H2 DB Console:** `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:devradardb`, User: `sa`, Password: *blank*)

### 2. Start the React Frontend

```bash
cd "C:\DevRadar\frontend"
npm install
npm start
```
- **React App:** `http://localhost:3000`

---

## 🔑 Pre-Seeded 1-Click Demo Accounts

| Role | Username | Password | Privileges |
|---|---|---|---|
| **Tech Recruiter** | `recruiter` | `recruiter123` | Full Access: Scout, Bookmark candidates, Edit notes, Manage pipeline stages |
| **Candidate** | `candidate` | `candidate123` | Self-Assessment: Scout developers, view Dev Scores |

---

## 📡 REST API Summary

| Method | Endpoint | Access Level | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Authenticates user; returns JWT Bearer token |
| `POST` | `/api/auth/register` | Public | Registers a new Recruiter or Candidate |
| `GET` | `/api/scout/{username}` | Public / Authenticated | Consumes GitHub API & calculates Dev Score |
| `GET` | `/api/bookmarks` | `ROLE_RECRUITER` | Retrieves recruiter's saved talent pipeline |
| `GET` | `/api/bookmarks/stats` | `ROLE_RECRUITER` | Pipeline metrics (Hired count, Average score) |
| `POST` | `/api/bookmarks` | `ROLE_RECRUITER` Only | Bookmarks candidate with rating & notes |
| `PUT` | `/api/bookmarks/{id}` | `ROLE_RECRUITER` Only | Updates candidate review notes/status |
| `DELETE` | `/api/bookmarks/{id}` | `ROLE_RECRUITER` Only | Removes candidate from pipeline |

---

## 🎤 60-Second Interview Elevator Pitch

> *"I designed and built **DevRadar**, a full-stack developer talent intelligence platform using Spring Boot 3, Spring Data JPA, Spring Security with JWT, and React with Tailwind CSS.*
> 
> *The backend acts as an intelligence aggregator: it consumes the live GitHub REST API to stream real-time repository telemetry, calculate an objective 'Dev Score' (0 to 100), and aggregate tech stack distributions.*
> 
> *We implemented Role-Based Access Control where Tech Recruiters can bookmark candidates into an active hiring pipeline with private review notes, star ratings, and hiring stages (`Interview Scheduled`, `Hired`), while standard users can self-evaluate their own developer profile. Everything is secured statelessly with custom JWT filter chains and documented via OpenAPI 3."*
