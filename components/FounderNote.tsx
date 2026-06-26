import Image from "next/image";

export function FounderNote() {
    return (
        <section className="rm-section rm-light rm-bordered">
            <div className="wrap">
                <div className="rm-founder">
                    <div className="rm-founder-photo">
                        <Image
                            src="/jay-founder.jpg"
                            alt="JP Holecka"
                            width={300}
                            height={375}
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <span className="eyebrow pink">Why I built this</span>
                        <p className="rm-pull" style={{ marginTop: "16px" }}>
                            After 20 years of shipping products for global brands, I&apos;ve seen too many great
                            ideas fail—not because they weren&apos;t brilliant, but because they were built blindly.
                        </p>
                        <p className="rm-lead" style={{ marginTop: 0 }}>
                            We created this validator to give you the honest, data-backed signal I wish I had
                            starting out. No fluff, just the execution reality check you need before writing
                            that first line of code.
                        </p>
                        <div className="rm-founder-by">
                            <b>JP Holecka</b>
                            <span>Founder &amp; CEO</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
