# UPIQ - Unified Personal Income & Query(PROD)

> **A premium personal finance management platform with intelligent transaction parsing and real-time analytics.**

UPIQ is a full-stack financial dashboard that helps users track, categorize, and visualize their UPI transactions. Built with modern technologies, it features an elegant UI with dark mode support, automated PDF statement parsing, and a production-optimized backend architecture.

[![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.1-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)

---

## ✨ Key Features

### 💰 Financial Intelligence
- **Real-Time Dashboard**: Track balance, income, expenses, and savings rate with dynamic KPIs
- **Smart Categorization**: Customizable categories with unique icons and color coding
- **Budget Management**: Set monthly budgets with visual progress tracking and alerts
- **Transaction History**: Comprehensive ledger with advanced search and filtering

### 📄 Automated Parsing
- **PDF/CSV Upload**: Extract transactions from bank statements automatically
- **Intelligent Pattern Recognition**: Identifies sender/receiver, amounts, and transaction types
- **Batch Processing**: Upload multiple statements for bulk transaction import

### 🎨 Premium UI/UX
- **Adaptive Theming**: Seamless Dark/Light mode with system preference detection
- **Smooth Animations**: Micro-interactions and transitions for enhanced user experience
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern Aesthetics**: Glassmorphism, gradients, and vibrant color palettes

### 🔐 Security & Authentication
- **JWT-Based Auth**: Secure token-based authentication
- **IDOR Protection**: Service-layer ownership validation
- **Password Encryption**: BCrypt hashing for user credentials
- **CORS Configuration**: Secure cross-origin resource sharing

---

## 🏗️ Architecture

### Current: Unified Production Backend
The application uses a **single Spring Boot backend** optimized for cost-effective deployment:

```
┌─────────────────────────────────────────┐
│         React Frontend (Vite)           │
│    Port 5173 (dev) / Static (prod)      │
└──────────────────┬──────────────────────┘
                   │ HTTP/REST
┌──────────────────▼──────────────────────┐
│      Unified Spring Boot Backend        │
│  ┌─────────┬──────────┬────────┬─────┐  │
│  │  Auth   │Transaction│Category│ PDF │  │
│  │ Service │  Service  │Service │Parse│  │
│  └─────────┴──────────┴────────┴─────┘  │
│         Port 8080 (Single JVM)          │
└──────────────────┬──────────────────────┘
                   │ JDBC
┌──────────────────▼──────────────────────┐
│       PostgreSQL Database (Single)       │
└──────────────────────────────────────────┘
```

**Benefits:**
- ✅ Runs on 512MB-1GB RAM (vs 4GB+ for microservices)
- ✅ Single Docker container deployment
- ✅ Perfect for free-tier hosting (Render, Railway, Fly.io)
- ✅ Simplified development and debugging

**Original Microservices Architecture:**
The project was originally built with 6 microservices (API Gateway, Eureka Server, Auth, Transaction, Category, PDF Parser). This architecture remains available in the repository history and can be restored when scaling requirements change. See [upiq-backend/README.md](./upiq-backend/README.md) for migration details.

---

## 🚀 Quick Start

### Prerequisites
- **Java 21** (for backend)
- **Node.js 18+** (for frontend)
- **PostgreSQL 16** (or Docker)
- **Maven 3.9+**

### Option 1: Docker Deployment (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/yourxharsh19/UPIQ.git
cd UPIQ

# 2. Set up environment variables
export DB_URL=jdbc:postgresql://localhost:5432/upiq
export DB_USERNAME=postgres
export DB_PASSWORD=yourpassword
export JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970

# 3. Build and run backend
cd upiq-backend
docker build -t upiq-backend .
docker run -p 8080:8080 \
  -e DB_URL=$DB_URL \
  -e DB_USERNAME=$DB_USERNAME \
  -e DB_PASSWORD=$DB_PASSWORD \
  -e JWT_SECRET=$JWT_SECRET \
  upiq-backend

# 4. Run frontend (new terminal)
cd ../upiq-frontend
npm install
npm run dev
```

### Option 2: Local Development

```bash
# 1. Start PostgreSQL (or use Docker)
docker run -d \
  -p 5432:5432 \
  -e POSTGRES_DB=upiq \
  -e POSTGRES_PASSWORD=postgres \
  postgres:16

# 2. Run backend
cd upiq-backend
export DB_URL=jdbc:postgresql://localhost:5432/upiq
export DB_USERNAME=postgres
export DB_PASSWORD=postgres
mvn spring-boot:run

# 3. Run frontend (new terminal)
cd upiq-frontend
npm install
npm run dev
```

**Access the application:** `http://localhost:5173`

---

## 📂 Project Structure

```
UPIQ/
├── upiq-frontend/              # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Global state (Auth, Theme, Budget)
│   │   ├── pages/              # Main application pages
│   │   ├── services/           # API communication layer
│   │   └── utils/              # Helper functions
│   └── package.json
│
└── upiq-backend/               # Unified Spring Boot Backend
    ├── src/main/java/com/upiq/
    │   ├── auth/               # Authentication & User Management
    │   ├── transaction/        # Transaction CRUD operations
    │   ├── category/           # Category management
    │   ├── pdf/                # PDF/CSV parsing logic
    │   └── config/             # Security, JWT, CORS config
    ├── Dockerfile
    └── pom.xml
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| Lucide React | Icon library |
| Axios | HTTP client |
| Context API | State management |

### Backend
| Technology | Purpose |
|------------|---------|
| Spring Boot 3.3.1 | Application framework |
| Spring Security | Authentication & authorization |
| Spring Data JPA | Database ORM |
| PostgreSQL | Relational database |
| JWT (jjwt 0.12.3) | Token-based auth |
| Apache PDFBox 3.0.3 | PDF parsing |
| Apache Commons CSV | CSV parsing |
| Lombok | Boilerplate reduction |

---

## 🌐 Deployment

### Deploy to Render (Free Tier)

**Backend:**
1. Create new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `cd upiq-backend && mvn clean package -DskipTests`
   - **Start Command:** `java -jar target/upiq-backend-0.0.1-SNAPSHOT.jar`
   - **Environment Variables:**
     ```
     DB_URL=<your-postgres-url>
     DB_USERNAME=<username>
     DB_PASSWORD=<password>
     JWT_SECRET=<your-secret>
     SPRING_PROFILES_ACTIVE=prod
     ```

**Frontend:**
1. Create new Static Site on Render
2. Configure:
   - **Build Command:** `cd upiq-frontend && npm install && npm run build`
   - **Publish Directory:** `upiq-frontend/dist`
   - **Environment Variable:** `VITE_API_URL=<your-backend-url>`

### Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Deploy to Fly.io

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy backend
cd upiq-backend
fly launch
fly deploy

# Deploy frontend
cd ../upiq-frontend
fly launch
fly deploy
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (returns JWT)

### Transactions (Requires JWT)
- `GET /api/transactions` - Get all user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

### Categories (Requires JWT)
- `GET /api/categories` - Get all user categories
- `POST /api/categories` - Create category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

### PDF Parser (Requires JWT)
- `POST /api/pdf/upload` - Upload PDF/CSV for parsing

---

## 🎓 Interview Talking Points

### Architectural Decision
*"I initially built UPIQ with a microservices architecture (API Gateway, Eureka, 4 services) to demonstrate distributed systems knowledge. However, for portfolio hosting, I created a unified deployment module that merges all services into a single Spring Boot application. This pragmatic decision reduces hosting costs from 4GB+ RAM to under 1GB while maintaining clean package boundaries for future scaling."*

### Security Implementation
*"The application uses JWT-based authentication with Spring Security. I replaced the API Gateway's JWT validation with in-app filters, and controllers use `@AuthenticationPrincipal` to access authenticated users. Service-layer ownership checks prevent IDOR vulnerabilities."*

### Frontend Design
*"I focused on creating a premium, modern aesthetic using Tailwind CSS with custom design tokens. The dark mode implementation respects system preferences and persists user choices. Micro-animations and glassmorphism effects enhance the user experience without compromising performance."*

### PDF Parsing Logic
*"The PDF parser uses Apache PDFBox to extract text and applies regex patterns to identify transaction types (income vs. expense). It dynamically extracts sender/receiver names and handles various bank statement formats, making it adaptable to different financial institutions."*

---

## 📸 Screenshots

> **Note:** Add screenshots of your application here for portfolio presentation.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Harshdeep Singh**
- GitHub: [@yourxharsh19](https://github.com/yourxharsh19)
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn URL]

---

**Built with ❤️ for modern personal finance management | 2025**
