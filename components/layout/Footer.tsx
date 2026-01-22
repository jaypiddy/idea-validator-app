import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-blue-600 text-white py-8 px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-center font-medium">
                <p>
                    Copyright {currentYear} <a href="https://powershifter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 underline decoration-blue-400 underline-offset-4">Power Shifter Digital Inc.</a> All rights reserved.
                </p>
                <div className="hidden md:block w-px h-4 bg-blue-400" />
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://www.powershifter.com/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">
                        Terms & Conditions
                    </a>
                    <span className="hidden md:inline text-blue-400">|</span>
                    <a href="https://www.powershifter.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">
                        Privacy Policy
                    </a>
                    <span className="hidden md:inline text-blue-400">|</span>
                    <a href="https://www.powershifter.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">
                        Cookies
                    </a>
                </div>
            </div>
        </footer>
    );
}
