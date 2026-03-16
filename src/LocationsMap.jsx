import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import photos from "./photos";

export default function LocationsMap() {
  const [lines, setLines] = useState([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const animationRef = useRef(null); 

  const photosWithCoords = photos
    .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
    .sort((a, b) => a.year - b.year);

  const groupedPhotos = React.useMemo(() => {
    const map = new Map();
    photosWithCoords.forEach((photo) => {
      const key = `${photo.lat},${photo.lng}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(photo);
    });
    return Array.from(map.values());
  }, [photosWithCoords]);

  const createCurve = (start, end, steps = 50) => {
    const latlngs = [];
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2 + 5;
    for (let t = 0; t <= 1; t += 1 / steps) {
      const lat =
        (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * midLat + t * t * end[0];
      const lng =
        (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * midLng + t * t * end[1];
      latlngs.push([lat, lng]);
    }
    return latlngs;
  };

  const startAnimation = () => {
    if (groupedPhotos.length < 2) return;

    setLines([]);
    setCurrentGroupIndex(0);

    let lineSegments = [];
    let groupIndex = 0;
    let step = 0;
    let curve = [];

    animationRef.current = setInterval(() => {
      if (groupIndex >= groupedPhotos.length - 1) {
        clearInterval(animationRef.current);
        return;
      }

      if (step === 0) {
        const start = [
          groupedPhotos[groupIndex][0].lat,
          groupedPhotos[groupIndex][0].lng,
        ];
        const end = [
          groupedPhotos[groupIndex + 1][0].lat,
          groupedPhotos[groupIndex + 1][0].lng,
        ];
        curve = createCurve(start, end, 50);
      }

      lineSegments[groupIndex] = curve.slice(0, step + 1);
      setLines([...lineSegments]);

      step++;

      if (step >= curve.length) {
        setCurrentGroupIndex(groupIndex + 1);
        groupIndex++;
        step = 0;
        curve = [];
      }
    }, 15);
  };

  useEffect(() => {
    startAnimation();
    return () => clearInterval(animationRef.current);
  }, []);

  const handleReplay = () => {
    clearInterval(animationRef.current);
    startAnimation();
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex justify-center p-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleReplay}
        >
          Replay
        </button>
      </div>

      <div className="flex-1">
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

          {/* Lines */}
          {lines.map(
            (segment, i) =>
              segment && segment.length > 1 && (
                <Polyline
                  key={`line-${i}`}
                  positions={segment}
                  pathOptions={{ color: "white", weight: 2, opacity: 0.8 }}
                />
              )
          )}

          {groupedPhotos
            .slice(0, currentGroupIndex + 1)
            .map((group, i) => (
              <Marker
                key={`pin-${i}`}
                position={[group[0].lat, group[0].lng]}
              />
            ))}
        </MapContainer>
      </div>
    </div>
  );
}