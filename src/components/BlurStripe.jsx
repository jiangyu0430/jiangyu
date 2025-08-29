import React from 'react'
import '../BlurStripe.css'

export default function BlurStripe({ height = 160 }) {
  return (
    <div className="blur-stripe-container" style={{ height }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((layer) => (
        <div key={layer} className={`blur-layer layer-${layer}`} />
      ))}
    </div>
  )
}
