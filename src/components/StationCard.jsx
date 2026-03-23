import dictionnaireStations from "../assets/stations.json";

/* ─── NOUVEAU : Icônes SVG pour le cœur et l'alerte ─── */

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const HeartFilledIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="#e74c3c"
    stroke="#e74c3c"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const LOGOS = {
  Total: "/images/total.png",
  TotalEnergies: "/images/totalenergies.png",
  "TotalEnergies Access": "/images/totalaccess.jpg",
  "TotalEnergies Relais": "/images/totalenergies.png",
  Intermarché: "/images/intermarche.png",
  Leclerc: "/images/leclerc.png",
  Carrefour: "/images/carrefour.png",
  "Carrefour Market": "/images/carrefour-market.png",
  "Carrefour Contact": "/images/carrefour-contact.png",
  Auchan: "/images/auchan.jpg",
  Esso: "/images/esso.png",
  "Esso Express": "/images/esso.png",
  Shell: "/images/shell.png",
  BP: "/images/bp.png",
  "Système U": "/images/systeme-u.svg",
  "Super U": "/images/systeme-u.svg",
  "Hyper U": "/images/systeme-u.svg",
  "U Express": "/images/systeme-u.svg",
  Casino: "/images/casino.png",
  "Géant Casino": "/images/geant-casino.png",
  Aldi: "/images/aldi.png",
  Netto: "/images/netto.png",
  Cora: "/images/cora.svg",
  Vito: "/images/vito.png",
  Dyneff: "/images/dyneff.png",
  Avia: "/images/avia.png",
  Indépendant: "/images/independant.png",
  Simply: "/images/simply.png",
};

function getLogoUrl(enseigne) {
  if (!enseigne) return null;
  if (LOGOS[enseigne] !== undefined) return LOGOS[enseigne];
  for (const [key, url] of Object.entries(LOGOS)) {
    if (enseigne.toLowerCase().includes(key.toLowerCase())) return url;
  }
  return null;
}

function getInitiales(enseigne) {
  if (!enseigne) return "?";
  const mots = enseigne.trim().split(/\s+/);
  if (mots.length === 1) return mots[0].slice(0, 2).toUpperCase();
  return (mots[0][0] + mots[1][0]).toUpperCase();
}

const FUEL_META = {
  gazole: { label: "Gazole", color: "var(--green)" },
  e10: { label: "SP95-E10", color: "var(--blue)" },
  sp95: { label: "SP95", color: "var(--blue)" },
  sp98: { label: "SP98", color: "var(--purple)" },
  e85: { label: "E85", color: "var(--orange)" },
  gplc: { label: "GPLc", color: "var(--text-secondary)" },
};

// NOUVELLE FONCTION DE DATE AVEC DETECTION D'OBSOLESCENCE
function getUpdateInfo(station) {
  const dates = [
    station.gazole_maj,
    station.e10_maj,
    station.sp98_maj,
    station.sp95_maj,
    station.e85_maj,
    station.gplc_maj,
  ].filter(Boolean);

  if (!dates.length) return { text: "—", isObsolete: false };

  const latestDate = new Date(dates.sort().at(-1));
  const text = latestDate.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const hoursDiff = (new Date() - latestDate) / (1000 * 60 * 60);
  return { text, isObsolete: hoursDiff > 48 };
}

function EnseigneLogo({ enseigne }) {
  const logoUrl = getLogoUrl(enseigne);
  const initiales = getInitiales(enseigne);

  if (logoUrl) {
    return (
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          overflow: "hidden",
          background: "var(--bg-surface-alt)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <img
          src={logoUrl}
          alt={enseigne}
          style={{ width: "28px", height: "28px", objectFit: "contain" }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML = `<span style="font-size:0.75rem;font-weight:700;color:var(--text-secondary)">${initiales}</span>`;
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        background: "var(--bg-surface-alt)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: "0.75rem",
        fontWeight: "700",
        color: "var(--text-secondary)",
      }}
    >
      {initiales}
    </div>
  );
}

