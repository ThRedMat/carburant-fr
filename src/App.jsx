import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import StationCard from "./components/StationCard";
import CarteStations from "./components/CarteStations";
import dictionnaireStations from "./assets/stations.json";
import "./App.css";

const FUEL_META = {
  gazole: { label: "Gazole", color: "var(--green)" },
  e10: { label: "SP95-E10", color: "var(--blue)" },
  sp95: { label: "SP95", color: "var(--blue)" },
  sp98: { label: "SP98", color: "var(--purple)" },
  e85: { label: "E85", color: "var(--orange)" },
  gplc: { label: "GPLc", color: "var(--text-secondary)" },
};

function getEnseigne(station) {
  const info = dictionnaireStations.find(
    (s) => String(s.id) === String(station.id),
  );
  return info?.marque ?? "Indépendant";
}

function StationDetailPanel({ station, carburant, onClose }) {
  const enseigne = getEnseigne(station);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.geom.lat},${station.geom.lon}`;
  const wazeUrl = `https://waze.com/ul?ll=${station.geom.lat},${station.geom.lon}&navigate=yes`;

  const horaires =
    station.horaires_automate_24_24 === "1"
      ? "Automate 24h/24"
      : station.horaires
        ? "Voir les horaires"
        : "Horaires non renseignés";

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div>
          <h2 className="detail-enseigne">{enseigne}</h2>
          <p className="detail-adresse">
            {station.adresse}, {station.ville} ({station.cp})
          </p>
          <p className="detail-horaires">{horaires}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "12px",
          }}
        >
          <button className="btn-close-panel" onClick={onClose}>
            ✕
          </button>
          <div style={{ display: "flex", gap: "8px" }}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maps"
            >
              Maps
            </a>
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-waze"
            >
              Waze
            </a>
          </div>
        </div>
      </div>
      <div className="detail-prices">
        {Object.entries(FUEL_META).map(([key, meta]) => {
          const prix = station[`${key}_prix`];
          if (!prix) return null;
          const active = carburant === key;
          return (
            <div
              key={key}
              className={`detail-price-row${active ? " detail-price-active" : ""}`}
            >
              <span
                style={{
                  color: active ? "var(--gold)" : meta.color,
                  fontWeight: active ? "600" : "400",
                  fontSize: "0.85rem",
                }}
              >
                {meta.label}
              </span>
              <span
                style={{
                  color: active ? "var(--gold)" : "var(--text-primary)",
                  fontWeight: "700",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: active ? "1.1rem" : "0.95rem",
                }}
              >
                {prix.toFixed(3)} €
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- ICONES ---
const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const LocationIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const FuelIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 22V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
    <path d="M3 22h10" />
    <path d="M13 8h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V6l-3-3" />
    <path d="M5 10h6" />
  </svg>
);
const NavSearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const NavHeartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CARBURANTS = [
  { id: "gazole", label: "Gazole" },
  { id: "e10", label: "SP95" },
  { id: "sp98", label: "SP98" },
  { id: "e85", label: "E85" },
  { id: "gplc", label: "GPLc" },
];

const TRIS = [
  { id: "prix", labelAsc: "Prix ↑", labelDesc: "Prix ↓" },
  { id: "enseigne", labelAsc: "A → Z", labelDesc: "Z → A" },
];

function App() {
  const [stations, setStations] = useState([]);
  const [stationSelectionnee, setStationSelectionnee] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [carburant, setCarburant] = useState("gazole");
  const [tri, setTri] = useState({ critere: "prix", asc: true });
  const [position, setPosition] = useState([44.837789, -0.57918]);
  const [geoActif, setGeoActif] = useState(false);
  const [ongletActif, setOngletActif] = useState("recherche");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "dark",
  );

  // --- NOUVEAUX STATES POUR SUGGESTIONS (BIEN PLACÉS) ---
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [favoris, setFavoris] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favoris") ?? "[]");
    } catch {
      return [];
    }
  });

  const mapRef = useRef(null);

  // --- EFFET POUR LES SUGGESTIONS ---
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (recherche.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(recherche)}&type=municipality&limit=5`;
        const response = await fetch(url);
        const data = await response.json();
        const cityList = data.features.map((f) => ({
          nom: f.properties.city,
          cp: f.properties.postcode,
        }));
        setSuggestions(cityList);
      } catch (err) {
        console.error("Erreur suggestions:", err);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [recherche]);

  // --- EFFET DE MISE A JOUR DES FAVORIS ---
  useEffect(() => {
    if (stations.length === 0) return;
    setFavoris((prevFavoris) => {
      let aChange = false;
      const nouveauxFavoris = prevFavoris.map((fav) => {
        const stationFraiche = stations.find(
          (s) => String(s.id) === String(fav.id),
        );
        if (
          stationFraiche &&
          JSON.stringify(stationFraiche) !== JSON.stringify(fav)
        ) {
          aChange = true;
          return stationFraiche;
        }
        return fav;
      });
      return aChange ? nouveauxFavoris : prevFavoris;
    });
  }, [stations]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("favoris", JSON.stringify(favoris));
  }, [favoris]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const toggleFavori = (station, e) => {
    if (e) e.stopPropagation();
    setFavoris((prev) => {
      const exists = prev.some((f) => String(f.id) === String(station.id));
      return exists
        ? prev.filter((f) => String(f.id) !== String(station.id))
        : [...prev, station];
    });
  };

  const chargerDonnees = useCallback(
    async (saisie) => {
      setChargement(true);
      setErreur(null);
      setOngletActif("recherche");
      const texte = saisie.trim().toUpperCase();
      const estCodePostal = /^\d+$/.test(texte);
      const filtre = estCodePostal
        ? `cp like "${texte}*"`
        : `ville like "${texte}*"`;
      const url = `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=${encodeURIComponent(filtre)}&order_by=${carburant}_prix%20ASC&limit=50`;
      try {
        const rep = await fetch(url);
        const data = await rep.json();
        if (data.results?.length > 0) {
          setStations(data.results);
          setStationSelectionnee(null);
          const lats = data.results.map((s) => s.geom.lat);
          const lons = data.results.map((s) => s.geom.lon);
          setPosition([
            lats.reduce((a, b) => a + b, 0) / lats.length,
            lons.reduce((a, b) => a + b, 0) / lons.length,
          ]);
        } else {
          setStations([]);
          setErreur("Aucune station trouvée.");
        }
      } catch {
        setErreur("Erreur réseau.");
      } finally {
        setChargement(false);
      }
    },
    [carburant],
  );

  const chercherAutourDeMoi = () => {
    if (!navigator.geolocation) return;
    setGeoActif(true);
    setOngletActif("recherche");
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude: lat, longitude: lon } = coords;
      setPosition([lat, lon]);
      const filtre = `within_distance(geom, geom'POINT(${lon} ${lat})', 10km)`;
      const url = `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=${encodeURIComponent(filtre)}&order_by=${carburant}_prix%20ASC&limit=50`;
      try {
        const [repStations, repAddr] = await Promise.all([
          fetch(url),
          fetch(
            `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`,
          ),
        ]);
        const [dataStations, dataAddr] = await Promise.all([
          repStations.json(),
          repAddr.json(),
        ]);
        if (dataStations.results?.length > 0) setStations(dataStations.results);
        if (dataAddr.features?.length > 0)
          setRecherche(dataAddr.features[0].properties.city);
      } catch {
        alert("Erreur de récupération.");
      }
    });
  };

  /*useEffect(() => {
    if (recherche) chargerDonnees(recherche);
  }, [carburant, recherche, chargerDonnees]); */ // Ajout des dépendances pour corriger l'erreur ESLint

  // ✅ À AJOUTER
  useEffect(() => {
    // On ne rafraîchit que si on a déjà des stations à l'écran
    if (stations.length > 0) {
      chargerDonnees(recherche);
    }
  }, [carburant]); // On ne surveille QUE le changement de carburant, pas la saisie

  const gererRecherche = (e) => {
    e.preventDefault();
    setGeoActif(false);
    setShowSuggestions(false);
    if (recherche.trim()) chargerDonnees(recherche);
  };

  const handleSelect = (station) => {
    setStationSelectionnee(station);
    setTimeout(() => {
      if (mapRef.current) {
        const y =
          mapRef.current.getBoundingClientRect().top + window.scrollY - 56;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const stationsTries = useMemo(() => {
    const copy = [...stations];
    const dir = tri.asc ? 1 : -1;
    if (tri.critere === "prix") {
      return copy.sort(
        (a, b) =>
          ((a[`${carburant}_prix`] ?? Infinity) -
            (b[`${carburant}_prix`] ?? Infinity)) *
          dir,
      );
    }
    return copy.sort(
      (a, b) => getEnseigne(a).localeCompare(getEnseigne(b), "fr") * dir,
    );
  }, [stations, tri, carburant]);

  return (
    <div className="app-root">
      <div className="topbar">
        <div className="topbar-logo">
          <div className="logo-icon">
            <FuelIcon />
          </div>
          <span className="logo-name">CarburantFR</span>
        </div>
        <form
          className="topbar-search"
          onSubmit={gererRecherche}
          style={{ position: "relative" }}
        >
          <div className="search-input-wrap">
            <span className="search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={recherche}
              onChange={(e) => {
                setRecherche(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Ville ou code postal..."
              className="search-input"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setRecherche(s.nom);
                      setShowSuggestions(false);
                      chargerDonnees(s.nom);
                    }}
                  >
                    <strong>{s.nom}</strong> <span>{s.cp}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            className="btn-geo"
            onClick={chercherAutourDeMoi}
          >
            <LocationIcon />
            <span>Autour de moi</span>
          </button>
          <button type="submit" className="btn-search" disabled={chargement}>
            {chargement ? "…" : "Chercher"}
          </button>
        </form>
        <div className="topbar-filters">
          <span className="filters-label">FILTRES</span>
          {CARBURANTS.map((c) => (
            <button
              key={c.id}
              className={`chip${carburant === c.id ? " chip-active" : ""}`}
              onClick={() => setCarburant(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div
          className="topbar-filters"
          style={{ borderLeft: "1px solid var(--border)", paddingLeft: "12px" }}
        >
          <span className="filters-label">TRI</span>
          {TRIS.map((t) => (
            <button
              key={t.id}
              className={`chip${tri.critere === t.id ? " chip-active" : ""}`}
              onClick={() =>
                setTri((p) =>
                  p.critere === t.id
                    ? { ...p, asc: !p.asc }
                    : { critere: t.id, asc: true },
                )
              }
            >
              {tri.critere === t.id
                ? tri.asc
                  ? t.labelAsc
                  : t.labelDesc
                : t.labelAsc}
            </button>
          ))}
        </div>
        <button className="btn-theme" onClick={toggleTheme}>
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <main className="main-content" style={{ paddingBottom: "80px" }}>
        {erreur && <div className="error-banner">{erreur}</div>}
        {stationSelectionnee && (
          <StationDetailPanel
            station={stationSelectionnee}
            carburant={carburant}
            onClose={() => setStationSelectionnee(null)}
          />
        )}

        {ongletActif === "recherche" && (
          <>
            {stations.length > 0 && (
              <div className="map-section" ref={mapRef}>
                <CarteStations
                  stations={stations}
                  centre={position}
                  carburantSelectionne={carburant}
                  theme={theme}
                  geoActif={geoActif}
                  stationSelectionnee={stationSelectionnee}
                  onStationClick={handleSelect}
                />
              </div>
            )}
            <div className="cards-grid">
              {stationsTries.length > 0
                ? stationsTries.map((s, i) => (
                    <StationCard
                      key={s.id}
                      station={s}
                      isCheapest={tri.critere === "prix" && tri.asc && i === 0}
                      typeSelectionne={carburant}
                      isSelected={stationSelectionnee?.id === s.id}
                      isFavori={favoris.some(
                        (f) => String(f.id) === String(s.id),
                      )}
                      onSelect={() => handleSelect(s)}
                      onToggleFavori={(e) => toggleFavori(s, e)}
                    />
                  ))
                : !erreur && (
                    <div className="empty-state">
                      Entrez une ville ou un code postal.
                    </div>
                  )}
            </div>
          </>
        )}

        {ongletActif === "favoris" && (
          <div className="favoris-view">
            <h2 style={{ color: "var(--text-primary)", marginBottom: "20px" }}>
              Mes Stations Favorites
            </h2>
            {favoris.length === 0 ? (
              <div className="empty-state">Aucun favori pour le moment.</div>
            ) : (
              <div className="cards-grid">
                {favoris.map((s) => (
                  <StationCard
                    key={`fav-${s.id}`}
                    station={s}
                    typeSelectionne={carburant}
                    isSelected={stationSelectionnee?.id === s.id}
                    isFavori={true}
                    onSelect={() => handleSelect(s)}
                    onToggleFavori={(e) => toggleFavori(s, e)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="bottom-nav">
        <button
          className={`nav-item ${ongletActif === "recherche" ? "active" : ""}`}
          onClick={() => {
            setOngletActif("recherche");
            setStationSelectionnee(null);
          }}
        >
          <NavSearchIcon />
          <span>Recherche</span>
        </button>
        <button
          className={`nav-item ${ongletActif === "favoris" ? "active" : ""}`}
          onClick={() => {
            setOngletActif("favoris");
            setStationSelectionnee(null);
          }}
        >
          <div style={{ position: "relative" }}>
            <NavHeartIcon />
            {favoris.length > 0 && (
              <span className="nav-badge">{favoris.length}</span>
            )}
          </div>
          <span>Favoris</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
