/**
 * МайстерБокс 24/7 — Головний контролер додатку прокату інструментів (Виправлена версія)
 */

// --- 1. КАТАЛОГ ОБЛАДНАННЯ ТА СТАН ДОДАТКУ ---
const CATALOG = [
  {
    id: "tool_1",
    boxId: "02",
    title: "Перфоратор Bosch GBH 2-28 F",
    category: "electro",
    dayPrice: 280,
    deposit: 3000,
    power: "880 Вт / 3.2 Дж",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80",
    badge: "Популярний"
  },
  {
    id: "tool_2",
    boxId: "05",
    title: "Лазерний рівень 3D Huepar 903CG",
    category: "laser",
    dayPrice: 320,
    deposit: 3500,
    power: "12 ліній 360° / Зелений",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    badge: "Висока точність"
  },
  {
    id: "tool_3",
    boxId: "03",
    title: "Мийка Kärcher K5 Compact",
    category: "clean",
    dayPrice: 450,
    deposit: 5000,
    power: "145 бар / 500 л/год",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
    badge: "145 Бар"
  },
  {
    id: "tool_4",
    boxId: "08",
    title: "Болгарка DeWalt DWE4257",
    category: "electro",
    dayPrice: 220,
    deposit: 2500,
    power: "1500 Вт / Регулювання обертів",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=600&q=80",
    badge: "125 мм"
  },
  {
    id: "tool_5",
    boxId: "04",
    title: "Будівельний пилосос Metabo ASA 25",
    category: "clean",
    dayPrice: 350,
    deposit: 4000,
    power: "1250 Вт / Бак 25 л",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80",
    badge: "L-клас"
  },
  {
    id: "tool_6",
    boxId: "07",
    title: "Акумуляторний шурупокрут Makita DDF485",
    category: "electro",
    dayPrice: 240,
    deposit: 2800,
    power: "18V LXT / 50 Нм / 2 АКБ",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80",
    badge: "Безщітковий"
  }
];

// Глобальний стан
let state = {
  user: null,
  cart: {},
  orders: [],
  activeCategory: "all",
  activeSimLocker: null,
  activeReturnOrder: null
};

// Безпечний виклик Lucide Icons
function safeLucide() {
  try {
    if (typeof lucide !== "undefined" && lucide && typeof lucide.createIcons === "function") {
      lucide.createIcons();
    }
  } catch (e) {
    console.warn("Lucide ще не готовий:", e);
  }
}

// Завантаження та валідація збереженого стану
function loadState() {
  try {
    const savedUser = localStorage.getItem("mb_user");
    const savedCart = localStorage.getItem("mb_cart");
    const savedOrders = localStorage.getItem("mb_orders");

    if (savedUser) state.user = JSON.parse(savedUser);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart && typeof parsedCart === "object" && !Array.isArray(parsedCart)) {
        // Очищення кошика від застарілих ID з минулих версій
        state.cart = {};
        Object.keys(parsedCart).forEach(id => {
          if (CATALOG.some(tool => tool.id === id)) {
            state.cart[id] = parsedCart[id];
          }
        });
      }
    }
    if (savedOrders) state.orders = JSON.parse(savedOrders) || [];
  } catch (e) {
    console.error("Помилка читання localStorage, скидаємо кеш:", e);
    state.cart = {};
    state.orders = [];
  }
}

function saveState() {
  try {
    localStorage.setItem("mb_user", JSON.stringify(state.user));
    localStorage.setItem("mb_cart", JSON.stringify(state.cart));
    localStorage.setItem("mb_orders", JSON.stringify(state.orders));
  } catch (e) {
    console.error("Помилка запису в localStorage:", e);
  }
}

// --- 2. ДОПОМІЖНІ ФУНКЦІЇ ---
function formatMoney(amount) {
  return (amount || 0).toLocaleString("uk-UA") + " грн";
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-animate pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold border ${
    type === "success" 
      ? "bg-slate-900 border-emerald-500/50 text-emerald-400" 
      : type === "error" 
      ? "bg-slate-900 border-rose-500/50 text-rose-400" 
      : "bg-slate-900 border-amber-500/50 text-amber-300"
  }`;
  
  const icon = type === "success" ? "check-circle" : type === "error" ? "alert-circle" : "info";
  toast.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i><span>${message}</span>`;
  container.appendChild(toast);
  safeLucide();

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function playRelayClick() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.warn("Аудіо недоступне:", e);
  }
}

