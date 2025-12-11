# Grow Your Day 🌱

**Grow Your Day**, günlük görevlerini oyunlaştıran, tamamen HTML/CSS/JavaScript ile geliştirilmiş bir to-do / habit tracker web uygulamasıdır.  
Görevleri tamamladıkça seçtiğin ağaç büyür, sarmaşıklar uzar ve sayfanın alt kısmında o ağaçtan oluşan bir orman şekillenmeye başlar.

## ✨ Features

- 🌳 **Tree Growth System**  
  - Farklı ağaç türleri (Sakura, Meşe, Çınar, Çam, Zeytin, Akçaağaç)  
  - Her ağaç için ayrı tema rengi ve stilize SVG ikon  
  - Görev tamamlama oranına göre 7 farklı büyüme aşaması (tohumdan tam ağaca)

- 🌿 **Animated UI**
  - Arka planda nefes alan (pulse) gradient
  - Ekranda süzülen yaprak animasyonları
  - Görevler tamamlandıkça büyüyen sarmaşıklar
  - Görev ilerlemesine göre aşağıda giderek dolan “orman” alanı

- ✅ **Task Management**
  - Saat seçerek görev ekleme (örn: 09:00 Kahvaltı, 13:00 Ödev)
  - Göreve tıklayarak tamamlandı / tamamlanmadı olarak işaretleme
  - Her ağaç türü için ayrı görev listesi ve ilerleme durumu
  - Görev silme

- ⏱ **Live Clock**
  - Uygulamanın üst kısmında gerçek zamanlı çalışan dijital saat

- 🌤 **Weather Widget (OpenWeather)**
  - Tarayıcıdan konum izni alırsa o konumun anlık hava durumu
  - Konum reddedilirse otomatik **İstanbul** için hava durumu gösterir
  - Sıcaklık, durum açıklaması ve OpenWeather ikonları

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript  
- **UI / Styling:** Custom CSS (no framework)  
- **API:** [OpenWeatherMap](https://openweathermap.org/) Current Weather API  

---

## 🚀 Live Demo

> https://berkekpn.github.io/grow-your-day/

---

## 📦 Project Structure

```text
.
├── index.html    # Ana sayfa, layout ve bileşenler
├── style.css     # Tema, animasyonlar, tree & forest stilleri
└── script.js     # Todo mantığı, growth system, saat ve hava durumu
