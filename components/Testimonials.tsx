import Image from "next/image";

const testimonials = [
    {
        quote: "The Power Shifter team truly feels like an extension of our own. Their flexibility, problem-solving mindset, and ability to pivot without losing momentum made a big impact.",
        author: "Joseph Santry",
        role: "Senior Director, Futures Innovation at lululemon",
        image: "https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/1718286212323.jpeg"
    },
    {
        quote: "Thrilled with the work POWERSHiFTER has done under very tight timelines and customizing the solution for our unique needs.",
        author: "Achin Kansal",
        role: "VP of Marketing, Phinity",
        image: "https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/1726361063792.jpeg"
    },
    {
        quote: "They have been a sincere pleasure to work with and have enabled the launch of XYON's complex and beautiful commerce site, which we expect will be the foundation of a successful brand.",
        author: "Simon Pimstone",
        role: "Co-Founder and CEO, XYON",
        image: "https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/1639696128312.jpeg"
    }
];

export function Testimonials() {
    return (
        <section className="rm-section rm-light">
            <div className="wrap">
                <div className="rm-head center">
                    <span className="eyebrow pink">Proof</span>
                    <h2 className="rm-h2">Trusted by product leaders who ship.</h2>
                    <p className="rm-lead">
                        Don&apos;t just take our word for it. See how others are using data to build with confidence.
                    </p>
                </div>

                <div className="rm-quotes">
                    {testimonials.map((t, i) => (
                        <figure key={i} className="rm-quote">
                            <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                            <figcaption>
                                <Image src={t.image} alt={t.author} width={46} height={46} unoptimized />
                                <span>
                                    <b>{t.author}</b>
                                    {t.role}
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
