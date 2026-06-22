
// Persona Options
const PERSONAS = [
  { id: 'geek', name: 'Teknoloji Kaşifi', icon: '🖥️', desc: 'Kod, gadget ve IoT tutkunu.' },
  { id: 'artist', name: 'Sanatçı Ruhlu', icon: '🎨', desc: 'Renkler, müzik ve estetik aşığı.' },
  { id: 'retro', name: 'Retro Tutkunu', icon: '📻', desc: 'Analog, plak ve kaset sevdalısı.' },
  { id: 'homebody', name: 'Ev Kuşu', icon: '☕', desc: 'Battaniye, çay ve huzur arayan.' },
  { id: 'outdoor', name: 'Doğa Sever', icon: '🌲', desc: 'Kamp ateşi, orman ve macera tutkunu.' },
  { id: 'gourmet', name: 'Gurme Kaşif', icon: '🍳', desc: 'Mutfak zanaatları ve lezzet peşinde.' },
  { id: 'intellectual', name: 'Bilge / Okur', icon: '📚', desc: 'Kitap kokusu ve derin fikirler.' },
  { id: 'minimalist', name: 'Minimalist', icon: '📐', desc: 'Az ama öz yaşayan sade ruh.' }
];

// Budget Options (Map to range slider 0, 1, 2)
const BUDGETS = [
  { id: 'breadcrumbs', name: 'Ekmek Kırıntısı', icon: '🪙', label: 'Düşük Bütçe / El Emeği' },
  { id: 'coins', name: 'Altın Sikke', icon: '🪙🪙', label: 'Makul / Orta Seviye' },
  { id: 'chest', name: 'Hazine Sandığı', icon: '💎', label: 'Premium / Lüks Seviye' }
];

// Relationship Closeness (Map to range slider 0, 1, 2, 3)
const RELATIONSHIPS = [
  { id: 'casual_acq', name: 'Sıradan Tanıdık', desc: 'Fazla samimi olmayan güvenli hediyeler.' },
  { id: 'coworker', name: 'Ekip Arkadaşı', desc: 'Profesyonel ve işlevsel hediyeler.' },
  { id: 'friend', name: 'Yakın Dost', desc: 'Samimi ve esprili hediyeler.' },
  { id: 'partner', name: 'Hayat Arkadaşı', desc: 'Derin, anlamlı ve romantik hediyeler.' }
];

// Occasion Options
const OCCASIONS = [
  { id: 'birthday', name: 'Doğum Günü', icon: '🎂' },
  { id: 'celebration', name: 'Terfi / Başarı', icon: '🏆' },
  { id: 'anniversary', name: 'Yıldönümü', icon: '❤️' },
  { id: 'casual', name: 'Sıradan Gün', icon: '☀️' }
];

