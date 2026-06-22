
export default function Header() {
  // Format current date in Turkish style
  const getFormattedDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = new Date().toLocaleDateString('tr-TR', options);
    return dateStr.toUpperCase();
  };

  return (
    <header style={{ marginBottom: '2rem' }}>
      {/* Slogans & Info */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '0.75rem', 
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        paddingBottom: '0.25rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <span>★ KLIŞE HEDİYELERE DİRENEN BÜLTEN ★</span>
        <span className="hide-on-mobile">
          Saçma hediye fikirleri buraya giremez!
        </span>
        <span>2026 Baskısı</span>
      </div>

      {/* Main Newspaper Nameplate */}
      <div style={{
        textAlign: 'center',
        padding: '1rem 0',
        borderBottom: '4px double var(--border-color)',
        marginTop: '0.5rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
          margin: 0,
          lineHeight: 0.9,
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.03em'
        }}>
          HEDİYE GAZETESİ
        </h1>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          margin: '0.5rem 0 0 0',
          fontStyle: 'italic',
          letterSpacing: '0.02em'
        }}>
          &ldquo;İnternetteki o birbirinin aynı jenerik hediye sitelerine inat, el emeği ve kafa yorulmuş şeyler.&rdquo;
        </p>
      </div>

      {/* Date, Issue, Price Bar */}
      <div className="subheadline">
        <span>SAYI: AKLA ESİNCE</span>
        <span style={{ fontWeight: 'bold' }}>{getFormattedDate()}</span>
        <span>FİYATI: Bİ' ÇAY ISMARLARSIN</span>
      </div>
    </header>
  );
}
