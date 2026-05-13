# SHINRAI AI/ML Pipeline Architecture

## AI/ML Components Overview

```
┌─────────────────────────────────────────────────────────┐
│             SHINRAI AI/ML PIPELINE                      │
└─────────────────────────────────────────────────────────┘

Input: New Complaint
    ├─ Text: Title + Description
    ├─ Images: Photos (if provided)
    ├─ Metadata: Location, user, timestamp
    │
    ├─ [1] NLP Processing
    │   ├─ Tokenization
    │   ├─ Embedding (BERT)
    │   └─ Output: Category + Confidence
    │
    ├─ [2] Computer Vision
    │   ├─ Object Detection (YOLOv8)
    │   ├─ Damage Assessment (CNN)
    │   └─ Output: Damage Level + Objects
    │
    ├─ [3] Duplicate Detection
    │   ├─ Semantic Similarity (Sentence-BERT)
    │   ├─ Database Search
    │   └─ Output: Similar Complaints + Scores
    │
    ├─ [4] Predictive Analytics
    │   ├─ Feature Engineering
    │   ├─ Ensemble Models
    │   └─ Output: Priority, Time, Department
    │
    └─ Output: Enhanced Complaint with AI Insights
```

---

## [1] NLP PROCESSING PIPELINE

### Purpose
Automatically categorize complaints and extract key information

### Architecture

```
Raw Text Input
    ↓
[Preprocessing Layer]
├─ Lowercase conversion
├─ Punctuation removal
├─ Tokenization
├─ Stop word removal
├─ Lemmatization
    ↓
[Feature Extraction Layer]
├─ TF-IDF vectorization
├─ Word embeddings
├─ Sentence embeddings (BERT)
    ↓
[Classification Layer]
├─ BERT Multi-class Classifier
├─ Softmax probabilities
├─ Top 3 predictions
    ↓
Output: Category + Confidence
```

### Model Details

**Model**: BERT-base-uncased (fine-tuned)
**Input**: Text (max 512 tokens)
**Output**: 6 classes with confidence scores

**Categories**:
1. Facilities & Infrastructure
2. IT & Technology  
3. Security & Safety
4. Academic Affairs
5. Student Services
6. Other

**Training Data Required**: 1000+ labeled examples per category

**Performance Target**: 95%+ accuracy

**Real-time Processing**: < 500ms per complaint

### Implementation

```python
# Pseudocode
from transformers import AutoTokenizer, AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=6)
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

def categorize(text):
    inputs = tokenizer(text, truncation=True, padding=True, return_tensors="pt")
    outputs = model(**inputs)
    probabilities = softmax(outputs.logits)
    
    top_3 = np.argsort(probabilities[0])[-3:][::-1]
    return {
        'category': CATEGORIES[top_3[0]],
        'confidence': probabilities[0][top_3[0]].item(),
        'alternatives': [
            {'category': CATEGORIES[top_3[1]], 'confidence': probabilities[0][top_3[1]].item()},
            {'category': CATEGORIES[top_3[2]], 'confidence': probabilities[0][top_3[2]].item()}
        ]
    }
```

---

## [2] COMPUTER VISION PIPELINE

### Purpose
Analyze photos to assess damage and identify issue type

### Architecture

```
Image Upload
    ↓
[Preprocessing Layer]
├─ Resize (640x640)
├─ Normalize
├─ Augmentation (optional)
    ↓
[Object Detection Layer]
├─ YOLOv8 Model
├─ Real-time detection
├─ Bounding boxes + classes
    ↓
[Damage Assessment Layer]
├─ ResNet50 CNN
├─ Damage classifier
├─ Severity: Low/Medium/High/Critical
    ↓
[Output Layer]
├─ Objects detected
├─ Damage level
├─ Confidence scores
    ↓
Output: Damage Assessment
```

### Model Details

**Detection Model**: YOLOv8 (medium variant)
**Classification Model**: ResNet50 (fine-tuned)

**Detectable Objects**:
- Broken lights
- Water damage
- Cracks
- Stains
- Trash/debris
- Furniture damage
- Windows/doors damage
- Plumbing issues
- Electrical issues
- Safety hazards

