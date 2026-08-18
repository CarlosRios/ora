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

function parseRoute() {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts[0] === "prayer" && parts[1]) return { view: "prayer", id: parts[1] };
  if (parts[0] === "prayers") return { view: "prayers" };
  if (parts[0] === "rosary") return { view: "rosary" };
  return { view: "home" };
}

function routeHash(route) {
  if (route.view === "prayer") return `#/prayer/${route.id}`;
  if (route.view === "prayers") return "#/prayers";
  if (route.view === "rosary") return "#/rosary";
  return "#/";
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
    window.addEventListener("hashchange", onRouteChange);
    return () => window.removeEventListener("hashchange", onRouteChange);
  }, []);

  useEffect(() => {
    if (window.location.hash.startsWith("#/rosary/guide")) {
      window.history.replaceState(null, "", "#/rosary");
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setMenuOpen(false);
  }, [route.view, route.id]);

  const navigate = (nextRoute) => {
    const hash = routeHash(nextRoute);
    if (window.location.hash === hash) setRoute(nextRoute);
    else window.location.hash = hash;
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
      </main>
    </div>
  );
}

function Header({ route, navigate, menuOpen, setMenuOpen, theme, setTheme }) {
  const isReading =
    route.view === "prayer" || route.view === "prayers" || route.view === "rosary";

  return (
    <header className={`site-header ${isReading ? "site-header--reading" : ""}`}>
      <button className="brand" onClick={() => navigate({ view: "home" })} aria-label="Ora home">
        <Cross size={19} weight="bold" aria-hidden="true" />
        <span>Ora</span>
      </button>

      <nav className="desktop-nav" aria-label="Main navigation">
        <button
          className={route.view === "home" ? "nav-link active" : "nav-link"}
          onClick={() => navigate({ view: "home" })}
        >
          Home
        </button>
        <button
          className={route.view === "rosary" ? "nav-link active" : "nav-link"}
          onClick={() => navigate({ view: "rosary" })}
        >
          The Rosary
        </button>
        <button
          className={route.view === "prayer" || route.view === "prayers" ? "nav-link active" : "nav-link"}
          onClick={() => navigate({ view: "prayers" })}
        >
          Prayers
        </button>
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
          <button onClick={() => navigate({ view: "home" })}>Home</button>
          <button onClick={() => navigate({ view: "rosary" })}>The Rosary</button>
          <button onClick={() => navigate({ view: "prayers" })}>All Prayers</button>
          <div className="mobile-prayer-list">
            {prayers.map((prayer) => (
              <button key={prayer.id} onClick={() => navigate({ view: "prayer", id: prayer.id })}>
                {prayer.shortTitle}
              </button>
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
          <button
            className="primary-button primary-button--light"
            onClick={() => navigate({ view: "rosary" })}
          >
            <CirclesThreePlus size={20} weight={iconWeight} />
            Pray today&apos;s Rosary
          </button>
        </div>
      </section>

      <section className="library-section" aria-labelledby="library-title">
        <div className="section-heading">
          <h2 id="library-title">Choose a prayer</h2>
          <p>Read at your own pace. There are no timers, streaks, or accounts.</p>
        </div>

        <div className="prayer-grid">
          <button className="rosary-card" onClick={() => navigate({ view: "rosary" })}>
            <div className="card-icon"><CirclesThreePlus size={28} weight={iconWeight} /></div>
            <div>
              <span className="card-kicker">Mysteries and order</span>
              <h3>The Holy Rosary</h3>
              <p>All four sets of mysteries, with the prayers arranged in their proper order.</p>
            </div>
            <ArrowRight size={22} className="card-arrow" />
          </button>

          <div className="prayer-list-card">
            {prayers.filter((prayer) => featuredPrayerIds.includes(prayer.id)).map((prayer) => (
              <button
                key={prayer.id}
                className="prayer-row"
                onClick={() => navigate({ view: "prayer", id: prayer.id })}
              >
                <span>
                  <strong>{prayer.shortTitle}</strong>
                  <small>{prayer.subtitle}</small>
                </span>
                <ArrowRight size={19} aria-hidden="true" />
              </button>
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
        <button className="text-button back-link" onClick={() => navigate({ view: "home" })}>
          <ArrowLeft size={17} /> Home
        </button>
        <p className="reader-subtitle">Prayer library</p>
        <h1>Prayers to return to</h1>
        <p>Choose a prayer and read it slowly, without timers or distractions.</p>
      </div>

      <div className="all-prayers-grid">
        {prayers.map((prayer) => (
          <button
            key={prayer.id}
            className="prayer-library-card"
            onClick={() => navigate({ view: "prayer", id: prayer.id })}
          >
            <BookOpenText size={22} weight={iconWeight} />
            <span>
              <strong>{prayer.shortTitle}</strong>
              <small>{prayer.subtitle}</small>
            </span>
            <ArrowRight size={18} />
          </button>
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
        <button className="primary-button" onClick={() => navigate({ view: "home" })}>Return home</button>
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
          <button
            key={item.id}
            className={item.id === id ? "active" : ""}
            onClick={() => navigate({ view: "prayer", id: item.id })}
          >
            {item.shortTitle}
          </button>
        ))}
      </aside>

      <div className="reader-content">
        <button className="text-button back-link" onClick={() => navigate({ view: "prayers" })}>
          <ArrowLeft size={17} /> All prayers
        </button>
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
            <button
              aria-label={`Previous prayer: ${previous.shortTitle}`}
              onClick={() => navigate({ view: "prayer", id: previous.id })}
            >
              <ArrowLeft size={18} />
              <span><small>Previous</small>{previous.shortTitle}</span>
            </button>
          ) : <span />}
          {next && (
            <button
              className="next"
              aria-label={`Next prayer: ${next.shortTitle}`}
              onClick={() => navigate({ view: "prayer", id: next.id })}
            >
              <span><small>Next</small>{next.shortTitle}</span>
              <ArrowRight size={18} />
            </button>
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
        <button className="text-button back-link" onClick={() => navigate({ view: "home" })}>
          <ArrowLeft size={17} /> Home
        </button>
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
    <button onClick={() => navigate({ view: "prayer", id })}>
      {children}<ArrowRight size={13} />
    </button>
  );
}

export default App;
