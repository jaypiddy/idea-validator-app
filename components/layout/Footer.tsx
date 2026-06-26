export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="foot">
                <p className="foot-discl">
                    <b>Disclaimer:</b> This assessment provides a high-level estimate based on the information you&rsquo;ve shared and Power Shifter&rsquo;s experience with industry best practices. It is intended for directional guidance only. Actual build timelines, scope, costs, and technical requirements may vary based on additional discovery, constraints, integrations, regulatory considerations, and execution decisions. Power Shifter makes no guarantees regarding delivery timelines or outcomes based on this assessment alone.
                </p>

                <div className="foot-rule" />

                <div className="foot-legal">
                    <span>
                        © {currentYear}{' '}
                        <a href="https://powershifter.com" target="_blank" rel="noopener noreferrer">Power Shifter Digital Inc.</a> All rights reserved.
                    </span>
                    <span className="sep">|</span>
                    <a href="https://www.powershifter.com/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>
                    <span className="sep">|</span>
                    <a href="https://www.powershifter.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <span className="sep">|</span>
                    <a href="https://www.powershifter.com/privacy-policy" target="_blank" rel="noopener noreferrer">Cookies</a>
                </div>

                <div className="foot-build">{process.env.GEMINI_MODEL || 'gemini-2.5-flash'} · Build {new Date().toISOString().split('T')[0]}</div>
            </div>
        </footer>
    );
}
