import React, { useState } from 'react'
import './App.css'
import ImageUpload from './components/ImageUpload'
import PredictionResult from './components/PredictionResult'
import Header from './components/Header'

interface PredictionData {
  predicted_class: string
  confidence: number
  is_defect: boolean
}

function App() {
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictionData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleImageUpload = async (file: File) => {
    setLoading(true)
    setError(null)
    setPrediction(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Prediction failed. Please try again.')
      }

      const data: PredictionData = await response.json()
      setPrediction(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the image.')
      setUploadedImage(null)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPrediction(null)
    setError(null)
    setUploadedImage(null)
  }

  return (
    <div className="app">
      <Header />
      <main className="container">
        <section className="hero-card">
          <h2>Fabric defect detection with one simple flow</h2>
          <p>Upload a fabric image or capture it with your camera, then review the AI result.</p>
        </section>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="content">
          {!prediction ? (
            <ImageUpload onUpload={handleImageUpload} loading={loading} onError={setError} />
          ) : (
            <PredictionResult
              prediction={prediction}
              image={uploadedImage}
              onReset={handleReset}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