export default function DialPicker({ preferences, setPreferences, onSearch }) {
  
  const handlePersonaSelect = (id) => {
    setPreferences(prev => ({ ...prev, persona: id }));
  };

  const handleBudgetChange = (e) => {
    const val = parseInt(e.target.value);
    setPreferences(prev => ({ ...prev, budget: BUDGETS[val].id }));
  };

  const handleRelationshipChange = (e) => {
    const val = parseInt(e.target.value);
    setPreferences(prev => ({ ...prev, relationship: RELATIONSHIPS[val].id }));
  };

  const handleOccasionSelect = (id) => {
    setPreferences(prev => ({ ...prev, occasion: id }));
  };

  // Find index of current selection for range sliders
  const currentBudgetIdx = BUDGETS.findIndex(b => b.id === preferences.budget);
  const currentRelationshipIdx = RELATIONSHIPS.findIndex(r => r.id === preferences.relationship);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* 1. Recipient Character (Persona Grid) */}
      <div>
        <h2 style={{ fontSize: '1.2rem', textAlign: 'left', marginBottom: '0.2rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.3rem' }}>
          1. ADIM: HEDİYEYİ KİME ARIYORUZ?
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'left' }}>
          Karşındakinin karakteri aşağıdakilerden hangisine daha yakın?
        </p>
        <div className="persona-grid">
          {PERSONAS.map(p => (
            <div 
              key={p.id}
              className={`selector-card ${preferences.persona === p.id ? 'selected' : ''}`}
              onClick={() => handlePersonaSelect(p.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0.8rem 0.5rem',
                minHeight: '120px',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{p.icon}</span>
              <h3 style={{ fontSize: '0.85rem', margin: '0 0 0.2rem 0', fontFamily: 'var(--font-sans)', textTransform: 'none' }}>
                {p.name}
              </h3>
              <p style={{ fontSize: '0.65rem', margin: 0, opacity: 0.8, fontFamily: 'var(--font-mono)' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Closeness and Budget Dials in a Row */}
      <div className="dial-picker-grid">
        
        {/* Closeness Dial Slider */}
        <div className="zine-container" style={{ boxShadow: 'none', borderStyle: 'solid' }}>
          <h2 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0', textAlign: 'left' }}>
            2. ADIM: ARAMIZDAKİ BAĞ NE KADAR SIKI?
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', margin: '0 0 1.5rem 0', textAlign: 'left' }}>
            İlişkinizin samimiyet durumuna göre bir kadran ayarla:
          </p>
          
          <div className="dial-container">
            <div className="dial-slider-wrapper">
              <input 
                type="range" 
                min="0" 
                max="3" 
                value={currentRelationshipIdx} 
                onChange={handleRelationshipChange}
                className="retro-range"
              />
            </div>
            
            {/* Closeness Indicator Display */}
            <div style={{
              border: '2px solid var(--border-color)',
              padding: '0.5rem',
              backgroundColor: '#fff',
              width: '100%',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {RELATIONSHIPS[currentRelationshipIdx].name.toUpperCase()}
              <div style={{ fontSize: '0.7rem', fontWeight: 'normal', marginTop: '0.2rem', textTransform: 'none' }}>
                {RELATIONSHIPS[currentRelationshipIdx].desc}
              </div>
            </div>
          </div>
        </div>

        {/* Budget Dial Slider */}
        <div className="zine-container" style={{ boxShadow: 'none', borderStyle: 'solid' }}>
          <h2 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0', textAlign: 'left' }}>
            3. ADIM: CÜZDAN DURUMU NE ALEMDE?
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', margin: '0 0 1.5rem 0', textAlign: 'left' }}>
            Bu hediye için ne kadarlık bir bütçeyi gözden çıkardın?
          </p>
          
          <div className="dial-container">
            <div className="dial-slider-wrapper">
              <input 
                type="range" 
                min="0" 
                max="2" 
                value={currentBudgetIdx} 
                onChange={handleBudgetChange}
                className="retro-range"
              />
            </div>
            
            {/* Budget Indicator Display */}
            <div style={{
              border: '2px solid var(--border-color)',
              padding: '0.5rem',
              backgroundColor: '#fff',
              width: '100%',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {BUDGETS[currentBudgetIdx].name.toUpperCase()} {BUDGETS[currentBudgetIdx].icon}
              <div style={{ fontSize: '0.7rem', fontWeight: 'normal', marginTop: '0.2rem', textTransform: 'none' }}>
                {BUDGETS[currentBudgetIdx].label}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Occasion Select */}
      <div>
        <h2 style={{ fontSize: '1.2rem', textAlign: 'left', marginBottom: '0.2rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.3rem' }}>
          4. ADIM: DURUM NE? HANGİ SEBEPLE VERİYORSUN?
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'left' }}>
          Hangi özel (veya sıradan) gün için hediye bakıyoruz?
        </p>
        <div className="occasion-grid">
          {OCCASIONS.map(o => (
            <div 
              key={o.id}
              className={`selector-card ${preferences.occasion === o.id ? 'selected' : ''}`}
              onClick={() => handleOccasionSelect(o.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.5rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{o.icon}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{o.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compile Button */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button 
          onClick={onSearch}
          className="retro-btn success"
          style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}
        >
          📰 ARŞİVİ KARIŞTIR VE BANA HEDİYE BUL
        </button>
      </div>

    </div>
  );
}
