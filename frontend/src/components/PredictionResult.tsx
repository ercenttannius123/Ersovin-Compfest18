import React from 'react'

interface PredictionData {
  predicted_class: string
  confidence: number
  is_defect: boolean
}

interface PredictionResultProps {
  prediction: PredictionData
  image: string | null
  onReset: () => void
}

function PredictionResult({ prediction, image, onReset }: PredictionResultProps) {
  const confidenceValue = Math.max(0, Math.min(Number(prediction.confidence), 100))
  const confidencePercentage = confidenceValue.toFixed(1)
  const isDefect = prediction.is_defect
  const statusColor = isDefect ? '#ef4444' : '#10b981'
  const statusIcon = isDefect ? '⚠️' : '✓'

  return (
    <div className="result-section">
      <div className="result-container">
        <div className="result-image-area">
          {image ? (
            <img src={image} alt="Uploaded fabric" className="result-image" />
          ) : (
            <div className="image-placeholder">No image preview available</div>
          )}
        </div>

        <div className="result-content">
          <div className="result-header">
            <h2 className="result-title">Detection Result</h2>
            <div className="result-status" style={{ borderColor: statusColor }}>
              <span className="status-icon">{statusIcon}</span>
              <span className="status-text" style={{ color: statusColor }}>
                {isDefect ? 'Defect Detected' : 'No Defect'}
              </span>
            </div>
          </div>

          <div className="result-details">
            <div className="detail-item">
              <label>Classification</label>
              <p className="detail-value">{prediction.predicted_class}</p>
            </div>

            <div className="detail-item">
              <label>Confidence Score</label>
              <div className="confidence-display">
                <div className="confidence-bar-container">
                  <div
                    className="confidence-bar"
                    style={{
                      width: `${confidenceValue}%`,
                      backgroundColor: statusColor,
                    }}
                  ></div>
                </div>
                <p className="confidence-text">{confidencePercentage}%</p>
              </div>
            </div>

            <div className="detail-item">
              <label>Interpretation</label>
              <p className="detail-description">
                {isDefect
                  ? 'Sample terdeteksi mengandung cacat. Lakukan pemeriksaan lebih lanjut dan kategorikan jenis cacat.'
                  : 'Sample kain terlihat bebas cacat. Proses quality check berhasil.'}
              </p>
            </div>
          </div>

          <div className="result-actions">
            <button className="btn btn-primary" onClick={onReset}>
              Analyze Another Image
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionResult
