function About({ layoutValue }) {
    const email = "justinamiller1023@gmail.com"

    const textSizeMap = {
        1: "md:text-base",
        2: "md:text-lg",
        3: "md:text-xl",
        4: "md:text-2xl",
    };


return (
    <div className="h-screen overflow-hidden">
        <div id="about" className="flex flex-col items-center justify-center h-[90vh] max-w-xl mx-8 md:mx-auto">   
            <div className={`${textSizeMap[layoutValue]} text-left tracking-wide normal-case space-y-4`}>
                <p>Based in Utrecht, Netherlands. </p>
                <p>This is my personal archive of places I’ve visited that felt worth holding onto.</p>
                <p>I am self-taught and began photographing in 2020. All photos are captured with a Sony Alpha a6000 under natural light.</p>
                <p>You can reach me at <a href={`mailto:${email}`} className="italic hover:underline pl-1"> justinamiller1023@gmail.com</a>.</p>
            </div>
            <p className="fixed bottom-2 text-[10px] md:text-xs">This site was made by
                <a href="https://samoontha.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition pl-1">Sam Cabrera</a>
            </p>
        </div>
    </div>
  );
}

export default About;


    