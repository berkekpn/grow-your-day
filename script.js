const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const timeInput = document.getElementById("todo-time");
const list = document.getElementById("todo-list");

const treeTypeSelect = document.getElementById("tree-type");
const treeCircle = document.getElementById("tree-circle");
const treeIcon = document.getElementById("tree-icon");
const treeLabel = document.getElementById("tree-label");
const progressFill = document.getElementById("progress-fill");
const progressPercent = document.getElementById("progress-percent");
const progressText = document.getElementById("progress-text");

const vineLeft = document.querySelector(".vine-left");
const vineRight = document.querySelector(".vine-right");
const leafLayer = document.getElementById("leaf-layer");

const clockEl = document.getElementById("clock");

const weatherTempEl = document.getElementById("weather-temp");
const weatherDescEl = document.getElementById("weather-desc");
const weatherLocEl = document.getElementById("weather-location");
const weatherIconEl = document.getElementById("weather-icon");

const forestEl = document.getElementById("forest");

const categorySelect = document.getElementById("todo-category");
const categoryFilterSelect = document.getElementById("category-filter");

const summaryTotalEl = document.getElementById("summary-total");
const summaryCompletedEl = document.getElementById("summary-completed");
const summaryRateEl = document.getElementById("summary-rate");
const summaryStreakEl = document.getElementById("summary-streak");

/* SVG ikonlar – her ağaç tipi için */
const TREE_SVGS = {
  sakura: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="30" width="8" height="20" rx="3" fill="#92400e"/>
      <ellipse class="crown" cx="32" cy="26" rx="18" ry="14"/>
      <ellipse class="crown-shadow" cx="32" cy="28" rx="14" ry="10" opacity="0.7"/>
    </svg>
  `,
  oak: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="27" y="32" width="10" height="20" rx="3" fill="#78350f"/>
      <ellipse class="crown" cx="32" cy="26" rx="19" ry="15"/>
      <ellipse class="crown-shadow" cx="32" cy="28" rx="15" ry="11" opacity="0.8"/>
    </svg>
  `,
  plane: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="27" y="32" width="10" height="20" rx="3" fill="#854d0e"/>
      <ellipse class="crown" cx="32" cy="26" rx="20" ry="14"/>
      <ellipse class="crown-shadow" cx="32" cy="29" rx="16" ry="10" opacity="0.8"/>
    </svg>
  `,
  pine: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="29" y="34" width="6" height="16" rx="3" fill="#713f12"/>
      <polygon class="crown" points="32,10 16,40 48,40"/>
      <polygon class="crown-shadow" points="32,15 20,38 44,38" opacity="0.8"/>
    </svg>
  `,
  olive: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="32" width="8" height="20" rx="3" fill="#6b4f1d"/>
      <ellipse class="crown" cx="32" cy="24" rx="17" ry="13"/>
      <ellipse class="crown-shadow" cx="32" cy="27" rx="13" ry="9" opacity="0.85"/>
    </svg>
  `,
  maple: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="32" width="8" height="20" rx="3" fill="#7c2d12"/>
      <ellipse class="crown" cx="32" cy="24" rx="18" ry="13"/>
      <ellipse class="crown-shadow" cx="32" cy="27" rx="14" ry="10" opacity="0.85"/>
    </svg>
  `
};

/* Ağaç türleri – tema + büyüme yazıları */

