# backend/celery_app.py

import os
from celery import Celery

celery = Celery(
    "worker",
    broker=os.getenv('RABBITMQ_URL'),
    backend=os.getenv('REDIS_URL'),
    broker_connection_retry_on_startup=True,
)


@celery.task
def train_model(data):
    # Model eğitimi kodları burada olacak
    return "Model eğitimi tamamlandı."

