import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import photos from "./photos";

export default function LocationsMap() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [lines, setLines] = React.useState([]); 

  const photosWithCoords = photos
    .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
    .sort((a, b) => a.year - b.year);

  const createThumbnailIcon = (photo) =>
    new L.DivIcon({
      className: "photo-marker",
      html: `
        <div style="
          width:70px;
          background:white;
          padding:4px;
          border-radius:6px;
          box-shadow:0 4px 10px rgba(0,0,0,0.4);
        ">
          <img src="${photo.src}" style="
            width:100%;
            height:50px;
            object-fit:cover;
            border-radius:3px;
          "/>
        </div>
      `,
      iconSize: [70, 70],
      iconAnchor: [35, 70],
    });

  const createCurve = (start, end) => {
    const latlngs = [];
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2 + 5; 
    const steps = 50;
    for (let t = 0; t <= 1; t += 1 / steps) {
      const lat =
        (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * midLat + t * t * end[0];
      const lng =
        (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * midLng + t * t * end[1];
      latlngs.push([lat, lng]);
    }
    return latlngs;
  };

  React.useEffect(() => {
    if (photosWithCoords.length < 2) return;

    let index = 0;

    const interval = setInterval(() => {
      if (index >= photosWithCoords.length - 1) {
        clearInterval(interval);
        return;
      }

      const start = [photosWithCoords[index].lat, photosWithCoords[index].lng];
      const end = [photosWithCoords[index + 1].lat, photosWithCoords[index + 1].lng];
      const curve = createCurve(start, end);

      let step = 1;
      const lineInterval = setInterval(() => {
        setLines((prev) => {
          const newLines = [...prev];
          if (!newLines[index]) newLines[index] = [];
          newLines[index] = curve.slice(0, step + 1); 
          return newLines;
        });
        step++;
        if (step >= curve.length) clearInterval(lineInterval);
      }, 15);

      index++;
      setCurrentIndex(index);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const visiblePhotos = photosWithCoords.slice(0, currentIndex + 1);
  const currentPhoto = visiblePhotos[currentIndex] || photosWithCoords[0];
  const currentYear = currentPhoto?.year || new Date().getFullYear();
  const currentCountry = currentPhoto?.country || "Unknown";

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-screen h-[600px] relative">
        <MapContainer
          bounds={L.latLngBounds(photosWithCoords.map((p) => [p.lat, p.lng]))}
          className="w-full h-full"
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

          {visiblePhotos.map((photo, i) => (
            <Marker
              key={photo.id}
              position={[photo.lat, photo.lng]}
              icon={createThumbnailIcon(photo)}
            >
              <Tooltip direction="top" offset={[0, -10]}>
                {photo.desc}
              </Tooltip>
              {i === currentIndex && (
                <Popup closeButton={false} autoClose={false}>
                  <div className="text-xl font-bold">{photo.year}</div>
                </Popup>
              )}
            </Marker>
          ))}

          {lines.map(
            (segment, i) =>
              segment && segment.length > 1 && (
                <Polyline
                  key={i}
                  positions={segment}
                  pathOptions={{
                    color: "white",
                    weight: 2,
                    opacity: 0.8,
                  }}
                />
              )
          )}

          <Marker
            position={[72, -40]} 
            icon={new L.DivIcon({
              className: "map-heading",
              html: `<div style="
                color:white;
                font-size:14px;
                text-align:center;
                text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
                padding:4px 12px;
              ">
                ${currentYear}  ${currentCountry}
              </div>`,
              iconAnchor: [0, 0],
            })}
          />
        </MapContainer>
      </div>
    </section>
  );
}