import Link from "next/link";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { HowItWorks } from "@/components/HowItWorks";
import { FounderNote } from "@/components/FounderNote";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="sub-hero">
        <div className="wrap sub-hero-inner">
          <span className="rm-badge"><span className="dot" /> Build safer, build faster</span>
          <h1 style={{ marginTop: "24px", maxWidth: "18ch" }}>
            Pressure-test your <em>MVP</em> before you build it.
          </h1>
          <p className="rm-hero-sub">
            Stop wasting months — and burning capital — building products nobody wants.
            Get <span className="mag">instant, free feedback</span> on your market, solution, and build complexity.
          </p>
          <div className="rm-cta-row">
            <Link href="/validate" className="btn paper">Validate my MVP →</Link>
            <span className="rm-note">100% Free · No credit card required</span>
          </div>
        </div>
      </section>

      <Testimonials />
      <HowItWorks />
      <FounderNote />

      {/* Decision close */}
      <section className="rm-section rm-dark">
        <div className="wrap rm-decision">
          <h2 className="rm-big">Before you build anything — make the call that matters.</h2>
          <div className="rm-decision-body">
            <p>
              Most MVPs fail for reasons that were visible early — overbuilt scope,
              underestimated complexity, or the wrong thing built first.
            </p>
            <p>
              This validator exists to surface those risks before they cost you months
              of time, burned capital, or a stalled product.
            </p>
            <p><span className="rm-strong">You don&apos;t need more opinions. You need a clear execution signal.</span></p>
          </div>

          <div className="rm-chips">
            {[
              "20+ years shipping real products",
              "Trusted by product leaders",
              "Free & obligation-free",
            ].map((item) => (
              <span key={item} className="rm-chip"><i /> {item}</span>
            ))}
          </div>

          <div className="rm-cta-center">
            <Link href="/validate" className="btn paper">Validate my MVP now →</Link>
            <span className="rm-subnote">Guessing feels faster. Validation is cheaper.</span>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
