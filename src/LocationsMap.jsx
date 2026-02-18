import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import photos from "./photos";

const markerIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div class="w-2 h-2 rounded-full bg-white"></div>`,
  iconSize: [8, 8],
});

function LocationsMap() {
  const locations = [
    ...new Map(
      photos
        .filter(
          (p) =>
            typeof p.lat === "number" &&
            typeof p.lng === "number"
        )
        .map((p) => [p.location, p])
    ).values(),
  ];

  return (
    <section
      id="locations"
      data-title="Locations"
      className="min-h-screen flex flex-col justify-center px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="w-full h-[500px]">
          <MapContainer
            center={[52.1326, 5.2913]} 
            zoom={7}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution=""
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {locations.map((photo) => (
              <Marker
                key={photo.location}
                position={[photo.lat, photo.lng]}
                icon={markerIcon}
              >
                <Popup>
                  <div className="text-xs tracking-wider">
                    {photo.location}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

export default LocationsMap;
