from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationship
    trainings = relationship("DeepLearningTraining", back_populates="user")

class DeepLearningTraining(Base):
    __tablename__ = "deep_learning_training"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Dataset bilgileri
    dataset_name = Column(String, nullable=False)
    
    # Preprocessing parametreleri
    image_size = Column(String, nullable=False)
    normalization_method = Column(String, nullable=False)
    train_ratio = Column(Float, nullable=False)
    test_ratio = Column(Float, nullable=False)
    validation_ratio = Column(Float, nullable=False)
    
    # Model parametreleri
    model_name = Column(String, nullable=False)
    
    # Training parametreleri
    optimizer = Column(String, nullable=False)
    batch_size = Column(Integer, nullable=False)
    epochs = Column(Integer, nullable=False)
    learning_rate = Column(Float, nullable=False)
    
    # Regularization parametreleri
    dropout_enabled = Column(Boolean, default=False)
    weight_decay_enabled = Column(Boolean, default=False)
    early_stopping_enabled = Column(Boolean, default=False)
    learning_rate_scheduling_enabled = Column(Boolean, default=False)
    
    # Eğitim durumu ve metrikler
    training_status = Column(String, nullable=False, default="pending")
    current_epoch = Column(Integer, default=0)
    training_loss = Column(JSON)
    validation_loss = Column(JSON)
    training_accuracy = Column(JSON)
    validation_accuracy = Column(JSON)
    test_loss = Column(Float)
    test_accuracy = Column(Float)
    confusion_matrix = Column(JSON)
    
    # Zaman bilgileri
    start_time = Column(DateTime, default=datetime.datetime.utcnow)
    end_time = Column(DateTime)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Hata durumu
    error_message = Column(String)
    
    # Relationship
    user = relationship("User", back_populates="trainings") 