const TREE_TYPES = {
  sakura: {
    themeClass: "theme-sakura",
    labels: [
      "Toprağa sakura tohumu ektin.",
      "Minik filizler kendini gösteriyor.",
      "Sakura fidanı boy atıyor.",
      "İlk çiçekler açmaya başladı.",
      "Dallar dolmaya başladı.",
      "Rüzgârla pembe yapraklar savruluyor.",
      "Tam çiçek açmış bir sakura ağacı! 🌸"
    ]
  },
  oak: {
    themeClass: "theme-oak",
    labels: [
      "Meşe tohumu yeni filizlendi.",
      "Toprağın üstünde minik bir yeşillik.",
      "Kalın bir meşe fidanı oluşuyor.",
      "Kökler güçleniyor, gövde kalınlaşıyor.",
      "Genç ama güçlü bir meşe.",
      "Dallar gölge yapmaya başladı.",
      "Kocaman, güçlü bir meşe ağacı! 💪"
    ]
  },
  plane: {
    themeClass: "theme-plane",
    labels: [
      "Çınar tohumu toprağa karıştı.",
      "Hafif bir filiz göründü.",
      "Çınar fidanı yukarı uzanıyor.",
      "Yapraklar kalınlaşmaya başladı.",
      "Genç bir çınar ağacı.",
      "Gölgeli bir çınar altı oldu bile.",
      "Heybetli bir çınar ağacı! 🌳"
    ]
  },
  pine: {
    themeClass: "theme-pine",
    labels: [
      "Ormana bir çam tohumu bıraktın.",
      "İnce bir çam filizi toprağı deldi.",
      "İğne yapraklar çoğalmaya başladı.",
      "Genç bir çam gökyüzüne uzanıyor.",
      "Çam ağacı rüzgârla salınıyor.",
      "Sert gövdeli, güçlü bir çam.",
      "Dağların efendisi gibi bir çam ağacı!"
    ]
  },
  olive: {
    themeClass: "theme-olive",
    labels: [
      "Toprağa zeytin çekirdeği gömdün.",
      "Ufak bir zeytin filizi belirdi.",
      "İnce dallar yapraklanmaya başladı.",
      "Genç bir zeytin ağacın var.",
      "Dallar meyve verecek hale geldi.",
      "Zeytinlerin olgunlaşmaya başladı.",
      "Bilge bir zeytin ağacı gibi duruyor."
    ]
  },
  maple: {
    themeClass: "theme-maple",
    labels: [
      "Toprağa akçaağaç tohumu serptin.",
      "İnce bir filiz rüzgârla oynuyor.",
      "Yapraklar yavaşça şekil almaya başladı.",
      "Genç bir akçaağaç gökyüzüne uzanıyor.",
      "Yapraklar renklenmeye başladı.",
      "Turuncu-kırmızı tonlarda bir güz ağacı.",
      "Sonbaharın simgesi bir akçaağaç! 🍁"
    ]
  }
};

// Her ağaç için ayrı görev board'u
const boards = {
  sakura: { tasks: [] },
  oak: { tasks: [] },
  plane: { tasks: [] },
  pine: { tasks: [] },
  olive: { tasks: [] },
  maple: { tasks: [] }
};

let currentTree = "sakura";
let currentCategoryFilter = "all";

let streak = 0;
let lastFullCompletionDate = null;

const STORAGE_KEY = "gyd_state_v1";

/* LOCAL STORAGE */

function saveState() {
  const payload = {
    currentTree,
    boards,
    streak,
    lastFullCompletionDate
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    // sessizce geç
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);

    if (data.currentTree && TREE_TYPES[data.currentTree]) {
      currentTree = data.currentTree;
    }

    if (data.boards) {
      for (const key of Object.keys(boards)) {
        if (data.boards[key] && Array.isArray(data.boards[key].tasks)) {
          boards[key].tasks = data.boards[key].tasks;
        }
      }
    }

    if (typeof data.streak === "number") {
      streak = data.streak;
    }
    if (data.lastFullCompletionDate) {
      lastFullCompletionDate = data.lastFullCompletionDate;
    }
  } catch (e) {
    // bozuksa boşver
  }
}

/* KATEGORİ LABEL */

function categoryLabel(id) {
  switch (id) {
    case "study":
      return "Ders";
    case "work":
      return "İş";
    case "health":
      return "Sağlık";
    case "personal":
      return "Kişisel";
    default:
      return "Genel";
  }
}

/* FORM SUBMIT */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  const time = timeInput.value;
  const category = categorySelect.value || "general";

  if (!text) return;

  const board = boards[currentTree];
  const task = {
    id: Date.now(),
    text,
    time,
    category,
    completed: false
  };

  board.tasks.push(task);
  renderTasks();
  updateTree();
});

/* FİLTRE DEĞİŞİMİ */

categoryFilterSelect.addEventListener("change", () => {
  currentCategoryFilter = categoryFilterSelect.value;
  renderTasks();
});

/* GÖREVLERİ ÇİZ */

function renderTasks() {
  list.innerHTML = "";

  const board = boards[currentTree];
  let tasks = board.tasks;

  if (currentCategoryFilter !== "all") {
    tasks = tasks.filter((t) => t.category === currentCategoryFilter);
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (task.completed) li.classList.add("is-completed");

    const timeBadge = document.createElement("span");
    timeBadge.className = "todo-time-badge";
    timeBadge.textContent = task.time ? task.time : "--:--";

    const main = document.createElement("div");
    main.className = "todo-main";

    const categoryBadge = document.createElement("span");
    categoryBadge.className =
      "todo-category-badge category-" + (task.category || "general");
    categoryBadge.textContent = categoryLabel(task.category);

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    span.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
      updateTree();
    });

    main.appendChild(categoryBadge);
    main.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Sil";

    delBtn.addEventListener("click", () => {
      board.tasks = board.tasks.filter((t) => t.id !== task.id);
      renderTasks();
      updateTree();
    });

    li.appendChild(timeBadge);
    li.appendChild(main);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

/* 7 seviye büyüme stage */

function getStageIndex(ratio) {
  if (ratio === 0) return 0;
  if (ratio <= 1 / 6) return 1;
  if (ratio <= 2 / 6) return 2;
  if (ratio <= 3 / 6) return 3;
  if (ratio <= 4 / 6) return 4;
  if (ratio <= 5 / 6) return 5;
  return 6;
}

/* STREAK HESABI */

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function checkAndUpdateStreak(total, completed) {
  if (total === 0 || completed !== total) {
    return;
  }
  const todayKey = getTodayKey();
  if (lastFullCompletionDate === todayKey) {
    return; // bugün zaten sayılmış
  }

  if (!lastFullCompletionDate) {
    streak = 1;
  } else {
    const prev = new Date(lastFullCompletionDate);
    const today = new Date(todayKey);
    const diffDays = Math.round(
      (today - prev) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 1) {
      streak = (streak || 0) + 1;
    } else {
      streak = 1;
    }
  }

  lastFullCompletionDate = todayKey;
}

/* ÖZET PANELİ GÜNCELLE */

function updateSummary() {
  let total = 0;
  let completed = 0;

  for (const key of Object.keys(boards)) {
    const tasks = boards[key].tasks;
    total += tasks.length;
    completed += tasks.filter((t) => t.completed).length;
  }

  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  summaryTotalEl.textContent = total;
  summaryCompletedEl.textContent = completed;
  summaryRateEl.textContent = `${rate}%`;
  summaryStreakEl.textContent = `${streak} gün`;

  checkAndUpdateStreak(total, completed);
  summaryStreakEl.textContent = `${streak} gün`;

  saveState();
}

/* AĞAÇ + PROGRESS GÜNCELLE */

function updateTree() {
  const board = boards[currentTree];
  const total = board.tasks.length;
  const completed = board.tasks.filter((t) => t.completed).length;
  const ratio = total === 0 ? 0 : completed / total;
  const percent = Math.round(ratio * 100);

  progressFill.style.width = `${percent}%`;
  progressPercent.textContent = `${percent}%`;

  const config = TREE_TYPES[currentTree];
  const stageIndex = getStageIndex(ratio);
  const label = config.labels[Math.min(stageIndex, config.labels.length - 1)];

  treeCircle.className = "tree-circle";
  treeCircle.classList.add(`stage-${stageIndex}`);

  treeIcon.className = "tree-icon";
  treeIcon.innerHTML = TREE_SVGS[currentTree];
  treeIcon.classList.add(`tree-icon--${currentTree}`);

  treeLabel.textContent = label;

  if (total === 0) {
    progressText.textContent = "Başlamak için en az bir görev ekle.";
  } else if (completed === 0) {
    progressText.textContent = "İlk görevi tamamla, tohum filizlensin.";
  } else if (completed < total) {
    progressText.textContent = `${completed}/${total} görev tamamlandı, devam!`;
  } else {
    progressText.textContent =
      "Tüm görevler tamamlandı, ağacın bugün çok mutlu! 🌟";
  }

  // Sarmaşıkları büyüt
  const vineHeight = `${Math.max(ratio * 80, total > 0 ? 10 : 0)}vh`;
  if (total === 0) {
    vineLeft.style.opacity = 0;
    vineRight.style.opacity = 0;
    vineLeft.style.height = "0";
    vineRight.style.height = "0";
  } else {
    vineLeft.style.opacity = 1;
    vineRight.style.opacity = 1;
    vineLeft.style.height = vineHeight;
    vineRight.style.height = vineHeight;
  }

  // Ormanı güncelle
  updateForest(ratio);

  // Özet paneli + streak + state
  updateSummary();
}

