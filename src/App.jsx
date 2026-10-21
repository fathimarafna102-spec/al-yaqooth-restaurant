
import { useEffect, useMemo, useState } from "react";
import "./App.css";

const TALABAT_URL = "https://www.talabat.com/uae/al-yaqoot-restaurant";
const PHONE = "092774567";
const WHATSAPP = "0507792866";
const ADMIN_PASSWORD = "admin123"; // Frontend demo only; not secure authentication.

const starterMenu = [
  {
    id: 1,
    name: "Mutton Mandi",
    ar: "مندي لحم",
    category: "Mandi",
    price: 38,
    image: "/food/Delicious Mutton Biryani_ Aromatic & Flavorful Recipe (1).jpg",
    emoji: "🍖",
    desc: "Tender mutton served with aromatic rice.",
  },
  {
    id: 2,
    name: "Chicken Biriyani",
    ar: "برياني دجاج",
    category: "Biriyani",
    price: 30,
    image: "/food/Fragrant Butter Chicken Biryani.jpg",
    emoji: "🍗",
    desc: "Aromatic basmati rice with tender chicken and rich spices.",
  },
  {
    id: 3,
    name: "Mutton Kabab",
    ar: "كباب لحم",
    category: "Grill",
    price: 30,
    image: "/food/download (1).jpg",
    emoji: "🍢",
    desc: "Juicy grilled mutton kebabs.",
  },
  {
    id: 4,
    name: "Chicken Kabab",
    ar: "كباب دجاج",
    category: "Grill",
    price: 24,
    image: "/food/Chicken Malai Tikka Barbeque.jpg",
    emoji: "🍢",
    desc: "Char-grilled chicken kebabs.",
  },
  {
    id: 5,
    name: "Family Special Grill",
    ar: "مشاوي عائلية",
    category: "Grill",
    price: 85,
    image: "/food/download (2).jpg",
    emoji: "🔥",
    desc: "A generous grilled platter made for sharing.",
  },
  {
    id: 6,
    name: "Mushroom Soup",
    ar: "شوربة الفطر",
    category: "Soup",
    price: 16,
    image: "/food/download (3).jpg",
    emoji: "🍲",
    desc: "Warm and creamy mushroom soup.",
  },
  {
    id: 7,
    name: "Seafood Soup",
    ar: "شوربة المأكولات البحرية",
    category: "Soup",
    price: 22,
    image: "/food/Creamy Crab and Shrimp Seafood Bisque.jpg",
    emoji: "🍲",
    desc: "Rich seafood soup with delicate spices.",
  },
  {
    id: 8,
    name: "Mutabbal",
    ar: "متبل",
    category: "Starters",
    price: 14,
    image: "/food/Baba Ghanouj (Eggplant Dip) Recipe (with video) _ Clove.jpg",
    emoji: "🥣",
    desc: "Smoky eggplant dip finished with olive oil.",
  },
  {
    id: 9,
    name: "Arabic Salad",
    ar: "سلطة عربية",
    category: "Starters",
    price: 12,
    image: "/food/CHICKEN SALAD RECIPE WITH GRAPES.jpg",
    emoji: "🥗",
    desc: "A refreshing salad with fresh vegetables and herbs.",
  },
  {
    id: 10,
    name: "Butter Chicken",
    ar: "دجاج بالزبدة",
    category: "Main Course",
    price: 28,
    image: "/food/Chicken Tikka Masala 🍗🍛.jpg",
    emoji: "🍛",
    desc: "Tender chicken in a rich, creamy tomato sauce.",
  },
  {
    id: 11,
    name: "Paneer Butter Masala",
    ar: "بانير بالزبدة",
    category: "Main Course",
    price: 24,
    image: "/food/Nothing beats the elite combo of rich, creamy paneer and warm, pillowy naan_.jpg",
    emoji: "🧀",
    desc: "Soft paneer in a rich buttery masala sauce.",
  },
  {
    id: 12,
    name: "Chicken Shawarma",
    ar: "شاورما دجاج",
    category: "Shawarma",
    price: 10,
    image: "/food/Easy Lunch Wrap Recipes for Work.jpg",
    emoji: "🌯",
    desc: "Seasoned chicken wrapped with delicious fillings.",
  },
  {
    id: 13,
    name: "Beef Shawarma",
    ar: "شاورما لحم",
    category: "Shawarma",
    price: 12,
    image: "/food/Cheesy Beef Burrito Wrap _ Loaded Beef & Cheese Wrap with Sauce – Food Photography 2026.jpg",
    emoji: "🌯",
    desc: "Seasoned beef wrap with a savoury sauce.",
  },
  {
    id: 14,
    name: "Loaded Fries",
    ar: "بطاطس محملة",
    category: "Snacks",
    price: 18,
    image: "/food/download (7).jpg",
    emoji: "🍟",
    desc: "Golden fries with delicious toppings.",
  },
  {
    id: 15,
    name: "Creamy Alfredo Pasta",
    ar: "باستا ألفريدو",
    category: "Pasta",
    price: 24,
    image: "/food/Best Pan for Creamy Shrimp Pasta.jpg",
    emoji: "🍝",
    desc: "Creamy pasta tossed in a rich sauce.",
  },
  {
    id: 16,
    name: "Spicy Arrabbiata Pasta",
    ar: "باستا أرابياتا",
    category: "Pasta",
    price: 22,
    image: "/food/Smoky Arrabbiata Pasta.jpg",
    emoji: "🍝",
    desc: "Pasta in a spicy tomato and chilli sauce.",
  },
  {
    id: 17,
    name: "Orange Juice",
    ar: "عصير برتقال",
    category: "Juices",
    price: 10,
    image: "/food/download (4).jpg",
    emoji: "🍊",
    desc: "Refreshing orange juice.",
  },
  {
    id: 18,
    name: "Pineapple Juice",
    ar: "عصير الأناناس",
    category: "Juices",
    price: 10,
    image: "/food/pineapple juice.jpg",
    emoji: "🍍",
    desc: "Sweet and refreshing pineapple juice.",
  },
  {
    id: 19,
    name: "Watermelon Juice",
    ar: "عصير بطيخ",
    category: "Juices",
    price: 10,
    image: "/food/download (5).jpg",
    emoji: "🍉",
    desc: "Fresh and refreshing watermelon juice.",
  },
  {
    id: 20,
    name: "Pomegranate Juice",
    ar: "عصير الرمان",
    category: "Juices",
    price: 12,
    image: "/food/download (6).jpg",
    emoji: "🥤",
    desc: "Fresh pomegranate juice with a sweet, tangy taste.",
  },
];