**Damage Levels**:
- Low: Cosmetic, no urgency
- Medium: Functional, needs attention
- High: Safety concern, urgent
- Critical: Emergency, immediate action

**Performance Target**: 85%+ accuracy

**Real-time Processing**: < 2 seconds per image

### Implementation

```python
# Pseudocode
from ultralytics import YOLO
import torchvision.models as models

yolo_model = YOLO("yolov8m.pt")  # YOLOv8 medium
damage_model = models.resnet50(pretrained=True)

def analyze_image(image_path):
    # Object detection
    results = yolo_model(image_path)
    detections = results[0].boxes
    
    objects = [OBJECT_NAMES[int(box.cls)] for box in detections]
    
    # Damage assessment
    image = load_image(image_path)
    damage_logits = damage_model(preprocess(image))
    damage_level = DAMAGE_LEVELS[np.argmax(damage_logits)]
    confidence = np.max(softmax(damage_logits))
    
    return {
        'objects': objects,
        'damage_level': damage_level,
        'confidence': confidence,
        'repair_estimate_hours': estimate_hours(objects, damage_level)
    }
```

---

## [3] DUPLICATE DETECTION PIPELINE

### Purpose
Identify similar/duplicate complaints to reduce redundant work

### Architecture

```
New Complaint Text
    ↓
[Embedding Generation]
├─ Sentence-BERT model
├─ Generate vector (384 dimensions)
    ↓
[Database Search]
├─ Vector similarity search
├─ Cosine similarity calculation
├─ Top 5 matches
    ↓
[Filtering Layer]
├─ Filter by similarity > 70%
├─ Filter by status (exclude closed)
├─ Filter by recent (last 30 days)
    ↓
Output: Similar Complaints
```

### Model Details

**Model**: Sentence-BERT (all-MiniLM-L6-v2)
**Embedding Dimension**: 384
**Database**: Vector search (FAISS or PostgreSQL pgvector)

**Similarity Thresholds**:
- > 90%: Likely duplicate (alert user)
- 80-90%: Highly similar (show as related)
- 70-80%: Similar (show as reference)
- < 70%: Not similar

**Performance Target**: 
- Recall > 90% (find duplicates)
- Precision > 85% (no false positives)

**Real-time Processing**: < 200ms per search

### Implementation

```python
# Pseudocode
from sentence_transformers import SentenceTransformer
import faiss

model = SentenceTransformer('all-MiniLM-L6-v2')
index = faiss.IndexFlatL2(384)  # Load from database

def find_similar(complaint_text):
    # Generate embedding
    embedding = model.encode(complaint_text)
    
    # Search database
    distances, indices = index.search(embedding.reshape(1, -1), k=5)
    
    # Convert distances to similarity scores
    similarities = 1 / (1 + distances[0])
    
    results = []
    for idx, similarity in zip(indices[0], similarities):
        complaint_id = get_complaint_id(idx)
        if similarity > 0.7:
            results.append({
                'complaint_id': complaint_id,
                'similarity_score': similarity,
                'status': get_status(complaint_id),
                'action': get_merge_action(similarity)
            })
    
    return results
```

---

## [4] PREDICTIVE ANALYTICS PIPELINE

### Purpose
Predict resolution time, priority, and optimal routing

### Architecture

```
Complaint Features
    ├─ Category
    ├─ Damage level
    ├─ Text length
    ├─ Hour of submission
    ├─ Day of week
    ├─ Sentiment
    ├─ Location
    ├─ Images (count)
    │
    ↓
[Feature Engineering]
├─ Normalize numerical features
├─ One-hot encode categoricals
├─ Add interaction features
├─ Feature scaling
    ↓
[Model Ensemble]
├─ Random Forest (Tree-based)
├─ XGBoost (Boosted)
├─ Neural Network (Deep)
├─ Average predictions
    ↓
Output: Predictions
├─ Resolution time (days)
├─ Priority level
├─ Department recommendation
├─ Confidence score
```

### Model Details

**Models**:
- Random Forest (100 trees, depth 15)
- XGBoost (100 iterations, depth 6)
- Neural Network (3 hidden layers, 128 units)

**Outputs**:
1. **Resolution Time**: Regression model
   - Target: 1-30 days
   - MAE target: ± 2 days
   
