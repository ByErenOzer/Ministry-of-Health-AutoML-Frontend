# backend/main.py

import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, engine
import models
from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginData(BaseModel):
    username: str
    password: str

class DeepLearningTrainingCreate(BaseModel):
    dataset_name: str
    image_size: str
    normalization_method: str
    train_ratio: float
    test_ratio: float
    validation_ratio: float
    model_name: str
    optimizer: str
    batch_size: int
    epochs: int
    learning_rate: float
    dropout_enabled: bool = False
    weight_decay_enabled: bool = False
    early_stopping_enabled: bool = False
    learning_rate_scheduling_enabled: bool = False

class DeepLearningTrainingUpdate(BaseModel):
    current_epoch: Optional[int] = None
    training_loss: Optional[Dict] = None
    validation_loss: Optional[Dict] = None
    training_accuracy: Optional[Dict] = None
    validation_accuracy: Optional[Dict] = None
    test_loss: Optional[float] = None
    test_accuracy: Optional[float] = None
    confusion_matrix: Optional[Dict] = None
    training_status: Optional[str] = None
    error_message: Optional[str] = None
    end_time: Optional[datetime] = None

class DeepLearningTrainingResponse(BaseModel):
    id: int
    dataset_name: str
    image_size: str
    normalization_method: str
    train_ratio: float
    test_ratio: float
    validation_ratio: float
    model_name: str
    optimizer: str
    batch_size: int
    epochs: int
    learning_rate: float
    dropout_enabled: bool
    weight_decay_enabled: bool
    early_stopping_enabled: bool
    learning_rate_scheduling_enabled: bool
    training_status: str
    current_epoch: int
    training_loss: Optional[Dict]
    validation_loss: Optional[Dict]
    training_accuracy: Optional[Dict]
    validation_accuracy: Optional[Dict]
    test_loss: Optional[float]
    test_accuracy: Optional[float]
    confusion_matrix: Optional[Dict]
    start_time: datetime
    end_time: Optional[datetime]
    created_at: datetime
    error_message: Optional[str]

    class Config:
        from_attributes = True

@app.post("/api/login")
def login(login_data: LoginData, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.username == login_data.username,
        models.User.password == login_data.password
    ).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Kullanıcı adı veya şifre hatalı")
    
    return {"status": "success", "username": user.username}

@app.post("/api/deep-learning/training", response_model=DeepLearningTrainingResponse)
def create_training(
    training_data: DeepLearningTrainingCreate,
    username: str,
    db: Session = Depends(get_db)
):
    # Kullanıcıyı bul
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    # Yeni eğitim oluştur
    db_training = models.DeepLearningTraining(
        user_id=user.id,
        **training_data.dict()
    )
    
    db.add(db_training)
    db.commit()
    db.refresh(db_training)
    return db_training

@app.get("/api/deep-learning/training/{training_id}", response_model=DeepLearningTrainingResponse)
def get_training(
    training_id: int,
    username: str,
    db: Session = Depends(get_db)
):
    # Kullanıcıyı bul
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    # Eğitimi bul
    training = db.query(models.DeepLearningTraining).filter(
        models.DeepLearningTraining.id == training_id,
        models.DeepLearningTraining.user_id == user.id
    ).first()
    
    if not training:
        raise HTTPException(status_code=404, detail="Eğitim bulunamadı")
    
    return training

@app.get("/api/deep-learning/training", response_model=List[DeepLearningTrainingResponse])
def list_trainings(
    username: str,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    # Kullanıcıyı bul
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    # Eğitimleri listele
    trainings = db.query(models.DeepLearningTraining).filter(
        models.DeepLearningTraining.user_id == user.id
    ).order_by(
        models.DeepLearningTraining.created_at.desc()
    ).offset(skip).limit(limit).all()
    
    return trainings

@app.put("/api/deep-learning/training/{training_id}", response_model=DeepLearningTrainingResponse)
def update_training(
    training_id: int,
    training_data: DeepLearningTrainingUpdate,
    username: str,
    db: Session = Depends(get_db)
):
    # Kullanıcıyı bul
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    # Eğitimi bul
    training = db.query(models.DeepLearningTraining).filter(
        models.DeepLearningTraining.id == training_id,
        models.DeepLearningTraining.user_id == user.id
    ).first()
    
    if not training:
        raise HTTPException(status_code=404, detail="Eğitim bulunamadı")
    
    # Eğitimi güncelle
    for key, value in training_data.dict(exclude_unset=True).items():
        setattr(training, key, value)
    
    db.commit()
    db.refresh(training)
    return training

@app.delete("/api/deep-learning/training/{training_id}")
def delete_training(
    training_id: int,
    username: str,
    db: Session = Depends(get_db)
):
    # Kullanıcıyı bul
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    # Eğitimi bul
    training = db.query(models.DeepLearningTraining).filter(
        models.DeepLearningTraining.id == training_id,
        models.DeepLearningTraining.user_id == user.id
    ).first()
    
    if not training:
        raise HTTPException(status_code=404, detail="Eğitim bulunamadı")
    
    # Eğitimi sil
    db.delete(training)
    db.commit()
    
    return {"status": "success", "message": "Eğitim başarıyla silindi"}