/* ORMAN OLUŞTURMA */

function updateForest(ratio) {
  const MAX_TREES = 20;
  const count = Math.round(ratio * MAX_TREES);

  forestEl.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.className = `forest-tree tree-icon tree-icon--${currentTree}`;
    div.innerHTML = TREE_SVGS[currentTree];
    forestEl.appendChild(div);
  }
}

/* TEMA / AĞAÇ DEĞİŞİMİ */

function updateTheme() {
  document.body.classList.remove(
    "theme-sakura",
    "theme-oak",
    "theme-plane",
    "theme-pine",
    "theme-olive",
    "theme-maple"
  );

  const config = TREE_TYPES[currentTree];
  document.body.classList.add(config.themeClass);

  treeTypeSelect.value = currentTree;

  renderTasks();
  updateTree();
}

treeTypeSelect.addEventListener("change", () => {
  currentTree = treeTypeSelect.value;
  updateTheme();
});

/* UÇAN YAPRAKLAR */

function createLeaves() {
  const leafCount = 18;
  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement("span");
    leaf.className = "leaf";

    const duration = 14 + Math.random() * 10;
    const delay = Math.random() * -duration;
    const left = Math.random() * 100;
    const scale = 0.6 + Math.random() * 0.7;

    leaf.style.left = `${left}%`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.animationDelay = `${delay}s`;
    leaf.style.transform = `scale(${scale})`;

    leafLayer.appendChild(leaf);
  }
}

/* GERÇEK ZAMANLI SAAT */

function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  clockEl.textContent = `${hh}:${mm}:${ss}`;
}

/* HAVA DURUMU – OpenWeatherMap */

const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE"; // buraya kendi key'ini yapıştır

function fetchWeatherByCoords(lat, lon) {
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "YOUR_API_KEY_HERE") {
    weatherLocEl.textContent = "API anahtarını ekle";
    weatherDescEl.textContent = "OpenWeatherMap key eklenmeli.";
    weatherIconEl.style.display = "none";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=tr&appid=${OPENWEATHER_API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        weatherLocEl.textContent = "Hava bilgisi alınamadı";
        weatherTempEl.textContent = "--°C";
        weatherDescEl.textContent = data.message || "—";
        weatherIconEl.style.display = "none";
        return;
      }

      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const city = data.name;
      const iconCode = data.weather[0].icon;

      weatherTempEl.textContent = `${temp}°C`;
      weatherDescEl.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
      weatherLocEl.textContent = city;

      weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIconEl.alt = desc;
      weatherIconEl.style.display = "block";
    })
    .catch(() => {
      weatherLocEl.textContent = "Hata";
      weatherTempEl.textContent = "--°C";
      weatherDescEl.textContent = "Hava durumu alınamadı.";
      weatherIconEl.style.display = "none";
    });
}

function initWeather() {
  if (!navigator.geolocation) {
    // Tarayıcı desteklemiyorsa direkt İstanbul'a düş
    weatherLocEl.textContent = "İstanbul (varsayılan)";
    fetchWeatherByCoords(41.01, 28.97);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    () => {
      // Konum reddedilirse fallback İstanbul
      weatherLocEl.textContent = "İstanbul (varsayılan)";
      fetchWeatherByCoords(41.01, 28.97);
    }
  );
}

/* INITIALIZE */

loadState();
createLeaves();
updateTheme();
updateClock();
setInterval(updateClock, 1000);
initWeather();
