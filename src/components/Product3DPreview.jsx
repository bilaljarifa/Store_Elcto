import { useState, useRef, useEffect } from 'react'
import './Product3DPreview.css'

function Product3DPreview({ product }) {
  const [is3DMode, setIs3DMode] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleMouseDown = (e) => {
    if (!is3DMode) return
    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !is3DMode) return
    
    const deltaX = e.clientX - lastMousePos.x
    const deltaY = e.clientY - lastMousePos.y
    
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }))
    
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, lastMousePos, is3DMode])

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div className="product-3d-preview">
      <div className="preview-3d-controls">
        <button 
          className={`preview-3d-toggle-btn ${is3DMode ? 'active' : ''}`}
          onClick={() => {
            setIs3DMode(!is3DMode)
            if (!is3DMode) resetRotation()
          }}
        >
          {is3DMode ? '🔄 Vue 2D' : '🎮 Vue 3D'}
        </button>
        {is3DMode && (
          <button className="reset-btn" onClick={resetRotation}>
            Réinitialiser
          </button>
        )}
      </div>
      
      <div 
        ref={containerRef}
        className={`preview-3d-container ${is3DMode ? 'active' : ''}`}
        onMouseDown={handleMouseDown}
        style={{
          transform: is3DMode 
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : 'none'
        }}
      >
        <div className="preview-3d-product">
          <img 
            src={product.image} 
            alt={product.name}
            className="preview-3d-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Product'
            }}
          />
          {is3DMode && (
            <>
              <div className="preview-3d-shadow"></div>
              <div className="preview-3d-highlight"></div>
            </>
          )}
        </div>
      </div>
      
      {is3DMode && (
        <p className="preview-3d-hint">💡 Faites glisser pour faire pivoter le produit</p>
      )}
    </div>
  )
}

export default Product3DPreview

