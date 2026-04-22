# Backend - ScribeMD Clinical Intelligence Platform

FastAPI backend powering the clinical workflow system for secure doctor access, patient management, consultation handling, and AI-assisted clinical documentation workflows.

---

## Backend Responsibilities

- Authentication and authorization
- Patient CRUD operations
- Consultation CRUD operations
- Clinical note generation
- Export services
- Protected APIs
- Database connectivity
- Secure password handling
- Token-based session management

---

## Technology Stack

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- JWT Authentication
- Passlib Security
- Pydantic Validation
- Uvicorn Server

---

## Core API Modules

### Authentication

- Register doctor account
- Secure login
- JWT token generation

### Users

- Get current logged-in doctor profile

### Patients

- Create patient
- List patients
- Get patient detail
- Update patient
- Delete patient

### Consultations

- Create consultation
- List consultation history
- Get consultation detail
- Update consultation
- Delete consultation

### Clinical Notes

- Generate structured SOAP note
- Retrieve generated note

### Exports

- JSON export
- PDF export
- EHR export

---

## Run Backend

```bash
venv\Scripts\activate
uvicorn app.main:app --reload
Backend URL
http://127.0.0.1:8000
API Documentation
http://127.0.0.1:8000/docs
Recommended Environment Variables
DATABASE_URL=postgresql://username:password@localhost/dbname
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
Folder Structure
server/
├── app/
│   ├── core/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── main.py
├── venv/
├── requirements.txt
└── README.md
Future Backend Improvements
OpenAI / LLM integration
Redis queue workers
Celery async jobs
Role-based access control
Audit trails
Production logging
Rate limiting
Multi-tenant organizations
File storage support
Webhooks / integrations
Architecture Goal

Designed as a modular, scalable, and production-ready backend suitable for healthcare SaaS products and AI-powered documentation platforms.

Summary

This backend demonstrates strong fundamentals in API engineering, authentication, database design, and modular healthcare workflow architecture.