import Link from "next/link";

const steps = [
    {
        title: "Input your idea",
        desc: "Describe your product vision in plain English. No technical specs required—just your goal and core features.",
        duration: "~2 min",
    },
    {
        title: "AI pressure test",
        desc: "Our engine analyzes your concept against millions of data points to identify risks, competitors, and technical complexity.",
        duration: "Instant",
    },
    {
        title: "Get your roadmap",
        desc: "Receive a comprehensive report with a tech stack, estimated build time, and a step-by-step execution plan.",
        duration: "Free report",
    },
];

export function HowItWorks() {
    return (
        <section className="rm-section rm-light rm-bordered">
            <div className="wrap">
                <div className="rm-head center">
                    <span className="eyebrow pink">The Process</span>
                    <h2 className="rm-h2">From idea to execution plan in minutes.</h2>
                </div>

                <ol className="rm-steps">
                    {steps.map((step, i) => (
                        <li key={i} className="rm-step">
                            <h3>{`${i + 1}. ${step.title}`}</h3>
                            <p>{step.desc}</p>
                            <span className="rm-chip-dur">{step.duration}</span>
                        </li>
                    ))}
                </ol>

                <div className="rm-cta-center">
                    <Link href="/validate" className="btn solid">Validate my MVP →</Link>
                    <span className="rm-note dark">100% Free · No credit card required</span>
                </div>
            </div>
        </section>
    );
}