function StationCard({
  station,
  isCheapest,
  typeSelectionne,
  isSelected,
  isFavori,
  onSelect,
  onToggleFavori,
}) {
  const info = dictionnaireStations.find(
    (s) => String(s.id) === String(station.id),
  );
  const enseigne = info?.marque ?? "Indépendant";
  const updateInfo = getUpdateInfo(station);

  const getBorder = () => {
    if (isSelected) return "2px solid var(--accent)";
    if (isCheapest) return "1.5px solid var(--gold-border)";
    return "1px solid var(--border)";
  };

  const getShadow = () => {
    if (isSelected) return "0 0 0 3px var(--accent-dim), var(--shadow-lg)";
    if (isCheapest) return "var(--shadow-gold)";
    return "var(--shadow-sm)";
  };

  return (
    <div
      className="station-card"
      onClick={onSelect}
      style={{
        border: getBorder(),
        boxShadow: getShadow(),
        transform: isSelected ? "translateY(-3px)" : "translateY(0)",
        transition:
          "box-shadow 0.22s ease, transform 0.22s ease, border 0.22s ease",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {isSelected && (
        <span
          style={{
            position: "absolute",
            top: "-1px",
            left: "14px",
            background: "var(--accent)",
            color: "#fff",
            padding: "3px 10px",
            borderRadius: "0 0 8px 8px",
            fontSize: "0.6rem",
            fontWeight: "700",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            zIndex: 2,
          }}
        >
          Sélectionnée
        </span>
      )}
      {isCheapest && (
        <span className="badge-cheapest" style={{ zIndex: 1 }}>
          Moins cher
        </span>
      )}

      <div className="card-header">
        <EnseigneLogo enseigne={enseigne} />
        <div className="card-header-text">
          <h2 className="card-enseigne">{enseigne}</h2>
          <p className="card-adresse">{station.adresse}</p>
          <p className="card-ville">
            {station.ville} · {station.cp}
          </p>
        </div>
        <button
          className={`btn-favori${isFavori ? " btn-favori-active" : ""}`}
          onClick={onToggleFavori}
          title={isFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
          style={{
            color: isFavori ? "#e74c3c" : "var(--text-secondary)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition:
              "color 0.2s ease, transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {isFavori ? <HeartFilledIcon /> : <HeartIcon />}
        </button>
      </div>

      <div className="card-prices">
        {Object.entries(FUEL_META).map(([key, meta]) => {
          const prix = station[`${key}_prix`];
          if (!prix) return null;
          const active = typeSelectionne === key;
          return (
            <div
              key={key}
              className={`fuel-row${active ? " fuel-row-active" : ""}`}
            >
              <span
                className="fuel-label"
                style={{ color: active ? "var(--gold)" : meta.color }}
              >
                {meta.label}
              </span>
              <span
                className="fuel-price"
                style={{
                  color: active ? "var(--gold)" : "var(--text-primary)",
                  fontSize: active ? "1.1rem" : "0.95rem",
                }}
              >
                {prix.toFixed(3)} €
              </span>
            </div>
          );
        })}
      </div>

      {/* FOOTER AVEC ALERTE OBSOLESCENCE */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          paddingTop: "8px",
        }}
      >
        {updateInfo.isObsolete ? (
          <span
            style={{
              fontSize: "0.65rem",
              color: "#e74c3c",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: "700",
              backgroundColor: "rgba(231, 76, 60, 0.1)",
              padding: "3px 6px",
              borderRadius: "4px",
            }}
          >
            <AlertIcon />
            {">"} 48h
          </span>
        ) : (
          <span />
        )}
        <p className="card-date" style={{ margin: 0 }}>
          Màj {updateInfo.text}
        </p>
      </div>
    </div>
  );
}

export default StationCard;