// --- 3. АВТОРИЗАЦІЯ ТА ПРОФІЛЬ ---
function updateAuthUI() {
  const profileContainer = document.getElementById("userHeaderProfile");
  const guestBanner = document.getElementById("guestTopBanner");
  if (!profileContainer) return;

  if (state.user && state.user.name) {
    if (guestBanner) guestBanner.classList.add("hidden");
    profileContainer.innerHTML = `
      <div class="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-xl">
        <div class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
          ${state.user.name[0]}
        </div>
        <div class="text-left hidden sm:block">
          <p class="text-xs font-bold text-white leading-none">${state.user.name}</p>
          <p class="text-[10px] text-slate-400 font-mono leading-none mt-1">${state.user.phone}</p>
        </div>
        <button onclick="window.logout()" title="Вийти" class="ml-1 text-slate-400 hover:text-rose-400 transition p-1">
          <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
  } else {
    if (guestBanner) guestBanner.classList.remove("hidden");
    profileContainer.innerHTML = `
      <button onclick="window.openAuthModal()" class="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-3.5 py-2 rounded-xl transition">
        <i data-lucide="user" class="w-4 h-4 text-amber-500"></i>
        <span>Вхід</span>
      </button>
    `;
  }
  safeLucide();
}

window.openAuthModal = () => {
  const modal = document.getElementById("authModal");
  if (modal) modal.classList.remove("hidden");
};
window.closeAuthModal = () => {
  const modal = document.getElementById("authModal");
  if (modal) modal.classList.add("hidden");
};

window.loginDemoUser = () => {
  state.user = { name: "Олександр Коваль", phone: "+380671112233" };
  saveState();
  updateAuthUI();
  window.closeAuthModal();
  showToast("Успішний вхід: Олександр Коваль", "success");
};

window.handlePhoneSubmit = (e) => {
  e.preventDefault();
  const phone = document.getElementById("userPhoneInput").value.trim();
  const name = document.getElementById("userNameInput").value.trim();
  if (!phone || !name) return;

  document.getElementById("authPhoneForm").classList.add("hidden");
  document.getElementById("authSmsStep").classList.remove("hidden");
  showToast("SMS-код надіслано на номер +380" + phone, "info");
};

window.verifyCode = () => {
  const code = document.getElementById("smsCodeInput").value.trim();
  if (code === "5821" || code.length === 4) {
    const name = document.getElementById("userNameInput").value.trim() || "Клієнт";
    const phone = "+380" + document.getElementById("userPhoneInput").value.trim();
    state.user = { name, phone };
    saveState();
    updateAuthUI();
    window.closeAuthModal();
    showToast("Реєстрація успішна! Вітаємо, " + name, "success");
  } else {
    showToast("Невірний код SMS. Спробуйте 5821", "error");
  }
};

window.logout = () => {
  state.user = null;
  saveState();
  updateAuthUI();
  showToast("Ви вийшли з аккаунту", "info");
};

// --- 4. РЕНДЕРИНГ КАТАЛОГУ ---
window.filterCategory = (cat) => {
  state.activeCategory = cat;
  document.querySelectorAll(".cat-btn").forEach(b => {
    b.classList.toggle("active-cat", b.getAttribute("data-cat") === cat);
  });
  renderCatalog();
};

function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;

  const filtered = state.activeCategory === "all" 
    ? CATALOG 
    : CATALOG.filter(t => t.category === state.activeCategory);

  grid.innerHTML = filtered.map(tool => {
    const inCart = !!state.cart[tool.id];
    return `
      <div class="bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 rounded-3xl p-5 flex flex-col justify-between transition group shadow-lg">
        <div>
          <div class="relative h-44 rounded-2xl overflow-hidden mb-4 bg-slate-900 border border-slate-800">
            <img src="${tool.image}" alt="${tool.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <span class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2.5 py-1 rounded-lg">
              ${tool.badge}
            </span>
            <span class="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
              <i data-lucide="package" class="w-3 h-3"></i> Комірка #${tool.boxId}
            </span>
          </div>

          <h3 class="font-bold text-base text-white group-hover:text-amber-400 transition leading-snug">${tool.title}</h3>
          <p class="text-xs text-slate-400 mt-1 font-mono">${tool.power}</p>

          <div class="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
            <div>
              <p class="text-[11px] text-slate-400">Прокат за добу:</p>
              <p class="text-base font-extrabold text-white font-mono">${tool.dayPrice} грн</p>
            </div>
            <div class="text-right">
              <p class="text-[11px] text-amber-400/90 flex items-center justify-end gap-1">
                <i data-lucide="lock" class="w-3 h-3"></i> Застава (холд):
              </p>
              <p class="text-xs font-bold text-amber-400 font-mono">${formatMoney(tool.deposit)}</p>
            </div>
          </div>
        </div>

        <button onclick="window.toggleCartItem('${tool.id}')" class="mt-4 w-full py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
          inCart 
            ? "bg-slate-700 text-amber-400 hover:bg-slate-600" 
            : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/10"
        }">
          <i data-lucide="${inCart ? "check" : "plus"}" class="w-4 h-4"></i>
          <span>${inCart ? "У кошику (Видалити)" : "Додати в кошик"}</span>
        </button>
      </div>
    `;
  }).join("");

  safeLucide();
  updateCartBadge();
}

window.toggleCartItem = (toolId) => {
  if (state.cart[toolId]) {
    delete state.cart[toolId];
    showToast("Видалено з кошика", "info");
  } else {
    state.cart[toolId] = { days: 1 };
    showToast("Додано в кошик!", "success");
  }
  saveState();
  renderCatalog();
  if (!document.getElementById("cartModal").classList.contains("hidden")) {
    renderCartModal();
  }
};

window.changeCartDays = (toolId, delta) => {
  if (!state.cart[toolId]) return;
  const current = state.cart[toolId].days || 1;
  const next = current + delta;
  if (next >= 1 && next <= 30) {
    state.cart[toolId].days = next;
    saveState();
    renderCartModal();
  }
};

function updateCartBadge() {
  const badge = document.getElementById("cartCountBadge");
  if (badge) {
    badge.innerText = Object.keys(state.cart).length;
  }
}

// --- 5. ВІДКРИТТЯ ТА РЕНДЕРИНГ КОШИКА (ЗАХИЩЕНО) ---
window.openCartModal = () => {
  try {
    renderCartModal();
  } catch (err) {
    console.error("Помилка рендерингу кошика:", err);
  }
  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.classList.remove("hidden");
  }
};

window.closeCartModal = () => {
  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.classList.add("hidden");
  }
};

function renderCartModal() {
  const list = document.getElementById("cartItemsList");
  if (!list) return;

  const toolIds = Object.keys(state.cart);

  if (toolIds.length === 0) {
    list.innerHTML = `
      <div class="text-center py-10 space-y-2">
        <i data-lucide="shopping-bag" class="w-12 h-12 text-slate-600 mx-auto"></i>
        <p class="text-sm text-slate-400 font-semibold">Ваш кошик порожній</p>
        <p class="text-xs text-slate-500">Оберіть інструменти в каталозі для оренди</p>
      </div>
    `;
    const rSum = document.getElementById("cartRentalSum");
    const dSum = document.getElementById("cartDepositSum");
    const tSum = document.getElementById("cartTotalSum");
    if (rSum) rSum.innerText = "0 грн";
    if (dSum) dSum.innerText = "0 грн";
    if (tSum) tSum.innerText = "0 грн";
    safeLucide();
    return;
  }

  let totalRental = 0;
  let totalDeposit = 0;

  list.innerHTML = toolIds.map(id => {
    const tool = CATALOG.find(t => t.id === id);
    if (!tool) {
      delete state.cart[id];
      return "";
    }

    const days = state.cart[id].days || 1;
    const itemRental = tool.dayPrice * days;
    totalRental += itemRental;
    totalDeposit += tool.deposit;

    return `
      <div class="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <img src="${tool.image}" class="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slate-800">
          <div>
            <h4 class="text-xs font-bold text-white leading-tight">${tool.title}</h4>
            <p class="text-[10px] text-amber-400 font-mono mt-0.5">Комірка #${tool.boxId} • Застава: ${formatMoney(tool.deposit)}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-2 py-1 rounded-xl">
            <button onclick="window.changeCartDays('${tool.id}', -1)" class="w-5 h-5 rounded hover:bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs">-</button>
            <span class="text-xs font-mono font-bold text-white w-6 text-center">${days} д</span>
            <button onclick="window.changeCartDays('${tool.id}', 1)" class="w-5 h-5 rounded hover:bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs">+</button>
          </div>
          <div class="text-right min-w-[70px]">
            <p class="text-xs font-extrabold text-white font-mono">${formatMoney(itemRental)}</p>
          </div>
          <button onclick="window.toggleCartItem('${tool.id}')" class="text-slate-500 hover:text-rose-400 p-1">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  }).filter(Boolean).join("");

  const rSum = document.getElementById("cartRentalSum");
  const dSum = document.getElementById("cartDepositSum");
  const tSum = document.getElementById("cartTotalSum");
  if (rSum) rSum.innerText = formatMoney(totalRental);
  if (dSum) dSum.innerText = formatMoney(totalDeposit);
  if (tSum) tSum.innerText = formatMoney(totalRental + totalDeposit);

  safeLucide();
}

window.proceedToCheckout = () => {
  if (Object.keys(state.cart).length === 0) {
    showToast("Додайте хоча б один інструмент", "error");
    return;
  }
  if (!state.user) {
    window.closeCartModal();
    window.openAuthModal();
    showToast("Будь ласка, авторизуйтесь перед оплатою", "info");
    return;
  }

  window.closeCartModal();
  const checkoutModal = document.getElementById("checkoutModal");
  if (checkoutModal) checkoutModal.classList.remove("hidden");
};
window.closeCheckoutModal = () => {
  const checkoutModal = document.getElementById("checkoutModal");
  if (checkoutModal) checkoutModal.classList.add("hidden");
};

// --- 6. ПЛАТІЖ ТА PIN-КОДИ ---
window.startPaymentProcess = () => {
  window.closeCheckoutModal();
  const progressModal = document.getElementById("paymentProgressModal");
  const pTitle = document.getElementById("payProgressTitle");
  const pSub = document.getElementById("payProgressSub");
  if (progressModal) progressModal.classList.remove("hidden");

  if (pTitle) pTitle.innerText = "Авторизація картки...";
  if (pSub) pSub.innerText = "Зв'язок із Monobank API";

  setTimeout(() => {
    if (pTitle) pTitle.innerText = "Холдування застави (Pre-auth)...";
    if (pSub) pSub.innerText = "Заморожування суми на 1-2 доби";

    setTimeout(() => {
      createOrdersFromCart();
      if (progressModal) progressModal.classList.add("hidden");
      window.openOrdersModal();
      showToast("Оплата успішна! Комірки активовано", "success");
    }, 1200);
  }, 1000);
};

