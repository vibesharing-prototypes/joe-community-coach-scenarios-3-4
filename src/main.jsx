import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CommunityCoachPrototype from './community/CommunityApp.jsx'

const PRODUCTS = [
  { id: 'boards',    label: 'Boards — Scenarios 1 & 2'    },
  { id: 'community', label: 'Community — Scenarios 3 & 4' },
]

function Root() {
  const [product, setProduct] = useState('boards')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Product switcher */}
      <div style={{ height: 36, background: '#0f172a', display: 'flex', alignItems: 'center',
        gap: 12, padding: '0 16px', flexShrink: 0, fontFamily: 'sans-serif' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#475569',
          letterSpacing: '0.6px', textTransform: 'uppercase' }}>
          Product
        </span>
        <div style={{ width: 1, height: 14, background: '#1e293b' }} />
        <div style={{ display: 'flex', gap: 4 }}>
          {PRODUCTS.map(({ id, label }) => {
            const active = product === id
            return (
              <button key={id} onClick={() => setProduct(id)} style={{
                fontSize: 11, fontWeight: active ? 700 : 400,
                padding: '3px 10px', borderRadius: 5, border: 'none',
                background: active ? '#ffffff' : 'transparent',
                color: active ? '#0f172a' : '#64748b', cursor: 'pointer',
              }}>
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Prototype */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {product === 'boards'    && <App />}
        {product === 'community' && <CommunityCoachPrototype />}
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
