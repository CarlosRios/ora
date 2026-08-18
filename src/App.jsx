import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CirclesThreePlus,
  Cross,
  List,
  Moon,
  Sun,
  X,
} from "@phosphor-icons/react";
import {
  featuredPrayerIds,
  getSuggestedMystery,
  mysteries,
  prayers,
} from "./prayers";

const iconWeight = "regular";
const siteOrigin = "https://ora.carlosrios.io";

function parseRoute() {
  const legacyParts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (legacyParts.length) {
    if ((legacyParts[0] === "prayer" || legacyParts[0] === "prayers") && legacyParts[1]) {
      return { view: "prayer", id: legacyParts[1], legacy: true };
    }
    if (legacyParts[0] === "prayers") return { view: "prayers", legacy: true };
    if (legacyParts[0] === "rosary") return { view: "rosary", legacy: true };
  }

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "prayers" && parts[1]) return { view: "prayer", id: parts[1] };
  if (parts[0] === "prayers") return { view: "prayers" };
  if (parts[0] === "rosary") return { view: "rosary" };
  if (parts.length === 0 || parts.at(-1) === "index.html") return { view: "home" };
  return { view: "not-found" };
}

function routePath(route) {
  if (route.view === "prayer") return `/prayers/${route.id}/`;
  if (route.view === "prayers") return "/prayers/";
  if (route.view === "rosary") return "/rosary/";
  return "/";
}

function routeHref(route) {
  const path = routePath(route);
  return window.location.protocol === "file:" ? `#${path}` : path;
}

function getRouteMeta(route) {
  if (route.view === "rosary") {
    return {
      title: "How to Pray the Rosary and Its Mysteries | Ora",
      description: "Follow the order of the Holy Rosary and meditate on the Joyful, Luminous, Sorrowful, and Glorious Mysteries.",
    };
  }

  if (route.view === "prayers") {
    return {
      title: "Catholic Prayers | Ora",
      description: "A quiet collection of beloved Catholic prayers for daily prayer, reflection, meals, and the Holy Rosary.",
    };
  }

  if (route.view === "prayer") {
    const prayer = prayers.find((item) => item.id === route.id);
    return prayer
      ? { title: `${prayer.title} | Ora`, description: prayer.intro }
      : { title: "Prayer Not Found | Ora", description: "This prayer is not in the Ora collection." };
  }

  if (route.view === "not-found") {
    return { title: "Page Not Found | Ora", description: "The requested page could not be found." };
  }

  return {
    title: "Ora | Catholic Prayers and the Holy Rosary",
    description: "A quiet, personal companion for the Holy Rosary and beloved Catholic prayers.",
  };
}