function createOrdersFromCart() {
  const toolIds = Object.keys(state.cart);
  const now = new Date();

  toolIds.forEach(id => {
    const tool = CATALOG.find(t => t.id === id);
    if (!tool) return;
    const days = state.cart[id].days || 1;
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    state.orders.unshift({
      id: "ord_" + Math.random().toString(36).substr(2, 7),
      toolId: tool.id,
      toolTitle: tool.title,
      boxId: tool.boxId,
      days: days,
      pin: pin,
      status: "active",
      date: now.toLocaleDateString("uk-UA")
    });
  });

  state.cart = {};
  saveState();
  renderCatalog();
  updateOrdersBadge();
}

// --- 7. МОЇ ОРЕНДИ ---
function updateOrdersBadge() {
  const count = state.orders.filter(o => o.status === "active").length;
  const badge = document.getElementById("ordersCountBadge");
  if (badge) {
    if (count > 0) {
      badge.classList.remove("hidden");
      badge.innerText = count;
    } else {
      badge.classList.add("hidden");
    }
  }
}

window.openOrdersModal = () => {
  renderOrdersModal();
  const modal = document.getElementById("ordersModal");
  if (modal) modal.classList.remove("hidden");
};
window.closeOrdersModal = () => {
  const modal = document.getElementById("ordersModal");
  if (modal) modal.classList.add("hidden");
};

function renderOrdersModal() {
  const list = document.getElementById("ordersList");
  if (!list) return;

  if (state.orders.length === 0) {
    list.innerHTML = `
      <div class="text-center py-10 space-y-2">
        <i data-lucide="key-round" class="w-12 h-12 text-slate-600 mx-auto"></i>
        <p class="text-sm text-slate-400 font-semibold">У вас немає активних комірок</p>
        <p class="text-xs text-slate-500">Після оплати тут з'являться ваші PIN-коди для ESP32</p>
      </div>
    `;
    safeLucide();
    return;
  }

  list.innerHTML = state.orders.map(order => {
    const isActive = order.status === "active";
    return `
      <div class="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-4 sm:p-5 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-xs">
              Комірка #${order.boxId}
            </span>
            <span class="text-xs text-slate-400">${order.date} (${order.days} діб)</span>
          </div>
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            isActive 
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
              : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
          }">
            ${isActive ? "В оренді" : "Очікує огляду майстром"}
          </span>
        </div>

        <h4 class="text-sm font-bold text-white">${order.toolTitle}</h4>

        ${isActive ? `
          <div class="bg-slate-900 border border-slate-700/80 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Одноразовий PIN до комірки:</p>
              <p class="text-xl font-mono font-extrabold text-amber-400 tracking-widest mt-0.5">${order.pin}</p>
            </div>
            <button onclick="navigator.clipboard.writeText('${order.pin}'); window.showToast('PIN скопійовано: ${order.pin}', 'success')" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg font-semibold transition">
              Копіювати
            </button>
          </div>

          <div class="flex items-center gap-2 pt-1">
            <button onclick="window.openSimulator('${order.boxId}', '${order.pin}')" class="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5">
              <i data-lucide="wifi" class="w-3.5 h-3.5"></i>
              <span>Відімкнути ESP32</span>
            </button>
            <button onclick="window.openReturnModal('${order.id}')" class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 border border-slate-700">
              <i data-lucide="corner-down-left" class="w-3.5 h-3.5"></i>
              <span>Повернути річ</span>
            </button>
          </div>
        ` : `
          <div class="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 leading-snug">
            ⏳ Річ успішно повернуто в комірку. Майстер проведе діагностику протягом 1–2 діб, після чого заставу буде розблоковано банком.
          </div>
        `}
      </div>
    `;
  }).join("");

  safeLucide();
}

// --- 8. СИМУЛЯТОР ESP32 ---
window.openSimulator = (boxId, pin) => {
  state.activeSimLocker = { boxId, pin };
  const dNum = document.getElementById("simDoorNumber");
  const door = document.getElementById("simDoor");
  const pInput = document.getElementById("simPinInput");
  const modal = document.getElementById("simModal");

  if (dNum) dNum.innerText = "№ " + boxId;
  if (door) door.classList.remove("door-open");
  if (pInput) pInput.value = "";
  if (modal) modal.classList.remove("hidden");
};

window.closeSimulator = () => {
  const modal = document.getElementById("simModal");
  if (modal) modal.classList.add("hidden");
};

window.simPasteMyPin = () => {
  if (state.activeSimLocker) {
    const input = document.getElementById("simPinInput");
    if (input) input.value = state.activeSimLocker.pin;
  }
};

window.submitPinUnlock = () => {
  const input = document.getElementById("simPinInput");
  const entered = input ? input.value.trim() : "";
  if (!state.activeSimLocker) return;

  if (entered === state.activeSimLocker.pin) {
    playRelayClick();
    const door = document.getElementById("simDoor");
    if (door) door.classList.add("door-open");
    showToast("Команда 'UNLOCK' виконана! Замок відчинено", "success");
    setTimeout(() => {
      setTimeout(() => {
        if (door) door.classList.remove("door-open");
      }, 3000);
    }, 500);
  } else {
    showToast("Помилка 403: Невірний PIN-код!", "error");
  }
};

// --- 9. ПОВЕРНЕННЯ РЕЧІ ---
window.openReturnModal = (orderId) => {
  state.activeReturnOrder = state.orders.find(o => o.id === orderId);
  if (!state.activeReturnOrder) return;

  const title = document.getElementById("returnModalTitle");
  const placeholder = document.getElementById("photoPlaceholder");
  const preview = document.getElementById("photoPreviewBox");
  const btn = document.getElementById("confirmReturnBtn");

  if (title) title.innerText = `Здача комірки #${state.activeReturnOrder.boxId}`;
  if (placeholder) placeholder.classList.remove("hidden");
  if (preview) preview.classList.add("hidden");
  if (btn) {
    btn.disabled = true;
    btn.className = "w-full bg-slate-800 text-slate-500 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition";
  }
  
  window.closeOrdersModal();
  const modal = document.getElementById("returnModal");
  if (modal) modal.classList.remove("hidden");
};

window.closeReturnModal = () => {
  const modal = document.getElementById("returnModal");
  if (modal) modal.classList.add("hidden");
};

window.handlePhotoSelected = (e) => {
  if (e.target.files && e.target.files[0]) {
    const placeholder = document.getElementById("photoPlaceholder");
    const preview = document.getElementById("photoPreviewBox");
    const btn = document.getElementById("confirmReturnBtn");

    if (placeholder) placeholder.classList.add("hidden");
    if (preview) preview.classList.remove("hidden");
    if (btn) {
      btn.disabled = false;
      btn.className = "w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20";
    }
    showToast("Фото зафіксовано системою!", "success");
  }
};

window.confirmReturn = () => {
  if (!state.activeReturnOrder) return;
  state.activeReturnOrder.status = "returning";
  saveState();
  window.closeReturnModal();
  window.openOrdersModal();
  showToast("Інструмент здано! Заставу буде повернено після огляду", "success");
};

// --- 10. ЗАПУСК ---
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  updateAuthUI();
  renderCatalog();
  updateOrdersBadge();
});