const translations = {
  en: {
    home: "Home", menu: "Our Menu", story: "Our Story", orders: "My Orders",
    admin: "Admin", orderOnline: "Order Online", explore: "Explore Menu",
    welcome: "A taste worth", welcomeAccent: "coming back for.",
    heroText: "Discover comforting flavours, generous plates and warm hospitality at Al Yaqooth.",
    menuEyebrow: "MADE WITH CARE", menuTitle: "Our Signature Menu",
    menuText: "Find your favourite, freshly prepared.",
    search: "Search dishes...", all: "All", add: "Add to cart",
    cart: "Your Cart", emptyCart: "Your cart is waiting for something delicious.",
    subtotal: "Subtotal", checkout: "Continue to checkout", name: "Your name",
    phone: "Phone number", address: "Delivery address", placeOrder: "Place demo order",
    success: "Order received!", successText: "Your demo order has been saved on this device.",
    continue: "Continue exploring", storyTitle: "A table full of flavour",
    storyText: "From aromatic rice dishes to sizzling grills, Al Yaqooth brings together satisfying flavours for every table.",
    contact: "Visit or contact us", call: "Call restaurant", whatsapp: "Order on WhatsApp",
    emptyOrders: "Your placed demo orders will appear here.", orderHistory: "Order History",
    login: "Admin Login", password: "Password", signIn: "Sign in",
    logout: "Log out", dashboard: "Restaurant Dashboard", menuManage: "Manage Menu",
    ordersManage: "Manage Orders", edit: "Edit", save: "Save", cancel: "Cancel",
    delete: "Delete", status: "Status", price: "Price (AED)", itemName: "Item name",
    imagePath: "Image path", description: "Description", addItem: "Add menu item",
    noOrders: "No orders yet.", total: "Total", orderNumber: "Order",
    loginError: "Incorrect password.", demoNote: "Demo ordering only — no payment is collected.",
    footer: "Good Food. Bring Good People Together.", available: "Available on Talabat",
    viewTalabat: "View on Talabat", category: "Category", qty: "Qty",
    customer: "Customer", placed: "Placed", orderStatus: "Update status",
  },
  ar: {
    home: "الرئيسية", menu: "قائمة الطعام", story: "قصتنا", orders: "طلباتي",
    admin: "الإدارة", orderOnline: "اطلب الآن", explore: "استكشف القائمة",
    welcome: "نكهة تستحق", welcomeAccent: "العودة إليها.",
    heroText: "اكتشف النكهات المميزة والأطباق السخية وكرم الضيافة في مطعم الياقوت.",
    menuEyebrow: "أُعدّ بعناية", menuTitle: "قائمة أطباقنا المميزة",
    menuText: "اختر طبقك المفضل المحضّر بعناية.",
    search: "ابحث عن الأطباق...", all: "الكل", add: "أضف إلى السلة",
    cart: "سلتك", emptyCart: "سلتك بانتظار طبق لذيذ.",
    subtotal: "المجموع الفرعي", checkout: "متابعة الدفع", name: "اسمك",
    phone: "رقم الهاتف", address: "عنوان التوصيل", placeOrder: "إتمام الطلب التجريبي",
    success: "تم استلام الطلب!", successText: "تم حفظ الطلب التجريبي على هذا الجهاز.",
    continue: "متابعة التصفح", storyTitle: "مائدة مليئة بالنكهات",
    storyText: "من أطباق الأرز العطرية إلى المشاوي الشهية، يجمع مطعم الياقوت نكهات ترضي الجميع.",
    contact: "زورونا أو تواصلوا معنا", call: "اتصل بالمطعم", whatsapp: "اطلب عبر واتساب",
    emptyOrders: "ستظهر طلباتك التجريبية هنا.", orderHistory: "سجل الطلبات",
    login: "دخول الإدارة", password: "كلمة المرور", signIn: "دخول",
    logout: "تسجيل الخروج", dashboard: "لوحة إدارة المطعم", menuManage: "إدارة القائمة",
    ordersManage: "إدارة الطلبات", edit: "تعديل", save: "حفظ", cancel: "إلغاء",
    delete: "حذف", status: "الحالة", price: "السعر (درهم)", itemName: "اسم الطبق",
    imagePath: "مسار الصورة", description: "الوصف", addItem: "إضافة طبق",
    noOrders: "لا توجد طلبات بعد.", total: "الإجمالي", orderNumber: "طلب",
    loginError: "كلمة المرور غير صحيحة.", demoNote: "طلب تجريبي فقط — لا يتم تحصيل أي مبلغ.",
    footer: "طعام لذيذ يجمع الأحبة.", available: "متوفر على طلبات",
    viewTalabat: "عرض على طلبات", category: "الفئة", qty: "الكمية",
    customer: "العميل", placed: "تاريخ الطلب", orderStatus: "تحديث الحالة",
  },
};

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The app remains usable if local storage is unavailable.
  }
}

