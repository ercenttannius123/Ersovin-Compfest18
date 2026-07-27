import React, { useRef, useState } from 'react'

interface ImageUploadProps {
  onUpload: (file: File) => void
  onError: (message: string) => void
  loading: boolean
}

type InputMode = 'upload' | 'camera'

function ImageUpload({ onUpload, onError, loading }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [mode, setMode] = useState<InputMode>('upload')
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      onError('Silakan pilih file gambar.')
      return
    }

    onUpload(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')

    const file = e.dataTransfer.files?.[0]
    if (!file) {
      onError('Tidak ada file yang diterima.')
      return
    }

    if (!file.type.startsWith('image/')) {
      onError('Silakan drop file gambar.')
      return
    }

    onUpload(file)
  }

  const startCamera = async () => {
    try {
      setCameraError(null)
      onError('')
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Akses kamera ditolak.'
      setCameraError(errorMsg)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const context = canvasRef.current.getContext('2d')
    if (!context) {
      onError('Gagal mengambil foto dari kamera.')
      return
    }

    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
    context.drawImage(videoRef.current, 0, 0)

    canvasRef.current.toBlob((blob) => {
      if (!blob) {
        onError('Gagal membuat file foto.')
        return
      }

      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
      stopCamera()
      onUpload(file)
    }, 'image/jpeg', 0.95)
  }

  const switchMode = (newMode: InputMode) => {
    if (cameraActive) {
      stopCamera()
    }
    setMode(newMode)
    setCameraError(null)
  }

  return (
    <div className="upload-section">
      <h2 className="section-title">Analyze Fabric Image</h2>
      <p className="section-description">
        Upload an image or capture directly from your camera.
      </p>

      <div className="mode-toggle">
        <button
          type="button"
          className={`toggle-btn ${mode === 'upload' ? 'active' : ''}`}
          onClick={() => switchMode('upload')}
        >
          📁 Upload
        </button>
        <button
          type="button"
          className={`toggle-btn ${mode === 'camera' ? 'active' : ''}`}
          onClick={() => switchMode('camera')}
        >
          📷 Camera
        </button>
      </div>

      {mode === 'upload' && (
        <div
          className={`upload-area ${loading ? 'loading' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleFileClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            style={{ display: 'none' }}
          />

          {loading ? (
            <div className="upload-loading">
              <div className="spinner"></div>
              <p>Analyzing image...</p>
            </div>
          ) : (
            <div className="upload-content">
              <div className="upload-icon">📸</div>
              <h3>Click or drag to upload</h3>
              <p>Supported formats: JPG, PNG</p>
              <button type="button" className="upload-button" onClick={handleFileClick}>
                Select Image
              </button>
            </div>
          )}
        </div>
      )}

      {mode === 'camera' && (
        <div className="camera-section">
          {!cameraActive ? (
            <div className="camera-start">
              <div className="camera-icon">📷</div>
              <h3>Capture from Camera</h3>
              <p>Use your device camera to capture fabric images.</p>
              <button
                type="button"
                className="upload-button"
                onClick={startCamera}
                disabled={loading}
              >
                Start Camera
              </button>
              {cameraError && <p className="camera-error">⚠️ {cameraError}</p>}
            </div>
          ) : (
            <div className="camera-active">
              <video ref={videoRef} autoPlay playsInline className="camera-video" />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <div className="camera-controls">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={stopCamera}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={capturePhoto}
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Capture'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="upload-hints">
        <h4>Tips for best results:</h4>
        <ul>
          <li>✓ Ensure good lighting and clear visibility</li>
          <li>✓ Capture the fabric from directly above</li>
          <li>✓ Keep the entire defect within the frame</li>
          <li>✓ Use clear, focused images for best AI performance</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageUpload
