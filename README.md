# 🏥 Ministry of Health AutoML Platform

<div align="center">
  <img src="https://img.shields.io/badge/Ministry%20of%20Health-AutoML-2ea44f" alt="Ministry of Health - AutoML">
  <img src="https://img.shields.io/badge/Next.js-13.5-black" alt="Next.js">
  <img src="https://img.shields.io/badge/FastAPI-0.105.0-009688" alt="FastAPI">
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED" alt="Docker">
  <img src="https://img.shields.io/badge/Python-3.9-3776AB" alt="Python">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6" alt="TypeScript">
</div>


## 🎬 Video

<div align="center">
  <h3>📹 Ministry of Health Tweet Analysis Platform </h3>
  
  https://github.com/user-attachments/assets/432a6f03-ca45-436d-b57b-8d17c06ed2ad
</div>

## 🚀 Key Features

- **🧠 Integration of 3 Different AI Technologies**
  - **Machine Learning**: Classification, regression, clustering, and anomaly detection
  - **Deep Learning**: Image classification, object detection, segmentation
  - **Large Language Models**: Text classification, summarization, question answering

- **📊 Advanced Data Preprocessing and Visualization**
  - Custom healthcare data normalization options
  - Data augmentation techniques
  - Dynamic data visualization tools

- **⚙️ Model Training and Performance Monitoring**
  - Real-time training metrics monitoring
  - Distributed model training
  - Hyperparameter optimization

- **🔒 Secure Infrastructure for Healthcare Data**
  - Data-specific security protocols
  - Role-based access control
  - Data encryption


## 🏗️ System Architecture

```mermaid
graph TD
    A[Frontend - Next.js] --> B[Backend API - FastAPI]
    B --> C[PostgreSQL]
    B --> D[RabbitMQ]
    D --> E[Celery Workers]
    E --> F[Model Training/Inference]
    B --> G[Redis]
    G --> E
```

## 💻 Technology Stack

### Frontend
- **Next.js 13**: Server-side rendering and static page generation
- **TypeScript**: Type safety
- **Tailwind CSS**: Fast and scalable CSS
- **shadcn/ui**: Modern and customizable UI components
- **Framer Motion**: Smooth animations

### Backend
- **FastAPI**: High-performance API framework
- **SQLAlchemy**: ORM (Object Relational Mapping)
- **Celery**: Asynchronous task management
- **PyTorch/TensorFlow**: Deep Learning models
- **scikit-learn**: Machine Learning algorithms

### Infrastructure
- **Docker & Docker Compose**: Containerization
- **Nginx**: Reverse proxy and load balancing
- **PostgreSQL**: Main database
- **Redis**: Cache and message broker
- **RabbitMQ**: Message queue

## 🚀 Getting Started

### Requirements
- Docker and Docker Compose
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ByErenOzer/Ministry-of-Health-AutoML-Frontend.git
   cd Ministry-of-Health-AutoML-Frontend
   ```

2. **Run the application with Docker**
   ```bash
   docker-compose up -d
   ```

3. **Access in your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs
   - RabbitMQ Management Interface: http://localhost:15672

## 🔍 Use Cases

### 1. Medical Image Analysis
- Anomaly detection in MRI, CT, and X-ray images
- Tumor classification and localization
- Tissue segmentation

### 2. Healthcare Data Prediction
- Patient risk assessment
- Disease progression prediction
- Drug efficacy analysis

### 3. Text-Based Medical Data Analysis
- Automatic classification of medical notes
- Literature review and summarization
- Clinical decision support systems

## 📬 Contact

<div align="center">
  
[![GitHub](https://img.shields.io/badge/GitHub-ByErenOzer-181717?style=for-the-badge&logo=github)](https://github.com/ByErenOzer)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErenOzer-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/eren-%C3%B6zer/)

</div>

