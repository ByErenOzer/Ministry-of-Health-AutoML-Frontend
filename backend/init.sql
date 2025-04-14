CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Eren1 ve Eren2 kullanıcılarını ekleme
INSERT INTO users (username, password) VALUES
    ('eren1', 'eren1'),
    ('eren2', 'eren2')
ON CONFLICT (username) DO NOTHING;

-- Deep Learning eğitim tablosu
CREATE TABLE IF NOT EXISTS deep_learning_training (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    
    -- Dataset bilgileri
    dataset_name VARCHAR(100) NOT NULL, -- 'brain_tumor'
    
    -- Preprocessing parametreleri
    image_size VARCHAR(10) NOT NULL,    -- '32x32', '64x64', '128x128', '224x224'
    normalization_method VARCHAR(20) NOT NULL, -- 'minmax', 'zscore', 'mean'
    train_ratio FLOAT NOT NULL,
    test_ratio FLOAT NOT NULL,
    validation_ratio FLOAT NOT NULL,
    
    -- Model parametreleri
    model_name VARCHAR(50) NOT NULL,    -- 'resnet50', 'efficientnet_b0', vs.
    
    -- Training parametreleri
    optimizer VARCHAR(20) NOT NULL,      -- 'adam', 'rmsprop', 'sgd'
    batch_size INTEGER NOT NULL,         -- 16, 32, 64, 128
    epochs INTEGER NOT NULL,             -- 20, 50, 100, 200
    learning_rate FLOAT NOT NULL,        -- 0.01, 0.001, 0.0001
    
    -- Regularization parametreleri
    dropout_enabled BOOLEAN DEFAULT false,
    weight_decay_enabled BOOLEAN DEFAULT false,
    early_stopping_enabled BOOLEAN DEFAULT false,
    learning_rate_scheduling_enabled BOOLEAN DEFAULT false,
    
    -- Eğitim durumu ve metrikler
    training_status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
    current_epoch INTEGER DEFAULT 0,
    training_loss JSONB,        -- Her epoch için loss değerleri
    validation_loss JSONB,      -- Her epoch için validation loss değerleri
    training_accuracy JSONB,    -- Her epoch için accuracy değerleri
    validation_accuracy JSONB,  -- Her epoch için validation accuracy değerleri
    test_loss FLOAT,           -- Final test loss
    test_accuracy FLOAT,       -- Final test accuracy
    confusion_matrix JSONB,    -- Test seti için confusion matrix
    
    -- Zaman bilgileri
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Hata durumu
    error_message TEXT
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_deep_learning_training_user_id ON deep_learning_training(user_id);
CREATE INDEX IF NOT EXISTS idx_deep_learning_training_status ON deep_learning_training(training_status);
CREATE INDEX IF NOT EXISTS idx_deep_learning_training_created_at ON deep_learning_training(created_at); 