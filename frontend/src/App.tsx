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

    // Preview image
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
      setError(err instanceof Error ? err.message : 'An error occurred')
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
        <div className="content">
          {!prediction ? (
            <ImageUpload onUpload={handleImageUpload} loading={loading} />
          ) : (
            <>
              <PredictionResult
                prediction={prediction}
                image={uploadedImage}
                onReset={handleReset}
              />
            </>
          )}

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
