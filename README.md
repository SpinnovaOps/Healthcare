# Healthcare Analytics Platform

A modern web application for healthcare professionals to analyze patient data, conduct research, and make data-driven decisions. Built with React, TypeScript, and TensorFlow.js.

## Project Structure

### Root Configuration Files

- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Vite configuration for build and development
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

### Source Code (`/src`)

#### Core Application Files

- `main.tsx` - Application entry point
- `App.tsx` - Root component with routing setup
- `index.css` - Global styles and Tailwind imports

#### Components (`/src/components`)

##### Analysis Components
- `analysis/CaseControlStudy.tsx` - Component for conducting case-control studies
- `analysis/SimilarityMatrix.tsx` - Displays patient similarity scores

##### Chart Components
- `charts/PatientDistributionChart.tsx` - Pie chart for patient distributions
- `charts/TrendChart.tsx` - Line chart for trend visualization

##### Dashboard Components
- `dashboard/DashboardCard.tsx` - Reusable card component for dashboard metrics

##### Patient Components
- `patient/Pagination.tsx` - Pagination controls for patient lists
- `patient/PatientTable.tsx` - Table display for patient data
- `patient/SearchBar.tsx` - Search functionality for patient records

##### Other Components
- `Alert.tsx` - Toast notification component
- `Navbar.tsx` - Main navigation component
- `PageLayout.tsx` - Layout wrapper component
- `PrivacyControls.tsx` - Privacy settings interface

#### Pages (`/src/pages`)

- `DoctorDashboard.tsx` - Dashboard for clinicians
- `DoctorLogin.tsx` - Login page for doctors
- `Home.tsx` - Landing page
- `PatientDataViewer.tsx` - Patient data exploration interface
- `ResearcherDashboard.tsx` - Dashboard for researchers
- `ResearcherLogin.tsx` - Login page for researchers

#### Data (`/src/data`)

- `mockPatientData.ts` - Mock patient dataset generator
- `specialties/neurologistData.ts` - Neurologist-specific data
- `specialties/oncologistData.ts` - Oncologist-specific data
- `specialties/psychiatristData.ts` - Psychiatrist-specific data

#### Services (`/src/services`)

- `clusteringService.ts` - TensorFlow.js implementation for patient clustering
- `mlService.ts` - Machine learning service for patient analysis

#### Store (`/src/store`)

- `authStore.ts` - Authentication state management using Zustand
- `mlStore.ts` - Machine learning state management

#### Types (`/src/types`)

- `medical.ts` - TypeScript interfaces for medical data

#### Utils (`/src/utils`)

- `cn.ts` - Utility for managing class names
- `privacyUtils.ts` - Implementation of differential privacy
- `specialtyUtils.ts` - Utilities for specialty-specific operations

## Machine Learning Implementation

### 1. Autoencoder Neural Network

The platform implements a deep autoencoder using TensorFlow.js for dimensionality reduction and feature learning:

```typescript
Architecture:
- Input Layer: [patient_features_dim]
- Encoder Layers: [32 → 16 → 8]
- Bottleneck Layer: 8 neurons
- Decoder Layers: [8 → 16 → 32]
- Output Layer: [patient_features_dim]
```

Key features:
- ReLU activation functions for hidden layers
- Sigmoid activation for output layer
- Adam optimizer
- Mean Squared Error loss function
- Batch size of 32
- 50 training epochs

### 2. K-Means Clustering

Patient clustering is implemented using a custom K-means algorithm:

1. Feature Extraction:
   - Demographic data
   - Vital signs
   - Lab results
   - Medical conditions
   - Treatment history

2. Algorithm Steps:
   - Random centroid initialization
   - Distance calculation using cosine similarity
   - Cluster assignment optimization
   - Centroid updates
   - Convergence check

3. Hyperparameters:
   - Number of clusters (k): 5
   - Maximum iterations: 20
   - Convergence threshold: 1e-4

### 3. Similarity Analysis

Patient similarity is computed using multiple algorithms:

1. Cosine Similarity:
   - Used for comparing patient feature vectors
   - Normalized dot product calculation
   - Range: [-1, 1]

2. Euclidean Distance:
   - Secondary similarity metric
   - Used for continuous variables
   - Normalized to [0, 1] range

3. Jaccard Similarity:
   - Used for discrete features (conditions, treatments)
   - Set-based comparison
   - Range: [0, 1]

### 4. Differential Privacy

Privacy-preserving mechanisms:

1. Laplace Mechanism:
   - For numerical attributes
   - Configurable epsilon (ε) parameter
   - Sensitivity analysis per feature

2. Gaussian Noise:
   - For aggregate statistics
   - Calibrated standard deviation
   - Central Limit Theorem properties

3. Data Perturbation:
   - Random rounding
   - Value clamping
   - Categorical value swapping

## Key Features

1. **Specialty-Specific Dashboards**
   - Customized views for Neurologists, Oncologists, and Psychiatrists
   - Specialty-specific patient metrics and analytics
   - Real-time data updates

2. **Advanced Analytics**
   - Patient clustering using TensorFlow.js
   - Case-control studies with matching algorithms
   - Similarity analysis with multiple metrics
   - Trend detection and forecasting

3. **Privacy Controls**
   - Differential privacy implementation
   - Configurable privacy levels
   - Data perturbation controls
   - Audit logging

4. **Interactive Visualizations**
   - Patient distribution charts
   - Trend analysis with multiple variables
   - Condition tracking over time
   - Correlation matrices

5. **Role-Based Access**
   - Separate interfaces for doctors and researchers
   - Specialized tools for each role
   - Granular permission controls

## Technology Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Styling**: Tailwind CSS with custom configurations
- **Machine Learning**: TensorFlow.js 4.17
- **State Management**: Zustand 4.5
- **Build Tool**: Vite 5.4
- **Icons**: Lucide React
- **Charts**: Recharts 2.12

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm run test
   ```

## Architecture Decisions

1. **Component Organization**
   - Atomic design principles
   - Modular component structure
   - Separation of concerns
   - Reusable components
   - Type-safe props

2. **State Management**
   - Zustand for global state
   - React Query for data fetching
   - Local state for UI components
   - Immutable state updates
   - Persistent storage

3. **Privacy Implementation**
   - Laplace mechanism
   - Configurable epsilon values
   - Data perturbation
   - Access controls
   - Audit trails

4. **Machine Learning Integration**
   - Browser-based ML
   - Incremental learning
   - Model persistence
   - Feature engineering
   - Performance optimization

## Security Considerations

1. **Data Protection**
   - Differential privacy
   - Data encryption
   - Secure transmission
   - Access logging

2. **Authentication**
   - Role-based access
   - Session management
   - Token validation
   - Password policies

3. **Privacy**
   - Data anonymization
   - Consent management
   - Data retention
   - Export controls

4. **Compliance**
   - HIPAA guidelines
   - GDPR requirements
   - Audit trails
   - Data governance

## Performance Optimization

1. **Frontend**
   - Code splitting
   - Lazy loading
   - Memoization
   - Virtual scrolling
   - Asset optimization

2. **Machine Learning**
   - Model compression
   - Batch processing
   - WebGL acceleration
   - Cached predictions
   - Incremental updates

## Future Enhancements

1. **Analytics**
   - Advanced forecasting
   - Natural language processing
   - Image analysis
   - Real-time monitoring

2. **Integration**
   - EHR systems
   - Medical devices
   - Lab systems
   - Pharmacy systems

3. **Features**
   - Mobile support
   - Offline mode
   - Multi-language
   - Dark theme
   - Accessibility improvements