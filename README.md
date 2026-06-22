# 📰 Hediye Gazetesi | The Gift Chronicle

[TR] Klişe hediyelere ve yapay zeka jeneriği (*AI slop*) tasarımlara karşı direnen, tamamen yerel kurallarla çalışan, fiziksel hisli ve esprili hediye tavsiye motoru.

[EN] A curated retro-zine style gift advice engine built to resist cookie-cutter layouts. Runs 100% offline with tactile mechanical controls and a witty conversational voice.

---

## 🇹🇷 Türkçe Açıklama

Hediye Gazetesi, internetteki birbirinin kopyası hediye sitelerinden ve ruhsuz "yapay zeka jeneriği" tasarımlardan sıkılanlar için tasarlanmış bağımsız bir rehberdir. Kullanıcı arayüzü eski basılı gazete kupürü ve zine (bağımsız mini dergi) kültüründen ilham almıştır.

### Öne Çıkan Özellikler:
- **%100 Samimi & İnsani Dil:** Robot elinden çıkmış formal metinler yerine, tamamen günlük hayattan, esprili ve dürüst editör yorumları.
- **Mekanik Kadran Kontrolleri:** Bütçenizi ve alıcıyla olan samimiyet derecenizi eski tip kadranları ve çarkları döndürerek seçin.
- **Gazete İlanı Kart Destesi:** Size sunulan hediye önerilerini basılı ilan kartları şeklinde inceleyin. İlanı geçmek için kartı tutup sağa/sola fırlatmanız (swipe) yeterlidir.
- **Panoya Kopyalama ve Paylaşım:** Beğendiğiniz hediyelerin analiz raporunu tek tıkla panoya kopyalayıp paylaşabilirsiniz.
- **Güvenli & Çevrimdışı (Offline-First):** Herhangi bir veritabanı veya API anahtarı gerektirmeden, 100% istemci tarafında (client-side) anında çalışır.

### Kurulum ve Çalıştırma:
Projeyi yerel bilgisayarınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirici sunucusunu başlatın
npm run dev

# Üretim çıktısını derleyin (dist klasöründe oluşur)
npm run build
```

---

## 🇺🇸 English Description

The Gift Chronicle is an independent recommendation zine designed for those who are tired of identical gift list websites and soulless "AI slop" designs. The visual interface takes inspiration from classic print newspapers and vintage community brochures.

### Key Features:
- **100% Human Voice:** Replaces generic bot replies with humorous, conversational, and honest editor analysis reports.
- **Mechanical Dial Controls:** Adjust your budget constraints and relationship closeness using physical retro dial sliders.
- **Classified Ads Deck:** Explore gift options formatted as vintage newspaper ads. Swipe or throw the card away to discard, or read the detailed report to keep it.
- **HTTPS-Safe Clipboard Sharing:** Copy detailed gift logs and recipes to the clipboard with one click (includes robust HTTP/HTTPS safety fail-safes).
- **Fast & Fully Offline:** Requires no backend databases or API keys. Runs instantly in the client browser.

### Installation and Usage:
To launch the project locally:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Generate production assets (inside the dist folder)
npm run build
```

---

## 🛠️ Teknolojiler | Tech Stack
- **Framework:** React 19 + Vite 8
- **Stil / Styling:** Vanilla CSS (El yapımı / Custom CSS Variables & Flexbox/Grid)
- **Paketleme / Build:** ES6 Modules & Oxc Compiler
