import { Link } from "react-router-dom";

export default function Header({ darkMode, setDarkMode, pageName }) {

    return (
    <header className="sticky top-0 z-50 w-screen bg-white flex items-center justify-center py-3 px-4 text-neutral-800 text-[10px] md:text-sm tracking-[0.2em]">
        <Link
            to="/photofolio/"
            className="absolute left-4 hover:opacity-70 transition-opacity"
        >
            <span className="text-neutral-500">JM</span>Photography
        </Link>

        <h1 className="text-center">
            {pageName}
        </h1>
            
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute right-4 flex items-center space-x-1 hover:opacity-70 transition-opacity"
            aria-label="Toggle dark mode"
        >
            {darkMode ? (
                <>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                    <circle cx="12" cy="12" r="5" strokeWidth="1" />
                    <line x1="12" y1="2" x2="12" y2="5" strokeWidth="1" stroke="currentColor" strokeLinecap="round"/>
                    <line x1="12" y1="19" x2="12" y2="22" strokeWidth="1" stroke="currentColor" strokeLinecap="round"/>
                    <line x1="2" y1="12" x2="5" y2="12" strokeWidth="1" stroke="currentColor" strokeLinecap="round"/>
                    <line x1="19" y1="12" x2="22" y2="12" strokeWidth="1" stroke="currentColor" strokeLinecap="round"/>
                    <line x1="5" y1="5" x2="7" y2="7" strokeWidth="1" stroke="currentColor" strokeLinecap="round"/>
                    <line x1="17" y1="17" x2="19" y2="19" strokeWidth="1" stroke="currentColor" strokeLinecap="round"/>
                    <line x1="5" y1="19" x2="7" y2="17" strokeWidth="1" stroke="currentColor" strokeLinecap="round"/>
                    <line x1="17" y1="7" x2="19" y2="5" strokeWidth="1" stroke="currentColor" strokeLinecap="round"/>
                </svg>
                <span className="text-[10px] md:text-sm tracking-[0.2em]">Light</span>
            </>
            ) : (
            <>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"   
                >
                <path d="M21.752 15.002A9 9 0 1112 3a9.003 9.003 0 009.752 12.002z" />
                </svg>
                <span className="text-neutral-800 text-[10px] md:text-sm tracking-[0.2em]">Dark</span>
            </>
            )}
        </button>
    </header>
  );
}
