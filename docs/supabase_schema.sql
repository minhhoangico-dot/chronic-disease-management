-- Chronic disease ICD-10 master list
CREATE TABLE IF NOT EXISTS chronic_disease_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icd_code VARCHAR(10) NOT NULL,
    icd_pattern VARCHAR(20),
    disease_name_en VARCHAR(255),
    disease_name_vi VARCHAR(255),
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Synced patient data (from HIS)
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    his_patient_code VARCHAR(50) UNIQUE NOT NULL,
    patient_name VARCHAR(255),
    birth_year INTEGER,
    phone VARCHAR(20),
    address TEXT,
    insurance_code VARCHAR(50),
    last_synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patient chronic conditions
CREATE TABLE IF NOT EXISTS patient_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    icd_code VARCHAR(10),
    diagnosis_name VARCHAR(255),
    first_diagnosed_at DATE,
    is_active BOOLEAN DEFAULT true
);

-- Medicine prediction results
CREATE TABLE IF NOT EXISTS medicine_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    medicine_name VARCHAR(255),
    avg_quantity DECIMAL(10,2),
    unit VARCHAR(50),
    prescription_count INTEGER,
    avg_days_between INTEGER,
    last_prescription_date DATE,
    predicted_next_date DATE,
    prediction_confidence VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample chronic disease ICD codes
INSERT INTO chronic_disease_codes (icd_code, icd_pattern, disease_name_en, disease_name_vi, category) VALUES
('E10', 'E10%', 'Type 1 Diabetes Mellitus', 'Đái tháo đường type 1', 'Diabetes'),
('E11', 'E11%', 'Type 2 Diabetes Mellitus', 'Đái tháo đường type 2', 'Diabetes'),
('I10', 'I10%', 'Essential Hypertension', 'Tăng huyết áp nguyên phát', 'Hypertension'),
('I11', 'I11%', 'Hypertensive Heart Disease', 'Bệnh tim tăng huyết áp', 'Hypertension'),
('I20', 'I20%', 'Angina Pectoris', 'Đau thắt ngực', 'Heart Disease'),
('I25', 'I25%', 'Chronic Ischemic Heart Disease', 'Bệnh tim thiếu máu mạn', 'Heart Disease'),
('J44', 'J44%', 'COPD', 'Bệnh phổi tắc nghẽn mạn tính', 'Respiratory'),
('J45', 'J45%', 'Asthma', 'Hen suyễn', 'Respiratory'),
('N18', 'N18%', 'Chronic Kidney Disease', 'Bệnh thận mạn', 'Kidney'),
('F20', 'F20%', 'Schizophrenia', 'Tâm thần phân liệt', 'Mental Health')
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE chronic_disease_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_predictions ENABLE ROW LEVEL SECURITY;
