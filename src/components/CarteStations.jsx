import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const BlueIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [22, 36],
  iconAnchor: [11, 36],
  popupAnchor: [0, -36],
});

const OrangeIcon = L.divIcon({
  className: "",
  html: `<div style="
    width: 28px; height: 28px;
    background: #E8500A;
    border: 3px solid #fff;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 2px 8px rgba(232,80,10,0.5);
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
});

/* Zoom initial sur toutes les stations */
function AutoZoom({ stations, centre }) {
  const map = useMap();
  useEffect(() => {
    if (stations?.length > 0) {
      const bounds = L.latLngBounds(
        stations.map((s) => [s.geom.lat, s.geom.lon]),
      );
      map.fitBounds(bounds, { padding: [40, 40] });
    } else if (centre) {
      map.setView(centre, 13);
    }
  }, [stations, centre, map]);
  return null;
}

/* Zoom sur station sélectionnée, ou reset sur toutes les stations */
function ZoomStation({ station, stations }) {
  const map = useMap();
  useEffect(() => {
    if (station?.geom) {
      // Station sélectionnée → zoom dessus
      map.flyTo([station.geom.lat, station.geom.lon], 16, { duration: 0.8 });
    } else if (stations?.length > 0) {
      // Panel fermé → revenir sur toutes les stations
      const bounds = L.latLngBounds(
        stations.map((s) => [s.geom.lat, s.geom.lon]),
      );
      map.flyToBounds(bounds, { padding: [40, 40], duration: 0.8 });
    }
  }, [station, map]);
  return null;
}

function CarteStations({
  stations,
  centre,
  carburantSelectionne,
  geoActif,
  stationSelectionnee,
  onStationClick,
}) {
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileAttr =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div
      style={{
        height: "380px",
        width: "100%",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        marginBottom: "28px",
        border: "1px solid var(--border-strong)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <MapContainer
        key={`${centre[0]}-${centre[1]}`}
        center={centre}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={tileUrl} attribution={tileAttr} />
        <AutoZoom stations={stations} centre={centre} />
        <ZoomStation station={stationSelectionnee} stations={stations} />

        {geoActif && centre && (
          <Circle
            center={centre}
            radius={600}
            pathOptions={{
              color: "#E8500A",
              fillColor: "#E8500A",
              fillOpacity: 0.12,
              weight: 2,
            }}
          >
            <Popup>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.85rem",
                }}
              >
                <strong>Zone de recherche</strong>
              </div>
            </Popup>
          </Circle>
        )}

        {(stations ?? []).map((station) => (
          <Marker
            key={station.id}
            position={[station.geom.lat, station.geom.lon]}
            icon={
              stationSelectionnee?.id === station.id ? OrangeIcon : BlueIcon
            }
            eventHandlers={{
              click: (e) => {
                e.target.closePopup(); // ← ferme la popup
                onStationClick(station);
              },
            }}
          >
            <Popup>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.85rem",
                  minWidth: "130px",
                }}
              >
                <strong style={{ display: "block", marginBottom: "4px" }}>
                  {station.adresse}
                </strong>
                <span style={{ color: "#E8500A", fontWeight: "700" }}>
                  {carburantSelectionne.toUpperCase()} :{" "}
                  {station[`${carburantSelectionne}_prix`]?.toFixed(3)} €
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default CarteStations;
