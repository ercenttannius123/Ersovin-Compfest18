import React, { useEffect, useRef, useState } from 'react'

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
  const readyCheckIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [mode, setMode] = useState<InputMode>('upload')
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)

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

  const clearReadyCheck = () => {
    if (readyCheckIntervalRef.current) {
      clearInterval(readyCheckIntervalRef.current)
      readyCheckIntervalRef.current = null
    }
  }

  const handleVideoReady = () => {
    console.log('[FabriScan] handleVideoReady terpanggil, cameraReady -> true')
    setCameraReady(true)
    clearReadyCheck()
  }

  const startCamera = async () => {
    console.log('[FabriScan] === startCamera dipanggil ===')
    try {
      setCameraError(null)
      setCameraReady(false)
      onError('')

      let stream: MediaStream | null = null

      try {
        console.log('[FabriScan] mencoba getUserMedia facingMode environment...')
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        })
        console.log('[FabriScan] berhasil dapat stream (environment):', stream)
      } catch (envErr) {
        console.log('[FabriScan] gagal environment, fallback ke video:true. Error:', envErr)
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })
        console.log('[FabriScan] berhasil dapat stream (fallback):', stream)
      }

      // PENTING: elemen <video> baru ada di DOM setelah cameraActive
      // jadi true (lihat JSX di bawah, video cuma dirender kalau
      // cameraActive === true). Jadi di sini kita CUMA simpan stream-nya
      // ke state dulu dan set cameraActive true. Assignment ke
      // videoRef.current dipindah ke useEffect terpisah yang jalan
      // setelah React selesai me-render elemen video-nya.
      console.log('[FabriScan] menyimpan stream ke state, mengaktifkan cameraActive')
      setCameraStream(stream)
      setCameraActive(true)
    } catch (error) {
      console.error('[FabriScan] startCamera gagal total, masuk catch luar:', error)
      const errorMsg = error instanceof Error ? error.message : 'Akses kamera ditolak.'
      setCameraError(errorMsg)
    }
  }

  // Efek ini yang benar-benar nyambungin stream ke elemen <video>.
  // Jalan setiap kali cameraActive atau cameraStream berubah, dan di
  // titik ini videoRef.current dijamin sudah terisi karena elemen
  // video sudah pasti ke-render (cameraActive sudah true).
  useEffect(() => {
    if (!cameraActive || !cameraStream || !videoRef.current) {
      console.log('[FabriScan] effect assign stream: syarat belum lengkap', {
        cameraActive,
        hasStream: !!cameraStream,
        hasVideoRef: !!videoRef.current,
      })
      return
    }

    const video = videoRef.current
    console.log('[FabriScan] effect assign stream: video element ditemukan, assign srcObject')

    video.srcObject = cameraStream
    video.muted = true
    video.playsInline = true

    video.addEventListener('loadedmetadata', handleVideoReady, { once: true })
    video.addEventListener('canplay', handleVideoReady, { once: true })
    video.addEventListener('playing', handleVideoReady, { once: true })

    video.play()
      .then(() => console.log('[FabriScan] video.play() berhasil'))
      .catch((playError) => console.warn('[FabriScan] video.play() gagal (autoplay blocked?):', playError))

    if (video.readyState >= 3 || video.videoWidth > 0) {
      console.log('[FabriScan] video sudah ready langsung, readyState:', video.readyState, 'videoWidth:', video.videoWidth)
      setCameraReady(true)
    } else {
      console.log('[FabriScan] video belum ready, mulai polling fallback...')
      clearReadyCheck()
      let attempts = 0
      readyCheckIntervalRef.current = setInterval(() => {
        attempts += 1
        if (videoRef.current && videoRef.current.videoWidth > 0) {
          console.log('[FabriScan] polling berhasil dapat videoWidth:', videoRef.current.videoWidth, 'di attempt ke-', attempts)
          setCameraReady(true)
          clearReadyCheck()
        } else if (attempts > 30) {
          console.warn('[FabriScan] polling menyerah setelah 30 attempt, videoWidth masih 0')
          clearReadyCheck()
        }
      }, 150)
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleVideoReady)
      video.removeEventListener('canplay', handleVideoReady)
      video.removeEventListener('playing', handleVideoReady)
    }
  }, [cameraActive, cameraStream])

  const stopCamera = () => {
    clearReadyCheck()
    const stream = cameraStream || (videoRef.current?.srcObject as MediaStream | null)
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
    setCameraReady(false)
    setCameraStream(null)
  }

  useEffect(() => {
    return () => {
      clearReadyCheck()
    }
  }, [])

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const context = canvasRef.current.getContext('2d')
    if (!context) {
      onError('Gagal mengambil foto dari kamera.')
      return
    }

    const width = videoRef.current.videoWidth || 640
    const height = videoRef.current.videoHeight || 480
    canvasRef.current.width = width
    canvasRef.current.height = height
    context.drawImage(videoRef.current, 0, 0, width, height)

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
              <div className="camera-preview">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="camera-video"
                />
                {!cameraReady && (
                  <div className="camera-preview-overlay">
                    <p>Memuat preview kamera... Tunggu sampai video muncul.</p>
                  </div>
                )}
                {cameraReady && (
                  <div className="camera-preview-frame">
                    <span>Live Preview</span>
                  </div>
                )}
              </div>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <div className="camera-status">
                {cameraReady ? (
                  <p>Camera ready. Arahkan kain di depan kamera lalu tekan Capture.</p>
                ) : (
                  <p>Menunggu kamera siap... Pastikan izin kamera sudah diberikan.</p>
                )}
              </div>
              <div className="camera-controls">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={stopCamera}
                  disabled={loading}
                >
                  Stop Camera
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={capturePhoto}
                  disabled={loading || !cameraReady}
                >
                  {loading ? 'Analyzing...' : 'Capture Photo'}
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