function money(value) {
  return `AED ${Number(value || 0).toFixed(2)}`;
}
function OrderSuccess({ order, language, onContinue }) {
  const isArabic = language === "ar";
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);


  return (
    <section className="success-page">
      <div className="success-card">
        {showConfetti && (
          <div className="confetti-container">
            {Array.from({ length: 70 }, (_, i) => (
              <span
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  backgroundColor: ["#e8c36a", "#a51d32", "#ffffff", "#2ecc71"][i % 4],
                }}
              />
            ))}
          </div>
        )}
        <div className="success-icon">✓</div>

        <p className="success-eyebrow">AL YAQOOTH RESTAURANT</p>

        <h1>
          {isArabic ? "تم تأكيد الطلب!" : "Order Confirmed!"}
        </h1>

        <p className="success-description">
          {isArabic
            ? "شكراً لك! تم استلام طلبك بنجاح."
            : "Thank you! Your order has been received successfully."}
        </p>

        {order && (
          <div className="success-order-details">
            <span>ORDER REFERENCE</span>
            <strong>#{order.id ?? order.orderNumber ?? "YAQOOTH"}</strong>

            {order.total != null && (
              <p>AED {Number(order.total).toFixed(2)}</p>
            )}
          </div>
        )}

        <p className="success-thanks">
          Thank you for choosing Al Yaqooth.
        </p>

        <button
          className="success-continue"
          onClick={onContinue}
        >
          Continue Exploring Menu →
        </button>
      </div>
    </section>
  );
}

