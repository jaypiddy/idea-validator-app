

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-ps-surface text-white py-8 px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6 text-sm text-center font-medium">
                {/* Legal Disclaimer */}
                <p className="max-w-4xl mx-auto text-xs text-neutral-500 leading-relaxed font-light">
                    <span className="font-medium text-neutral-400">Disclaimer:</span> This assessment provides a high-level estimate based on the information you’ve shared and Power Shifter’s experience with industry best practices. It is intended for directional guidance only. Actual build timelines, scope, costs, and technical requirements may vary based on additional discovery, constraints, integrations, regulatory considerations, and execution decisions. Power Shifter makes no guarantees regarding delivery timelines or outcomes based on this assessment alone.
                </p>

                <div className="w-full h-px bg-white/5" />

                <div className="flex flex-col md:flex-row items-center gap-4">
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
            </div>
        </footer>
    );
}