2. **Priority**: Classification model
   - Classes: Low, Medium, High, Critical
   - Accuracy target: 90%
   
3. **Department**: Classification model
   - Classes: 6 departments
   - Accuracy target: 95%

**Training Data Required**: 2000+ historical complaints

**Model Retraining**: Weekly (Sundays 2 AM)

### Implementation

```python
# Pseudocode
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.neural_network import MLPRegressor

# Load trained models
rf_time = load_model('random_forest_time.pkl')
xgb_time = load_model('xgboost_time.pkl')
nn_time = load_model('neural_net_time.pkl')

def predict_resolution_time(complaint_features):
    # Feature engineering
    X = engineer_features(complaint_features)
    
    # Individual predictions
    rf_pred = rf_time.predict([X])[0]
    xgb_pred = xgb_time.predict([X])[0]
    nn_pred = nn_time.predict([X])[0]
    
    # Ensemble (average)
    ensemble_pred = np.mean([rf_pred, xgb_pred, nn_pred])
    confidence = np.std([rf_pred, xgb_pred, nn_pred]) ** -1
    
    return {
        'estimated_days': int(ensemble_pred),
        'confidence': confidence,
        'range': {
            'optimistic': int(ensemble_pred - 1),
            'realistic': int(ensemble_pred),
            'pessimistic': int(ensemble_pred + 2)
        }
    }
```

---

## AI Pipeline Integration

### Data Flow

```
Complaint Submission
    ↓
Trigger AI Processing (Async)
    ├─ Queue Task: "process_complaint_123"
    │
    ├─ [1] NLP Categorization
    │   └─ Store: category, confidence
    │
    ├─ [2] Image Analysis (if images)
    │   └─ Store: damage_level, objects
    │
    ├─ [3] Duplicate Detection
    │   └─ Store: related_complaints, similarity_scores
    │
    └─ [4] Predictive Predictions
        └─ Store: estimated_time, priority, department
    
    ↓
Update Complaint with AI Insights
    ├─ Set category
    ├─ Set damage level
    ├─ Set estimated time
    ├─ Flag if likely duplicate
    └─ Recommend department
    
    ↓
Ready for Human Review & Routing
```

### Performance Requirements

| Component | Latency | Throughput | Accuracy |
|-----------|---------|-----------|----------|
| NLP | < 500ms | 1000/day | 95% |
| CV | < 2s | 500/day | 85% |
| Duplicate | < 200ms | 1000/day | 90% recall |
| Predictive | < 300ms | 1000/day | 90% |

### Monitoring & Feedback

```
Daily Monitoring:
├─ Model accuracy tracking
├─ User override tracking
├─ Feedback collection
├─ Performance dashboards

Weekly Retraining:
├─ Collect new labeled data
├─ Retrain models
├─ Validate improvements
├─ Deploy if >1% improvement

Monthly Analysis:
├─ User satisfaction correlation
├─ False positive analysis
├─ Drift detection
├─ Model performance reports
```

---

## Deployment Strategy

### Phase 6.1: NLP Model
- Deploy NLP categorization
- Beta test with 10% of traffic
- 2 week validation period
- Full rollout if 95% accuracy achieved

### Phase 6.2: Computer Vision
- Deploy image analysis
- Beta test with 10% of traffic
- 2 week validation period
- Full rollout if 85% accuracy achieved

### Phase 6.3: Duplicate Detection
- Deploy duplicate detection
- Beta test with 20% of traffic
- 2 week validation period
- Full rollout if 90% recall achieved

### Phase 6.4: Predictive Models
- Deploy predictions
- Beta test with 30% of traffic
- 3 week validation period
- Full rollout if 90% accuracy achieved

---

## Training Data Requirements

| Model | Data Needed | Labels | Effort |
|-------|------------|--------|--------|
| NLP | 6000 complaints | Category | 2 weeks |
| CV | 2000 images | Damage level | 2 weeks |
| Duplicate | 1000 complaint pairs | Similar/Not | 1 week |
| Predictive | 3000 complaints | Actual times | Done (historical) |

---

**Status**: ✅ Complete
**Last Updated**: May 13, 2026
