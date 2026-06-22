import { useState } from 'react';

export default function GiftDetailModal({ gift, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!gift) return null;

  const handleCopy = () => {
    const textToCopy = `
=== HEDİYE GAZETESİ RAPORU ===
Hediye: ${gift.title}
Açıklama: ${gift.description}
${gift.report}
${gift.action ? `Öneri/Tarif: ${gift.action}` : ''}
==============================
    `.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        // Silent fallback in case user blocks clipboard permission
        alert("Metin kopyalanamadı. Lütfen buradan seçip kopyalayın:\n\n" + textToCopy);
      });
    } else {
      // Safe fallback for HTTP (Non-HTTPS) or legacy mobile browsers
      alert("Kopyalamak için metni seçin:\n\n" + textToCopy);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ border: '3px solid var(--border-color)' }}>
        
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>X</button>
        {/* Modal Header */}
        <div style={{ 
          borderBottom: '4px double var(--border-color)', 
          paddingBottom: '0.8rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.75rem', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'var(--accent-red)'
          }}>
            • BİZİM ELEMANLARIN RAPORU •
          </span>
          <h2 style={{ 
            margin: '0.5rem 0 0 0', 
            fontSize: '1.6rem',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.2
          }}>
            {gift.title}
          </h2>
        </div>

        {/* Content Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Metadata Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span className="retro-badge red">İLAN KODU: #{gift.id.toUpperCase()}</span>
            <span className="retro-badge blue">KAFADARLIK: {gift.score * 5}%</span>
          </div>

          {/* Section: Description */}
          <div style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '1rem',
            lineHeight: 1.5,
            borderLeft: '4px solid var(--border-color)',
            paddingLeft: '1rem',
            margin: '0.5rem 0'
          }}>
            <strong>Olay şu:</strong> {gift.description}
          </div>

          {/* Section: Editor's Report */}
          <div className="zine-container" style={{ 
            backgroundColor: '#fff', 
            boxShadow: 'none', 
            borderStyle: 'solid', 
            borderWidth: '1.5px',
            padding: '1.2rem'
          }}>
            <h4 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '0.9rem', 
              margin: '0 0 0.5rem 0',
              color: 'var(--accent-red)'
            }}>
              ★ ARAMIZDA KALSIN (NEDEN SEÇTİK?)
            </h4>
            <p style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.9rem', 
              margin: 0,
              textAlign: 'justify',
              lineHeight: 1.6
            }}>
              {gift.report}
            </p>
          </div>

          {/* Section: Action Advice */}
          {gift.action && (
            <div style={{
              backgroundColor: '#faf6ee',
              border: '2px dashed var(--border-color)',
              padding: '1rem',
              fontFamily: 'var(--font-sans)'
            }}>
              <h4 style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '0.9rem', 
                margin: '0 0 0.5rem 0'
              }}>
                🛠️ PEKİ NASIL HALLEDERİZ?
              </h4>
              <p style={{ fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                {gift.action}
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div style={{ 
          marginTop: '2rem', 
          borderTop: '2px solid var(--border-color)', 
          paddingTop: '1.2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div className="stamp" style={{ fontSize: '0.9rem', borderWidth: '2px', padding: '0.2rem 0.6rem', animation: 'none' }}>
            HAZIR RAPOR
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button 
              onClick={handleCopy}
              className="retro-btn success" 
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              {copied ? '📋 ALINDI!' : '🔗 RAPOR METNİNİ AL'}
            </button>
            <button 
              onClick={onClose}
              className="retro-btn info" 
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              KAPAT
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
