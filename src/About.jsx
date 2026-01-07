import { useNavigate } from "react-router-dom";

function About() {
const navigate = useNavigate();

return (
    <>
        <section className="flex flex-col justify-center items-center min-h-screen p-6">              
            <div className="text-sm text-justify tracking-widest normal-case max-w-md leading-[18px] space-y-6">
                <p>This is a personal archive of places I’ve visited that felt worth holding onto. I am self-taught and began photographing in 2020. All photos are captured with a Sony Alpha a6000 under natural light.</p>
                <p>Based in Utrecht, Netherlands. You can reach me at{" "}<span className="italic hover:underline">justinamiller1023@gmail.com</span></p>
            </div>
            
            <button
                className="text-xs  block mx-auto hover:underline hover:-translate-y-1 transition mt-12"
                onClick={() => navigate("/photofolio/")}
            >
                Back Home
            </button>
        </section>
    </>
  );
}

export default About;
