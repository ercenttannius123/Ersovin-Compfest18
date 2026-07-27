import React, { useRef } from 'react'

interface ImageUploadProps {
  onUpload: (file: File) => void
  loading: boolean
}

function ImageUpload({ onUpload, loading }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      onUpload(file)
    }
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
    if (file && file.type.startsWith('image/')) {
      onUpload(file)
    } else {
      alert('Please drop an image file')
    }
  }

  return (
    <div className="upload-section">
      <h2 className="section-title">Upload Fabric Image</h2>
      <p className="section-description">
        Upload an image of the fabric to detect defects using AI
      </p>

      <div
        className={`upload-area ${loading ? 'loading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
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
            <button className="upload-button" onClick={handleClick}>
              Select Image
            </button>
          </div>
        )}
      </div>

      <div className="upload-hints">
        <h4>Tips for best results:</h4>
        <ul>
          <li>Ensure good lighting and clear visibility</li>
          <li>Capture the fabric from directly above</li>
          <li>Include the entire defect in frame</li>
          <li>Minimum image size: 224x224 pixels</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageUpload
