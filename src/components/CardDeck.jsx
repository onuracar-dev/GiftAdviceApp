import { useState, useRef, useEffect } from 'react';

export default function CardDeck({ cards, onSelectCard, onReset }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, isDragging: false });
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0, opacity: 1, isSwiped: false });
  const cardRef = useRef(null);

  const activeCard = cards[currentIndex];

  // Reset indices when new search cards are loaded
  useEffect(() => {
    setCurrentIndex(0);
    setSwipeOffset({ x: 0, y: 0, opacity: 1, isSwiped: false });
  }, [cards]);

  const handleStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDrag({
      startX: clientX,
      startY: clientY,
      x: 0,
      y: 0,
      isDragging: true
    });
  };

  const handleMove = (e) => {
    if (!drag.isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - drag.startX;
    const deltaY = clientY - drag.startY;
    
    setDrag(prev => ({
      ...prev,
      x: deltaX,
      y: deltaY
    }));
  };

  const handleEnd = () => {
    if (!drag.isDragging) return;
    setDrag(prev => ({ ...prev, isDragging: false }));

    // Threshold for swiping away (120px)
    if (Math.abs(drag.x) > 120) {
      triggerSwipe(drag.x > 0 ? 'right' : 'left');
    } else {
      // Snap back
      setDrag(prev => ({ ...prev, x: 0, y: 0 }));
    }
  };

  const triggerSwipe = (direction) => {
    const outX = direction === 'right' ? 400 : -400;
    
    setSwipeOffset({
      x: outX,
      y: drag.y,
      opacity: 0,
      isSwiped: true
    });

    setTimeout(() => {
      // Move to next card
      setCurrentIndex(prev => prev + 1);
      // Reset drag/swipe states
      setSwipeOffset({ x: 0, y: 0, opacity: 1, isSwiped: false });
      setDrag({ x: 0, y: 0, isDragging: false });
    }, 250);
  };

  const handleNext = () => {
    triggerSwipe('right');
  };

  // If no cards matched or we reached the end of the deck
  if (!activeCard || currentIndex >= cards.length) {
    return (
      <div className="zine-container" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div className="stamp" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
          DESTE BİTTİ
        </div>
        <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>
          BAŞKA HEDİYE KALMADI!
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', margin: '1rem 0 2rem 0' }}>
          Arşivdeki tüm ilanlara baktın. Kadranları yeniden çevirip farklı kriterler denemeye ne dersin?
        </p>
        <button onClick={onReset} className="retro-btn info">
          🔄 ÇARKLARI YENİDEN ÇEVİR
        </button>
      </div>
    );
  }

  // Calculate drag styles
  const rotate = drag.isDragging ? (drag.x / 15) : 0;
  const cardStyle = {
    transform: drag.isDragging 
      ? `translate(${drag.x}px, ${drag.y}px) rotate(${rotate}deg)`
      : swipeOffset.isSwiped 
        ? `translate(${swipeOffset.x}px, ${swipeOffset.y}px) rotate(${swipeOffset.x / 15}deg)`
        : 'translate(0px, 0px) rotate(0deg)',
    opacity: swipeOffset.isSwiped ? swipeOffset.opacity : 1,
    zIndex: 10
  };

  // Stack preview styling
  const remainingCardsCount = cards.length - currentIndex;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Search Specs Bar */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        border: '2px solid var(--border-color)',
        padding: '0.4rem 0.8rem',
        backgroundColor: '#fff',
        marginBottom: '1rem',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px'
      }}>
        Arşivden Çıkanlar • {remainingCardsCount} Seçenek Kaldı
      </div>

      {/* Stack Deck Area */}
      <div className="deck-container">
        
        {/* Underlay card 1 (decorational stack element) */}
        {remainingCardsCount > 1 && (
          <div 
            className="gift-card" 
            style={{ 
              transform: 'translate(4px, 4px) rotate(1.5deg)', 
              zIndex: 5,
              opacity: 0.9,
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Underlay card 2 (decorational stack element) */}
        {remainingCardsCount > 2 && (
          <div 
            className="gift-card" 
            style={{ 
              transform: 'translate(-4px, 8px) rotate(-2deg)', 
              zIndex: 3,
              opacity: 0.7,
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Main Active Card */}
        <div 
          ref={cardRef}
          className="gift-card"
          style={cardStyle}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          {/* Card Top Branding */}
          <div className="gift-card-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
              <span>ÖZEL İLAN SERİSİ</span>
              <span style={{ color: 'var(--accent-red)' }}>İLAN {currentIndex + 1}</span>
            </div>
            <h3 className="gift-card-title" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              {activeCard.title}
            </h3>
          </div>

          {/* Card Body */}
          <div className="gift-card-body">
            <p style={{ margin: '1rem 0' }}>{activeCard.description}</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {activeCard.tags.budgets.map(b => (
                <span key={b} className="retro-badge green">
                  {b === 'breadcrumbs' ? 'BÜTÇE: DÜŞÜK' : b === 'coins' ? 'BÜTÇE: ORTA' : 'BÜTÇE: LÜKS'}
                </span>
              ))}
              <span className="retro-badge red">
                UYUM: {activeCard.score * 5}%
              </span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="gift-card-footer">
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontStyle: 'italic' }}>
              * İlanı fırlatmak için sürükle
            </span>
            <div className="stamp" style={{ fontSize: '0.8rem', borderStyle: 'solid', borderWidth: '2px', padding: '0.1rem 0.4rem', animation: 'none' }}>
              KÜRASYON
            </div>
          </div>

        </div>

      </div>

      {/* Button controls */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', width: '100%', maxWidth: '400px' }}>
        <button 
          onClick={handleNext}
          className="retro-btn danger" 
          style={{ flex: 1, justifyContent: 'center' }}
        >
          🪓 BUNU GEÇ
        </button>
        <button 
          onClick={() => onSelectCard(activeCard)}
          className="retro-btn success" 
          style={{ flex: 1.2, justifyContent: 'center' }}
        >
          🔎 NEDEN BU?
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={onReset} className="retro-btn info" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          ↩ KADRANLARA GERİ DÖN
        </button>
      </div>

    </div>
  );
}
