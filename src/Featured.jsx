import { useNavigate } from "react-router-dom";
import photos from "./photos"; 

function Featured() {
    const navigate = useNavigate();
    const featuredPhotos = photos.filter((photo) => photo.featured);

    return (
    <section className="min-h-screen p-6">
        <button
            className="text-xs uppercase hover:underline hover:-translate-y-1 transition"
            onClick={() => navigate("/photofolio/")}
        >
            Back Home
        </button>
        
        <h1 className="text-5xl md:text-6xl font-light my-24 text-center">Featured Photos</h1>

        <div className="grid grid-cols-1 gap-24 py-24">
            {featuredPhotos.map((photo) => (
            <div
                key={photo.id}
                className="relative rounded-lg shadow-lg group"
            >
                <img
                src={photo.src}
                alt={photo.desc}
                className="w-full h-[80vh] object-cover"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4 text-white">
                <p className="font-semibold">{photo.desc}</p>
                <p className="text-sm">{photo.location} - {photo.year}</p>
                </div>
            </div>
            ))}
        </div>
    </section>
  );
}

export default Featured;
