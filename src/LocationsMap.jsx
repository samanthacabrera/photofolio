import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import photos from "./photos";

export default function LocationsMap() {
  const mapRef = React.useRef(null);

  const photosWithCoords = photos.filter(
    (p) => typeof p.lat === "number" && typeof p.lng === "number"
  );

  const createThumbnailIcon = (photo) =>
    new L.DivIcon({
      className: "custom-marker",
      html: `<div style="
        width: 36px;
        height: 36px;
        border-radius: 4px;
        overflow: hidden;
      ">
        <img src="${photo.src}" alt="${photo.desc}" style="
          width: 100%;
          height: 100%;
          object-fit: cover;
        "/>
      </div>`,
      iconSize: [36, 36],
    });

  return (
    <section id="map" data-title="Map" className="flex justify-center items-end w-full min-h-screen relative">
      <div className="w-full max-w-4xl h-[500px] relative z-0">
        <MapContainer
          center={[52, 10]} 
          zoom={3}
          scrollWheelZoom={true}
          className="w-full h-full"
          style={{ backgroundColor: "transparent" }}
          zoomControl={false}
          dragging={true}
          attributionControl={false}
          whenCreated={(map) => (mapRef.current = map)}
        >
          <TileLayer
            attribution=""
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {photosWithCoords.map((photo) => (
            <Marker
              key={photo.id}
              position={[photo.lat, photo.lng]}
              icon={createThumbnailIcon(photo)}
            >
              <Tooltip
                direction="top"
                offset={[0, -5]}
                opacity={0.9}
                className=""
              >
                {photo.desc} {photo.year}
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