export default function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("yaqooth_language") || "en");
  const [menu, setMenu] = useState(() => readStorage("yaqooth_menu", starterMenu));
  const [cart, setCart] = useState(() => readStorage("yaqooth_cart", []));
  const [orders, setOrders] = useState(() => readStorage("yaqooth_orders", []));
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [lastOrder, setLastOrder] = useState(null);
  const [notice, setNotice] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [adminTab, setAdminTab] = useState("orders");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = translations[language];
  const isArabic = language === "ar";

  useEffect(() => saveStorage("yaqooth_menu", menu), [menu]);
  useEffect(() => saveStorage("yaqooth_cart", cart), [cart]);
  useEffect(() => saveStorage("yaqooth_orders", orders), [orders]);
  useEffect(() => {
    localStorage.setItem("yaqooth_language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [language, isArabic]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(""), 2400);
    return () => clearTimeout(timer);
  }, [notice]);

  const categories = useMemo(
    () => ["All", ...new Set(menu.map((item) => item.category))],
    [menu]
  );

  const filteredMenu = useMemo(() => {
    const query = search.trim().toLowerCase();
    return menu.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.ar.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [menu, category, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  function navigate(nextPage) {
  setMobileOpen(false);

  if (nextPage === "story") {
    setPage("home");

    setTimeout(() => {
      document.getElementById("story")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    return;
  }

  setPage(nextPage);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
  function addToCart(dish) {
    setCart((current) => {
      const found = current.find((item) => item.id === dish.id);
      if (found) {
        return current.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...dish, quantity: 1 }];
    });
    setNotice(`${dish.name} added to cart`);
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
        .filter((item) => item.quantity > 0)
    );
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!cart.length) {
      setNotice("Your cart is empty");
      return;
    }

    const order = {
      id: `AY-${Date.now().toString().slice(-7)}`,
      customer: { ...customer },
      items: cart.map((item) => ({ ...item })),
      total: subtotal,
      status: "Received",
      createdAt: new Date().toLocaleString(),
    };

    setOrders((current) => [order, ...current]);
    setLastOrder(order);
    setCart([]);
    setCustomer({ name: "", phone: "", address: "" });
    navigate("success");
  }

  function startEditing(item) {
    setEditingId(item.id);
    setEditForm({ ...item });
  }

  function saveEditing(event) {
    event.preventDefault();
    setMenu((current) =>
      current.map((item) =>
        item.id === editingId
          ? { ...item, ...editForm, price: Number(editForm.price) }
          : item
      )
    );
    setEditingId(null);
    setNotice("Menu item updated");
  }

  function deleteItem(id) {
    if (!window.confirm("Delete this menu item?")) return;
    setMenu((current) => current.filter((item) => item.id !== id));
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function addMenuItem() {
    const newItem = {
      id: Date.now(),
      name: "New Menu Item",
      ar: "طبق جديد",
      category: "Main Course",
      price: 10,
      image: "/food/new-dish.jpg",
      emoji: "🍽️",
      desc: "Add a description",
    };
    setMenu((current) => [...current, newItem]);
    startEditing(newItem);
    setAdminTab("menu");
  }

  function updateOrderStatus(orderId, status) {
    setOrders((current) =>
      current.map((order) => order.id === orderId ? { ...order, status } : order)
    );
  }

  function loginAdmin(event) {
    event.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      setLoginError("");
      setAdminPassword("");
    } else {
      setLoginError(t.loginError);
    }
  }

  const navItems = [
    ["home", t.home],
    ["menu", t.menu],
    ["story", t.story],
    ["orders", t.orders],
  ];

  return (
    <div className={`yaqooth-app ${isArabic ? "rtl" : ""}`}>
      <div className="announcement-bar">
        <span>✦</span> {t.available} <span>✦</span>
        <a href={TALABAT_URL} target="_blank" rel="noreferrer">{t.viewTalabat} ↗</a>
      </div>

      <header className="site-header">
        <button className="brand" onClick={() => navigate("home")} aria-label="Al Yaqooth home">
          <img src="/logo.jpg" alt="Al Yaqooth Restaurant logo" />
          <span className="brand-text">
            <strong>AL YAQOOTH</strong>
            <small>R E S T A U R A N T</small>
            <em>SINCE 1993</em>
          </span>
        </button>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        <nav className={mobileOpen ? "main-nav open" : "main-nav"}>
          {navItems.map(([id, label]) => (
            <button key={id} className={page === id ? "nav-link active" : "nav-link"} onClick={() => navigate(id)}>
              {label}
            </button>
          ))}
          <button className="nav-link" onClick={() => navigate("admin")}>{t.admin}</button>
        </nav>

        <div className="header-actions">
          <button className="language-toggle" onClick={() => setLanguage(isArabic ? "en" : "ar")}>
            {isArabic ? "EN | English" : "عربي | AR"}
          </button>

          <button className="cart-trigger" onClick={() => navigate("cart")}>
            <span>🛒</span> {t.cart} <b>{cartCount}</b>
          </button>

        </div>
      </header>

      {notice && <div className="toast-notice" role="status">{notice}</div>}

      <main key={page} className="page-content">
        {page === "home" && (
          <>
            <section className="hero-section">
              <div className="hero-photo" />
              <div className="hero-overlay" />

              <div className="hero-content">
                <img
                  src="/logo.jpg"
                  alt="Al Yaqooth Restaurant Logo"
                  className="hero-logo"
                />

                <p className="hero-welcome">WELCOME TO</p>

                <h1 className="hero-title">
                  <span>AL YAQOOTH</span>
                  <span className="hero-title-red">RESTAURANT</span>
                </h1>

                <p className="hero-caption">
                  Tradition, flavour &amp; hospitality since 1993.
                </p>

                <div className="hero-buttons">
                  <button
                    className="hero-btn hero-btn-primary"
                    onClick={() => navigate("menu")}
                  >
                    EXPLORE MENU <span>→</span>
                  </button>

                  <a
                    className="hero-btn hero-btn-outline"
                    href="https://www.talabat.com/uae/al-yaqoot-restaurant"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ORDER ONLINE <span>→</span>
                  </a>
                </div>
              </div>
            </section>
            <section className="intro-strip">
              <span>TRADITION</span><i>✦</i><span>FLAVOUR</span><i>✦</i><span>HOSPITALITY</span><i>✦</i><span>TOGETHERNESS</span>
            </section>

            <section className="story-section section-wrap" id="story">
  {/* LEFT: CHEF IMAGE */}
<div className="story-image">
  <img
    src="/food/al-yaqooth-chef.png.png"
    alt="Al Yaqooth Restaurant"
  />

  <div className="story-image-caption">
    <span>AL YAQOOTH</span>
    <small>R E S T A U R A N T</small>
  </div>
</div>

  {/* RIGHT: STORY CONTENT */}
  <div className="story-copy">
    <p className="story-eyebrow">
      <span></span> OUR STORY <span></span>
    </p>

    <h2 className="story-heading">
      From a Dream
      <br />
      to a <em>Growing Legacy</em>
    </h2>

    <p className="story-subtitle">
      PASSION&nbsp; / &nbsp;HARD WORK&nbsp; / &nbsp;DETERMINATION
    </p>

    <div className="story-description">
      <p>
        Every great journey begins with a dream. Our story began
        with a young man who moved to Dubai at the age of 20,
        carrying hope in his heart and a determination to build
        a better future.
      </p>

      <p>
        He learned the restaurant business through hard work,
        patience, and experience. Every challenge became a lesson,
        and every day brought him one step closer to his dream.
      </p>

      <p>
        At the age of 29, that dream became reality when he opened
        his own restaurant. What began as one man's ambition grew
        into a journey built on dedication, hospitality, and a love
        for bringing people together.
      </p>

      <p>
        Today, Al Yaqooth continues that journey as we prepare
        to welcome guests to our third branch. The dream continues,
        and so does our commitment to every guest who walks through
        our doors.
      </p>
    </div>

    <div className="story-signature">
      Every dish tells a story.
      <br />
      <span>Every guest becomes part of our legacy.</span>
    </div>

    {/* MILESTONES */}
    <div className="story-milestones">
      <div className="story-milestone">
        <strong>1993</strong>
        <span>AGE 20</span>
        <p>Started his journey in Dubai</p>
      </div>

      <div className="story-milestone">
        <strong>1996</strong>
        <span>AGE 29</span>
        <p>Opened his own restaurant</p>
      </div>

      <div className="story-milestone">
        <strong>03</strong>
        <span>THIRD BRANCH</span>
        <p>A growing dream continues</p>
      </div>
    </div>

    <button
      className="story-explore-button"
      onClick={() => navigate("menu")}
    >
      EXPLORE MENU <span>→</span>
    </button>
  </div>
</section>
            <section className="featured-section section-wrap">
              <div className="section-heading">
                <div><p className="eyebrow">{t.menuEyebrow}</p><h2>{t.menuTitle}</h2><p>{t.menuText}</p></div>
                <button className="text-link" onClick={() => navigate("menu")}>{t.explore} ↗</button>
              </div>
              <div className="menu-grid featured-grid">
                {menu.slice(0, 4).map((item) => (
                  <FoodCard key={item.id} item={item} language={language} addToCart={addToCart} buttonText={t.add} />
                ))}
              </div>
            </section>

            <section className="poster-promo">
              <div className="promo-inner">
                <p className="eyebrow">YOUR TABLE IS WAITING</p>
                <h2>Make room for<br /><span>something delicious.</span></h2>
                <button className="button button-gold" onClick={() => navigate("menu")}>{t.explore} ↗</button>
              </div>
            </section>

            <ContactSection t={t} />
          </>
        )}

        {page === "menu" && (
          <section className="menu-page section-wrap">
            <div className="page-heading">
              <p className="eyebrow">{t.menuEyebrow}</p>
              <h1>{t.menuTitle}</h1>
              <p>{t.menuText}</p>
            </div>
            <div className="menu-tools">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} aria-label={t.search} />
              <div className="category-list">
                {categories.map((item) => (
                  <button key={item} onClick={() => setCategory(item)} className={category === item ? "category-chip active" : "category-chip"}>
                    {item === "All" ? t.all : item}
                  </button>
                ))}
              </div>
            </div>
            <div className="menu-grid">
              {filteredMenu.map((item) => (
                <FoodCard key={item.id} item={item} language={language} addToCart={addToCart} buttonText={t.add} />
              ))}
            </div>
            {!filteredMenu.length && <p className="empty-state">No dishes found. Try another search.</p>}
          </section>
        )}

        {page === "cart" && (
          <section className="checkout-page section-wrap">
            <div className="page-heading"><p className="eyebrow">YOUR SELECTION</p><h1>{t.cart}</h1></div>
            {!cart.length ? (
              <div className="empty-cart">
                <span className="empty-cart-icon">✦</span>
                <h2>{t.emptyCart}</h2>
                <button className="button button-gold" onClick={() => navigate("menu")}>{t.explore}</button>
              </div>
            ) : (
              <div className="checkout-layout">
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-photo">
                        <img src={item.image} alt={item.name} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                        <span>{item.emoji}</span>
                      </div>
                      <div className="cart-item-info">
                        <h3>{isArabic ? item.ar : item.name}</h3>
                        <p>{money(item.price)}</p>
                        <div className="quantity-control">
                          <button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
                        </div>
                      </div>
                      <strong>{money(item.price * item.quantity)}</strong>
                      <button className="remove-item" onClick={() => setCart((current) => current.filter((x) => x.id !== item.id))} aria-label="Remove item">×</button>
                    </div>
                  ))}
                </div>
                <div className="order-summary">
                  <p className="eyebrow">SUMMARY</p><h2>{t.subtotal}</h2>
                  <div className="summary-line"><span>{t.subtotal}</span><strong>{money(subtotal)}</strong></div>
                  <p className="demo-warning">{t.demoNote}</p>
                  <button className="button button-gold full-button" onClick={() => navigate("checkout")}>{t.checkout} ↗</button>
                </div>
              </div>
            )}
          </section>
        )}

        {page === "checkout" && (
          <section className="checkout-page section-wrap">
            <div className="page-heading"><p className="eyebrow">AL YAQOOTH</p><h1>{t.checkout}</h1></div>
            {!cart.length ? (
              <div className="empty-cart"><h2>{t.emptyCart}</h2><button className="button button-gold" onClick={() => navigate("menu")}>{t.explore}</button></div>
            ) : (
              <div className="checkout-layout">
                <form className="checkout-form" onSubmit={placeOrder}>
                  <h2>Delivery details</h2>
                  <label>{t.name}<input required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></label>
                  <label>{t.phone}<input required type="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} /></label>
                  <label>{t.address}<textarea required rows="3" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} /></label>
                  <p className="demo-warning">{t.demoNote}</p>
                  <button className="button button-gold full-button" type="submit">{t.placeOrder} · {money(subtotal)}</button>
                </form>
                <div className="order-summary"><p className="eyebrow">ORDER SUMMARY</p><h2>{cartCount} items</h2>
                  {cart.map((item) => <div className="summary-line" key={item.id}><span>{item.name} × {item.quantity}</span><strong>{money(item.price * item.quantity)}</strong></div>)}
                  <div className="summary-line summary-total"><span>{t.total}</span><strong>{money(subtotal)}</strong></div>
                </div>
              </div>
            )}
          </section>
        )}

        {page === "success" && (
          <section className="success-page section-wrap">
            <div className="success-card">
              <div className="success-check">✓</div>
              <p className="eyebrow">AL YAQOOTH RESTAURANT</p>
              <h1>{t.success}</h1>
              <p>{t.successText}</p>
              {lastOrder && (
                <div className="success-order-details">
                  <div><span>{t.orderNumber}</span><strong>{lastOrder.id}</strong></div>
                  <div><span>{t.customer}</span><strong>{lastOrder.customer.name}</strong></div>
                  <div><span>{t.total}</span><strong>{money(lastOrder.total)}</strong></div>
                  <div><span>{t.status}</span><strong>{lastOrder.status}</strong></div>
                </div>
              )}
              <p className="demo-warning">{t.demoNote}</p>
              <button className="button button-gold" onClick={() => navigate("menu")}>{t.continue} ↗</button>
              <button className="text-link" onClick={() => navigate("orders")}>{t.orderHistory}</button>
            </div>
          </section>
        )}

        {page === "orders" && (
          <section className="checkout-page section-wrap">
            <div className="page-heading"><p className="eyebrow">AL YAQOOTH</p><h1>{t.orderHistory}</h1></div>
            {!orders.length ? <div className="empty-cart"><h2>{t.emptyOrders}</h2><button className="button button-gold" onClick={() => navigate("menu")}>{t.explore}</button></div> :
              <div className="order-history-list">
                {orders.map((order) => (
                  <article className="history-order" key={order.id}>
                    <div className="history-order-top"><div><span className="eyebrow">{t.orderNumber}</span><h3>{order.id}</h3></div><span className="status-pill">{order.status}</span></div>
                    <p>{order.createdAt} · {order.customer.name}</p>
                    {order.items.map((item) => <div className="summary-line" key={item.id}><span>{item.name} × {item.quantity}</span><strong>{money(item.price * item.quantity)}</strong></div>)}
                    <div className="summary-line summary-total"><span>{t.total}</span><strong>{money(order.total)}</strong></div>
                  </article>
                ))}
              </div>
            }
          </section>
        )}

        {page === "admin" && (
          <section className="admin-page section-wrap">
            {!adminLoggedIn ? (
              <form className="admin-login" onSubmit={loginAdmin}>

                <div className="admin-lock">
                  <img src="/logo.jpg" alt="Al Yaqooth Logo" />
                </div>
                <p className="eyebrow">AL YAQOOTH · STAFF AREA</p>
                <h1>{t.login}</h1><p>Sign in to manage the demo menu and orders.</p>
                <label>{t.password}<input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required /></label>
                {loginError && <p className="form-error">{loginError}</p>}
                <button className="button button-gold full-button" type="submit">{t.signIn}</button>
                <small>Demo password: <strong>admin123</strong>. Replace with secure backend authentication before production.</small>
              </form>
            ) : (
              <div className="admin-dashboard">
                <div className="admin-heading"><div><p className="eyebrow">CONTROL ROOM</p><h1>{t.dashboard}</h1></div><button className="button button-outline" onClick={() => { setAdminLoggedIn(false); navigate("home"); }}>{t.logout}</button></div>
                <div className="admin-stats">
                  <div className="stat-card"><span>Total menu items</span><strong>{menu.length}</strong></div>
                  <div className="stat-card"><span>Total demo orders</span><strong>{orders.length}</strong></div>
                  <div className="stat-card"><span>Demo order value</span><strong>{money(orders.reduce((sum, order) => sum + order.total, 0))}</strong></div>
                </div>
                <div className="admin-tabs">
                  <button className={adminTab === "orders" ? "active" : ""} onClick={() => setAdminTab("orders")}>{t.ordersManage}</button>
                  <button className={adminTab === "menu" ? "active" : ""} onClick={() => setAdminTab("menu")}>{t.menuManage}</button>
                </div>

                {adminTab === "orders" && (
                  <div className="admin-orders">
                    {!orders.length ? <p className="empty-state">{t.noOrders}</p> : orders.map((order) => (
                      <article className="admin-order-card" key={order.id}>
                        <div><strong>{order.id}</strong><p>{order.customer.name} · {order.customer.phone}</p><small>{order.createdAt}</small></div>
                        <div><strong>{money(order.total)}</strong><p>{order.items.length} different items</p></div>
                        <label>{t.orderStatus}
                          <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                            {["Received", "Preparing", "Ready", "Completed", "Cancelled"].map((status) => <option key={status}>{status}</option>)}
                          </select>
                        </label>
                      </article>
                    ))}
                  </div>
                )}

                {adminTab === "menu" && (
                  <div className="admin-menu">
                    <div className="admin-menu-title"><h2>{t.menuManage}</h2><button className="button button-gold" onClick={addMenuItem}>+ {t.addItem}</button></div>
                    {menu.map((item) => (
                      <div className="admin-menu-row" key={item.id}>
                        {editingId === item.id ? (
                          <form className="edit-menu-form" onSubmit={saveEditing}>
                            <label>{t.itemName}<input required value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} /></label>
                            <label>Arabic<input value={editForm.ar || ""} onChange={(e) => setEditForm({ ...editForm, ar: e.target.value })} /></label>
                            <label>{t.category}<input required value={editForm.category || ""} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} /></label>
                            <label>{t.price}<input required type="number" min="0" step="0.5" value={editForm.price ?? 0} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} /></label>
                            <label>{t.imagePath}<input value={editForm.image || ""} onChange={(e) => setEditForm({ ...editForm, image: e.target.value })} /></label>
                            <label>{t.description}<input value={editForm.desc || ""} onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })} /></label>
                            <div className="edit-actions"><button className="button button-gold" type="submit">{t.save}</button><button type="button" className="button button-outline" onClick={() => setEditingId(null)}>{t.cancel}</button></div>
                          </form>
                        ) : (
                          <>
                            <div className="admin-menu-item"><img src={item.image} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} /><div><strong>{item.name}</strong><small>{item.category} · {money(item.price)}</small></div></div>
                            <div className="admin-row-actions"><button onClick={() => startEditing(item)}>{t.edit}</button><button className="danger-button" onClick={() => deleteItem(item.id)}>{t.delete}</button></div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        )}
        {page === "success" && (
          <OrderSuccess
            order={lastOrder}
            language={language}
            onContinue={() => navigate("menu")}
          />
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src="/logo.jpg" alt="Al Yaqooth logo" />
          <div><strong>AL YAQOOTH</strong><small>R E S T A U R A N T</small><span>SINCE 1993</span></div>
        </div>
        <p>{t.footer}</p>
        <div className="footer-links"><button onClick={() => navigate("menu")}>{t.menu}</button><button onClick={() => navigate("orders")}>{t.orders}</button><button onClick={() => navigate("admin")}>{t.admin}</button></div>
        <small>© {new Date().getFullYear()} Al Yaqooth Restaurant. All rights reserved.</small>
      </footer>
    </div>
  );
}

function FoodCard({ item, language, addToCart, buttonText }) {
  const [imageFailed, setImageFailed] = useState(false);
  const isArabic = language === "ar";

  return (
    <article className="food-card">
      <div className="food-image-wrap">
        {!imageFailed && (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        {imageFailed && <div className="food-image-fallback"><span>{item.emoji || "🍽️"}</span><small>FOOD PHOTO</small></div>}
        <span className="food-category-tag">{item.category}</span>
        <span className="food-image-shine" />
      </div>
      <div className="food-card-content">
        <div className="food-title-row">
          <h3>{isArabic ? item.ar : item.name}</h3>
          <strong className="food-price">{money(item.price)}</strong>
        </div>
        <p>{isArabic ? item.ar : item.desc}</p>
        <button className="add-food-button" onClick={() => addToCart(item)}>
          <span>+</span> {buttonText}
        </button>
      </div>
    </article>
  );
}

function ContactSection({ t }) {
  const whatsappMessage = encodeURIComponent("Hello Al Yaqooth Restaurant, I would like to enquire about your menu.");
  return (
    <section className="contact-section section-wrap">
      <div><p className="eyebrow">{t.contact}</p><h2>Come hungry.<br /><span>Leave happy.</span></h2></div>
      <div className="contact-details">
        <p><span>☎</span><a href={`tel:${PHONE}`}>{PHONE}</a></p>
        <p><span>⌖</span>Kalba, Fujairah, UAE</p>
        <a className="button button-gold" href={`https://wa.me/971${WHATSAPP.replace(/^0/, "")}?text=${whatsappMessage}`} target="_blank" rel="noreferrer">{t.whatsapp} ↗</a>
        <a className="button button-outline" href={TALABAT_URL} target="_blank" rel="noreferrer">{t.viewTalabat} ↗</a>
      </div>
    </section>
  );
}
