import { useState } from 'react';
import Header from './components/Header';
import DialPicker from './components/DialPicker';
import CardDeck from './components/CardDeck';
import GiftDetailModal from './components/GiftDetailModal';
import { getRecommendations } from './utils/recommender';

export default function App() {
  const [screen, setScreen] = useState('intro'); // 'intro' | 'search' | 'results'
  const [preferences, setPreferences] = useState({
    persona: 'geek',
    budget: 'coins',
    relationship: 'friend',
    occasion: 'birthday'
  });
  const [results, setResults] = useState([]);
  const [selectedGift, setSelectedGift] = useState(null);

  const handleSearch = () => {
    const recommendations = getRecommendations(preferences);
    setResults(recommendations);
    setScreen('results');
  };

  const handleReset = () => {
    setScreen('search');
    setResults([]);
  };

  return (
    <div className="zine-container">
      {/* Newspaper Header */}
      <Header />

      {/* Screen 1: Intro / Landing Page */}
      {screen === 'intro' && (
        <div>
          {/* Main Headline */}
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.4rem, 6vw, 2.5rem)', 
              lineHeight: 1.1,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em',
              marginBottom: '1rem'
            }}>
              KLİŞE HEDİYELERDEN KURTULMA ZAMANI!
            </h2>
            <p className="typewriter" style={{ 
              color: 'var(--accent-red)', 
              fontSize: '1rem',
              fontWeight: 'bold',
              margin: '0 0 1.5rem 0'
            }}>
              &ldquo;Herkes birbirine jenerik kupa bardak alıp geçiyor, sen gerçekten kafa yorulmuş bir şey hediye et.&rdquo;
            </p>
          </div>

          {/* Newspaper Column Grid */}
          <div className="news-grid" style={{ marginBottom: '2.5rem' }}>
            
            {/* Column A (Left) */}
            <div className="news-column left-border" style={{ textAlign: 'justify' }}>
              <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>
                BU GAZETE NEDİR, NE İŞE YARAR?
              </h3>
              <p style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
                İnternetteki o birbirinin kopyası jenerik hediye sitelerinden sıkıldık. Hepsi sanki robot elinden çıkmış gibi aynı şeyleri (yok kupa bardak, yok hediye kartı) önerip duruyor. Biz buna inat buradayız. Sana saçma sapan plastik şeyler aldırmaya değil, gerçekten akılda kalıcı fikirler vermeye çalışıyoruz.
              </p>
              <p style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
                Buradaki her hediye seçeneği; hediye alacağın kişinin karakterine, bütçene ve aranızdaki samimiyete göre el emeği ve sıra dışı fikirleri eşleştiren yerel, zeki bir çark algoritmasıyla hazırlandı.
              </p>
            </div>

            {/* Column B (Right) */}
            <div className="news-column" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>
                Bİ' KÖŞE YAZISI
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '1rem' }}>
                &ldquo;Üzerine düşünülmüş ufacık bir şey, en pahalı hediyeyi bile ezer geçer. Karşındakine 'seni gerçekten tanıyorum ve önemsiyorum' dedirtmek en büyük armağandır.&rdquo;
                <div style={{ textAlign: 'right', marginTop: '0.3rem', fontWeight: 'bold', fontStyle: 'normal' }}>
                  — Editörden
                </div>
              </div>
              
              <div className="stamp" style={{ fontSize: '0.8rem', width: '100%', textAlign: 'center', padding: '0.3rem' }}>
                %100 SAMİMİ
              </div>
            </div>

          </div>

          <div className="torn-edge"></div>

          {/* Call to Action */}
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <button 
              onClick={() => setScreen('search')}
              className="retro-btn success"
              style={{ fontSize: '1.25rem', padding: '1rem 2.5rem' }}
            >
              🚀 BAŞLAYALIM (ÇARKLARI DÖNDÜR)
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Search Config Dashboard */}
      {screen === 'search' && (
        <DialPicker 
          preferences={preferences}
          setPreferences={setPreferences}
          onSearch={handleSearch}
        />
      )}

      {/* Screen 3: Search Results Deck */}
      {screen === 'results' && (
        <CardDeck 
          cards={results}
          onSelectCard={(gift) => setSelectedGift(gift)}
          onReset={handleReset}
        />
      )}

      {/* Popups & Modals */}
      {selectedGift && (
        <GiftDetailModal 
          gift={selectedGift}
          onClose={() => setSelectedGift(null)}
        />
      )}

      {/* Footer Branding */}
      <footer style={{ 
        marginTop: '3rem', 
        borderTop: '2px solid var(--border-color)', 
        paddingTop: '1rem',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        textAlign: 'center',
        opacity: 0.8
      }}>
        © 2026 Hediye Gazetesi • Klişe hediyeler buraya giremez.
      </footer>
    </div>
  );
}
