import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

// Fix Leaflet default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Search control component
function SearchControl({ map, onChange }) {
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar", // ensures full-width search bar
      showMarker: false,
      autoClose: true,
      retainZoomLevel: false,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x: lng, y: lat } = result.location;
      const newLatLng = { lat, lng };
      map.setView(newLatLng, 15);
      onChange(newLatLng);
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onChange]);

  return null;
}

// Marker for click location
function LocationMarker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

export default function MapSelector({ value, onChange }) {
  const [map, setMap] = useState(null);

  return (
    <div
      style={{
        height: "400px",
        width: "100%",
        position: "relative",
      }}
    >
      <MapContainer
        center={[34.083656, 74.797371]} // Srinagar default
        zoom={13}
        whenCreated={setMap}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {map && <SearchControl map={map} onChange={onChange} />}
        <LocationMarker onSelect={onChange} />
        {value && <Marker position={value} />}
      </MapContainer>

      {/* Manual override to ensure visibility */}
      <style>
        {`
          .leaflet-control-geosearch {
            z-index: 1000 !important;
            position: absolute !important;
            top: 10px;
            left: 10px;
            width: 300px;
          }
        `}
      </style>
    </div>
  );
}