function AppLink({ to, navigate, onClick, children, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={routeHref(to)} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved =
      localStorage.getItem("ora-theme") || localStorage.getItem("orate-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ora-theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

function App() {
  const [route, setRoute] = useState(parseRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    const onRouteChange = () => setRoute(parseRoute());
    window.addEventListener("popstate", onRouteChange);
    window.addEventListener("hashchange", onRouteChange);
    return () => {
      window.removeEventListener("popstate", onRouteChange);
      window.removeEventListener("hashchange", onRouteChange);
    };
  }, []);

  useEffect(() => {
    if (route.legacy && window.location.protocol !== "file:") {
      const cleanRoute = { ...route };
      delete cleanRoute.legacy;
      window.history.replaceState(null, "", routePath(cleanRoute));
      setRoute(cleanRoute);
    }
  }, [route]);

  useEffect(() => {
    const { title, description } = getRouteMeta(route);
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    const canonicalUrl = `${siteOrigin}${routePath(route)}`;
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [route]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setMenuOpen(false);
  }, [route.view, route.id]);

  const navigate = (nextRoute) => {
    const path = routePath(nextRoute);
    if (window.location.protocol === "file:") {
      if (window.location.hash !== `#${path}`) window.location.hash = path;
    } else if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
    setRoute(nextRoute);
  };

  return (
    <div className="app-shell">
      <Header
        route={route}
        navigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />
      <main id="main-content">
        {route.view === "home" && <Home navigate={navigate} />}
        {route.view === "prayers" && <PrayerLibrary navigate={navigate} />}
        {route.view === "prayer" && <PrayerReader id={route.id} navigate={navigate} />}
        {route.view === "rosary" && <RosarySetup navigate={navigate} />}
        {route.view === "not-found" && <NotFound navigate={navigate} />}
      </main>
    </div>
  );
}

function Header({ route, navigate, menuOpen, setMenuOpen, theme, setTheme }) {
  const isReading =
    route.view === "prayer" || route.view === "prayers" || route.view === "rosary";

  return (
    <header className={`site-header ${isReading ? "site-header--reading" : ""}`}>
      <AppLink className="brand" to={{ view: "home" }} navigate={navigate} aria-label="Ora home">
        <Cross size={19} weight="bold" aria-hidden="true" />
        <span>Ora</span>
      </AppLink>

      <nav className="desktop-nav" aria-label="Main navigation">
        <AppLink
          className={route.view === "home" ? "nav-link active" : "nav-link"}
          to={{ view: "home" }}
          navigate={navigate}
          aria-current={route.view === "home" ? "page" : undefined}
        >
          Home
        </AppLink>
        <AppLink
          className={route.view === "rosary" ? "nav-link active" : "nav-link"}
          to={{ view: "rosary" }}
          navigate={navigate}
          aria-current={route.view === "rosary" ? "page" : undefined}
        >
          The Rosary
        </AppLink>
        <AppLink
          className={route.view === "prayer" || route.view === "prayers" ? "nav-link active" : "nav-link"}
          to={{ view: "prayers" }}
          navigate={navigate}
          aria-current={route.view === "prayer" || route.view === "prayers" ? "page" : undefined}
        >
          Prayers
        </AppLink>
      </nav>

      <div className="header-actions">
        <button
          className="icon-button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          className="icon-button mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
          <AppLink to={{ view: "home" }} navigate={navigate}>Home</AppLink>
          <AppLink to={{ view: "rosary" }} navigate={navigate}>The Rosary</AppLink>
          <AppLink to={{ view: "prayers" }} navigate={navigate}>All Prayers</AppLink>
          <div className="mobile-prayer-list">
            {prayers.map((prayer) => (
              <AppLink key={prayer.id} to={{ view: "prayer", id: prayer.id }} navigate={navigate}>
                {prayer.shortTitle}
              </AppLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Home({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-image" role="img" aria-label="A wooden rosary beside a worn prayer book" />
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="eyebrow">Ora et Labora</p>
          <h1>A quiet place<br />to pray.</h1>
          <p className="hero-copy">Keep the prayers you return to close at hand, and enter each one without distraction.</p>
          <AppLink
            className="primary-button primary-button--light"
            to={{ view: "rosary" }}
            navigate={navigate}
          >
            <CirclesThreePlus size={20} weight={iconWeight} />
            Pray today&apos;s Rosary
          </AppLink>
        </div>
      </section>

      <section className="library-section" aria-labelledby="library-title">
        <div className="section-heading">
          <h2 id="library-title">Choose a prayer</h2>
          <p>Read at your own pace. There are no timers, streaks, or accounts.</p>
        </div>

        <div className="prayer-grid">
          <AppLink className="rosary-card" to={{ view: "rosary" }} navigate={navigate}>
            <div className="card-icon"><CirclesThreePlus size={28} weight={iconWeight} /></div>
            <div>
              <span className="card-kicker">Mysteries and order</span>
              <h3>The Holy Rosary</h3>
              <p>All four sets of mysteries, with the prayers arranged in their proper order.</p>
            </div>
            <ArrowRight size={22} className="card-arrow" />
          </AppLink>

          <div className="prayer-list-card">
            {prayers.filter((prayer) => featuredPrayerIds.includes(prayer.id)).map((prayer) => (
              <AppLink
                key={prayer.id}
                className="prayer-row"
                to={{ view: "prayer", id: prayer.id }}
                navigate={navigate}
              >
                <span>
                  <strong>{prayer.shortTitle}</strong>
                  <small>{prayer.subtitle}</small>
                </span>
                <ArrowRight size={19} aria-hidden="true" />
              </AppLink>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <Cross size={16} weight="bold" aria-hidden="true" />
        <span>Ad maiorem Dei gloriam</span>
      </footer>
    </>
  );
}

function PrayerLibrary({ navigate }) {
  return (
    <section className="prayers-page">
      <div className="prayers-page-heading">
        <AppLink className="text-button back-link" to={{ view: "home" }} navigate={navigate}>
          <ArrowLeft size={17} /> Home
        </AppLink>
        <p className="reader-subtitle">Prayer library</p>
        <h1>Prayers to return to</h1>
        <p>Choose a prayer and read it slowly, without timers or distractions.</p>
      </div>

      <div className="all-prayers-grid">
        {prayers.map((prayer) => (
          <AppLink
            key={prayer.id}
            className="prayer-library-card"
            to={{ view: "prayer", id: prayer.id }}
            navigate={navigate}
          >
            <BookOpenText size={22} weight={iconWeight} />
            <span>
              <strong>{prayer.shortTitle}</strong>
              <small>{prayer.subtitle}</small>
            </span>
            <ArrowRight size={18} />
          </AppLink>
        ))}
      </div>
    </section>
  );
}

function PrayerReader({ id, navigate }) {
  const prayer = prayers.find((item) => item.id === id);

  if (!prayer) {
    return (
      <section className="empty-state">
        <BookOpenText size={40} />
        <h1>Prayer not found</h1>
        <p>This prayer is not in the collection.</p>
        <AppLink className="primary-button" to={{ view: "home" }} navigate={navigate}>Return home</AppLink>
      </section>
    );
  }

  const currentIndex = prayers.findIndex((item) => item.id === id);
  const previous = prayers[currentIndex - 1];
  const next = prayers[currentIndex + 1];

  return (
    <article className="reader-page">
      <aside className="reader-index" aria-label="Prayer list">
        <p>Prayer library</p>
        {prayers.map((item) => (
          <AppLink
            key={item.id}
            className={item.id === id ? "active" : ""}
            to={{ view: "prayer", id: item.id }}
            navigate={navigate}
            aria-current={item.id === id ? "page" : undefined}
          >
            {item.shortTitle}
          </AppLink>
        ))}
      </aside>

      <div className="reader-content">
        <AppLink className="text-button back-link" to={{ view: "prayers" }} navigate={navigate}>
          <ArrowLeft size={17} /> All prayers
        </AppLink>
        <p className="reader-subtitle">{prayer.subtitle}</p>
        <h1>{prayer.title}</h1>
        <p className="reader-intro">{prayer.intro}</p>
        <div className="prayer-rule" aria-hidden="true"><Cross size={17} weight="bold" /></div>
        <div className="prayer-text">
          {prayer.text.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {prayer.note && <p className="prayer-note">{prayer.note}</p>}

        <div className="reader-pagination">
          {previous ? (
            <AppLink
              aria-label={`Previous prayer: ${previous.shortTitle}`}
              to={{ view: "prayer", id: previous.id }}
              navigate={navigate}
            >
              <ArrowLeft size={18} />
              <span><small>Previous</small>{previous.shortTitle}</span>
            </AppLink>
          ) : <span />}
          {next && (
            <AppLink
              className="next"
              aria-label={`Next prayer: ${next.shortTitle}`}
              to={{ view: "prayer", id: next.id }}
              navigate={navigate}
            >
              <span><small>Next</small>{next.shortTitle}</span>
              <ArrowRight size={18} />
            </AppLink>
          )}
        </div>
      </div>
    </article>
  );
}

function RosarySetup({ navigate }) {
  const suggested = getSuggestedMystery();
  const [selected, setSelected] = useState(suggested);
  const mystery = mysteries[selected];

  return (
    <section className="rosary-setup">
      <div className="rosary-intro">
        <AppLink className="text-button back-link" to={{ view: "home" }} navigate={navigate}>
          <ArrowLeft size={17} /> Home
        </AppLink>
        <p className="reader-subtitle">The Holy Rosary</p>
        <h1>Choose the mysteries</h1>
        <p>Meditate on the life of Christ while moving through the familiar rhythm of the prayers.</p>
      </div>

      <section className="rosary-order" aria-labelledby="rosary-order-title">
        <div className="rosary-order-heading">
          <p className="reader-subtitle">How to pray</p>
          <h2 id="rosary-order-title">The order of the Rosary</h2>
          <p>Use this simple sequence as a reference while you pray.</p>
        </div>

        <div className="order-groups">
          <div className="order-group">
            <span className="order-number">1</span>
            <div>
              <h3>Opening prayers</h3>
              <ol>
                <li>Sign of the Cross</li>
                <li>Apostles&apos; Creed</li>
                <li><PrayerOrderLink id="our-father" navigate={navigate}>Our Father</PrayerOrderLink></li>
                <li><PrayerOrderLink id="hail-mary" navigate={navigate}>Three Hail Marys</PrayerOrderLink></li>
                <li><PrayerOrderLink id="glory-be" navigate={navigate}>Glory Be</PrayerOrderLink></li>
              </ol>
            </div>
          </div>

          <div className="order-group">
            <span className="order-number">2</span>
            <div>
              <h3>Each of the five decades</h3>
              <ol>
                <li>Announce and meditate on the mystery</li>
                <li><PrayerOrderLink id="our-father" navigate={navigate}>Our Father</PrayerOrderLink></li>
                <li><PrayerOrderLink id="hail-mary" navigate={navigate}>Ten Hail Marys</PrayerOrderLink></li>
                <li><PrayerOrderLink id="glory-be" navigate={navigate}>Glory Be</PrayerOrderLink></li>
                <li>Fatima Prayer (optional)</li>
              </ol>
            </div>
          </div>

          <div className="order-group">
            <span className="order-number">3</span>
            <div>
              <h3>Closing prayers</h3>
              <ol>
                <li><PrayerOrderLink id="hail-holy-queen" navigate={navigate}>Hail, Holy Queen</PrayerOrderLink></li>
                <li>Rosary Closing Prayer</li>
                <li>Sign of the Cross</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div className="mystery-selector" role="tablist" aria-label="Mystery groups">
        {Object.entries(mysteries).map(([key, item]) => (
          <button
            key={key}
            role="tab"
            aria-selected={selected === key}
            className={selected === key ? "active" : ""}
            onClick={() => setSelected(key)}
          >
            <span>{item.name.replace(" Mysteries", "")}</span>
            <small>{item.days}</small>
          </button>
        ))}
      </div>

      <div className="mystery-detail">
        <div className="mystery-detail-heading">
          <div>
            <span className="today-label">{selected === suggested ? "Suggested for today" : mystery.days}</span>
            <h2>{mystery.name}</h2>
            <p>{mystery.theme}</p>
          </div>
        </div>

        <ol className="mystery-list">
          {mystery.items.map((item, index) => (
            <li key={item.title}>
              <div className="mystery-artwork">
                <img
                  src={item.image}
                  alt=""
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mystery-copy">
                <span className="mystery-number">{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.meditation}</p>
                <span className="mystery-meta">{item.scripture} <i>Fruit: {item.fruit}</i></span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PrayerOrderLink({ id, navigate, children }) {
  return (
    <AppLink to={{ view: "prayer", id }} navigate={navigate}>
      {children}<ArrowRight size={13} />
    </AppLink>
  );
}

function NotFound({ navigate }) {
  return (
    <section className="empty-state">
      <BookOpenText size={40} />
      <h1>Page not found</h1>
      <p>The page you requested is not part of this prayer collection.</p>
      <AppLink className="primary-button" to={{ view: "home" }} navigate={navigate}>Return home</AppLink>
    </section>
  );
}

export default App;
