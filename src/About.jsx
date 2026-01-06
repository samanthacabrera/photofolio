import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();

    return (
    <section className="flex flex-col justify-center items-center min-h-screen p-6">        
        <h1 className="sticky top-0 z-10 w-screen bg-white text-2xl md:text-4xl font-light mb-8 py-4 text-center">About</h1>
        
        <div className="text-sm tracking-wide leading-[18px] space-y-6">
            <p>This is a personal archive of places I’ve visited that felt worth holding onto. I am self-taught and began photographing in 2020. All photos are captured with a Sony Alpha a6000 under natural light.</p>
            <p>Based in Utrecht, Netherlands. I am happy to connect with fellow travelers and photography enthusiasts. You can reach me at{" "}<span className="italic hover:underline">justinamiller1023@gmail.com</span></p>
        </div>
        
        <button
            className="text-xs uppercase block mx-auto hover:underline hover:-translate-y-1 transition mt-12"
            onClick={() => navigate("/photofolio/")}
        >
            Back Home
        </button>
    </section>
  );
}

export default About;
