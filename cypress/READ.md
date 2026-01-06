# Cypress BDD API + UI Automation Suite

A **production‑grade Cypress + Cucumber (BDD)** automation framework designed and implemented using **2026 SDET best practices**.

This project demonstrates how to test **UI, API, and full end‑to‑end workflows** using a single, scalable automation stack that runs **locally, in Docker, and in Jenkins CI** with deterministic results.

---

## 🔧 Tech Stack

* **Cypress** 15.x (UI + API testing)
* **Cucumber / Gherkin (BDD)** via `@badeball/cypress-cucumber-preprocessor`
* **Node.js** (local execution)
* **Docker** (Linux‑consistent test execution)
* **Jenkins** (CI orchestration + reporting)
* **Cucumber HTML Reports** (Jenkins plugin)

---

## 📁 Project Structure

```
cypress-bdd-api-ui-automation-suite/
├── cypress/
│   ├── e2e/
│   │   ├── api/              # API feature files (@api)
│   │   └── ui/               # UI feature files (@ui)
│   ├── fixtures/
│   ├── page_objects/
│   ├── support/
│   └── utils/
├── reports/                  # Generated test reports (gitignored)
├── cypress.config.js
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

---

## 🏷️ Tagging Strategy (CRITICAL)

This framework relies on **strict tag‑based execution**. Tags are applied **at the Feature level** unless explicitly required at the Scenario level.

### Primary Tags

| Tag           | Purpose                  |
| ------------- | ------------------------ |
| `@ui`         | UI tests                 |
| `@api`        | API tests                |
| `@regression` | Full regression coverage |
| `@smoke`      | Fast health‑check tests  |
| `@e2e`        | Full user journeys       |
| `@crud`       | API CRUD validation      |

### Example

```gherkin
@ui @regression
Feature: UI - Authentication
```

> ⚠️ **Important:** Tag expressions are enforced via environment variables. Incorrect casing (e.g. `CYPRESS_tags`) will break filtering.

---

## 🖥️ Running Tests Locally (Node.js)

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Available Commands

#### UI Tests

```bash
npm run ui:smoke
npm run ui:regression
npm run ui:e2e
```

#### API Tests

```bash
npm run api:smoke
npm run api:regression
npm run api:crud
```

#### Full Suite

```bash
npm run all:regression
npm run all:smoke
```

> These commands use Cypress tag filtering internally.

---

## 🐳 Running Tests with Docker (Recommended)

Docker ensures **Linux‑consistent execution**, matching CI behavior exactly.

### 1️⃣ Build the Image

```bash
docker build -t ae-cypress .
```

### 2️⃣ Create Linux `node_modules` Volume (One‑Time)

```bash
docker volume create ae_node_modules
```

### 3️⃣ Run UI Regression

```bash
docker run --rm -t \
  -e CYPRESS_TAGS='@ui and @regression' \
  -v "$PWD:/e2e" \
  -v ae_node_modules:/e2e/node_modules \
  -w /e2e \
  ae-cypress \
  bash -lc "npm ci && npx cypress run --spec 'cypress/e2e/ui/**/*.feature' --browser chrome --headless"
```

### 4️⃣ Run API Regression

```bash
docker run --rm -t \
  -e CYPRESS_TAGS='@api and @regression' \
  -v "$PWD:/e2e" \
  -v ae_node_modules:/e2e/node_modules \
  -w /e2e \
  ae-cypress \
  bash -lc "npm ci && npx cypress run --spec 'cypress/e2e/api/**/*.feature' --browser chrome --headless"
```

---

## 🤖 Jenkins CI Integration

This project is designed to run inside **Jenkins (local or cloud)**.

### Key Characteristics

* Docker‑based execution
* Cron‑triggered nightly regression
* Cucumber HTML Reports published in Jenkins UI
* Linux‑consistent dependencies

### Jenkins Workspace

```
/Users/<user>/.jenkins/workspace/ae-nightly-regression
```

### Jenkins Job Name

```
ae-nightly-regression
```

---

## 📊 Reporting

* **Cucumber JSON** generated during test execution
* **HTML reports** published automatically via Jenkins plugin
* Reports visible per build under **Cucumber Report** tab

---

## 🚫 Common Pitfalls (Read This)

❌ Mounting macOS `node_modules` into Docker (breaks esbuild)

❌ Incorrect env var casing:

```bash
CYPRESS_tags   # WRONG
CYPRESS_TAGS   # CORRECT
```

❌ Mixing UI + API tags in a single feature

---

## 🎯 Why This Framework Matters

This repo demonstrates:

* Clean separation of **UI vs API vs E2E** testing
* Real‑world **CI‑grade Docker execution**
* Deterministic tag‑based test selection
* Debug‑friendly local + CI parity
* Interview‑ready architecture explanations

---

## 👤 Author

**Christian Sanchez**
Senior QA Automation Engineer / SDET

---

## ✅ Current Status

This framework is stable and production-ready for:
- Local execution (Node/Cypress)
- Docker execution (Linux-consistent)
- Jenkins nightly execution + Cucumber reporting


If you clone this repo and follow the steps above, you should be able to run **any subset of tests in under 5 minutes**.

Happy testing 🚀
