

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-ps-surface text-white py-8 px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-center font-medium">
                <p>
                    Copyright {currentYear} <a href="https://powershifter.com" target="_blank" rel="noopener noreferrer" className="hover:text-ps-blue underline decoration-ps-blue/50 underline-offset-4">Power Shifter Digital Inc.</a> All rights reserved.
                </p>
                <div className="hidden md:block w-px h-4 bg-white/10" />
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://www.powershifter.com/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-ps-blue transition-colors">
                        Terms & Conditions
                    </a>
                    <span className="hidden md:inline text-white/20">|</span>
                    <a href="https://www.powershifter.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-ps-blue transition-colors">
                        Privacy Policy
                    </a>
                    <span className="hidden md:inline text-white/20">|</span>
                    <a href="https://www.powershifter.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-ps-blue transition-colors">
                        Cookies
                    </a>
                </div>
            </div>
        </footer>
    );
}
