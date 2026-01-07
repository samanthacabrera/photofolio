import { useNavigate } from "react-router-dom";
import photos from "./photos"; 
import ScrollToTop from "./ScrollToTop";


function Featured() {
    const navigate = useNavigate();
    const featuredPhotos = photos.filter((photo) => photo.featured);

    return (
    <section className="min-h-screen">        
        <div className="grid grid-cols-1 gap-24 my-6 md:my-24 p-6">
            {featuredPhotos.map((photo) => (
            <div
                key={photo.id}
                className="max-w-5xl mx-auto relative group"
            >
                <div className="flex flex-col space-y-4 my-4 text-sm text-center tracking-wider">
                    <p>{photo.location} {photo.year}</p>
                    <p className="text-lg">{photo.desc}</p>
                    {photo.featuredText && (
                    <p className="normal-case text-justify tracking-wide">
                        {photo.featuredText}
                    </p>
                    )}
                </div>
                
                <div className="relative">
                    <img src={photo.src} alt={photo.desc} className="w-fit h-full md:w-full object-cover"/>
                    {/* <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white text-xs tracking-wide">
                        <p>buy print</p>
                        <p>(coming soon)</p>
                    </div> */}
                </div>
            </div>
            ))}
        </div>
        
        <button
            className="text-xs  block mx-auto hover:underline hover:-translate-y-1 transition p-12"
            onClick={() => navigate("/photofolio/")}
        >
            Back Home
        </button>
        <ScrollToTop />
    </section>
  );
}

export default Featured;
