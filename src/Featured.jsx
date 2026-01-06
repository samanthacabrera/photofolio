import { useNavigate } from "react-router-dom";
import photos from "./photos"; 

function Featured() {
    const navigate = useNavigate();
    const featuredPhotos = photos.filter((photo) => photo.featured);

    return (
    <section className="min-h-screen p-6">        
        <h1 className="sticky top-0 z-10 w-screen bg-white text-2xl md:text-4xl font-light my-0 md:my-12 py-4 text-center">Featured Photos</h1>

        <div className="grid grid-cols-1 gap-12 md:gap-64 py-12 md:py-24 px-4 md:px-12">
            {featuredPhotos.map((photo) => (
            <div
                key={photo.id}
                className="relative rounded-lg shadow-lg group"
            >
                <img
                src={photo.src}
                alt={photo.desc}
                className="w-fit h-fit md:h-[90vh] object-cover"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4 text-white tracking-wide">
                    <p className="font-medium">{photo.desc}</p>
                    <p className="text-sm">{photo.location} {photo.year}</p>
                </div>
            </div>
            ))}
        </div>
        
        <button
            className="text-xs uppercase block mx-auto hover:underline hover:-translate-y-1 transition"
            onClick={() => navigate("/photofolio/")}
        >
            Back Home
        </button>
    </section>
  );
}

export default Featured;
