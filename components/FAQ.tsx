import Link from 'next/link';

const faqs = [
    {
        question: "What is an MVP — and what is it not?",
        answer: "An MVP (Minimum Viable Product) is the smallest version of a product that allows you to test real assumptions with real users. It is not a feature-complete product, a polished production release, or a guarantee of product–market fit. The goal of an MVP is learning, not perfection. This validator focuses on whether that learning can happen efficiently and responsibly."
    },
    {
        question: "How long should an MVP take to build?",
        answer: "There is no universal timeline. Most teams underestimate complexity and overbuild early. A well-scoped MVP typically takes weeks, not months — but only when scope, sequencing, and risk are tightly controlled. This validator provides a directional estimate, not a promise, based on known execution patterns."
    },
    {
        question: "Can this tool tell me if my idea will succeed?",
        answer: "No. This tool does not predict market success — it evaluates execution feasibility. It helps assess technical realism, scope appropriateness, and where teams commonly overbuild or mis-sequence."
    },
    {
        question: "Is this meant for startups or enterprise teams?",
        answer: "Both. Founders use it to avoid wasting time and capital early. Enterprise teams use it to pressure-test initiatives before allocating internal resources. The execution risks are the same regardless of company size."
    },
    {
        question: "What happens after I complete the validation?",
        answer: "You’ll receive a concise report by email that includes an MVP validation score, key execution risks, and guidance on what to build now versus later. There’s no obligation to engage further."
    },
    {
        question: "Is my idea safe? Who owns it?",
        answer: "Your idea remains 100% yours. Submissions are not treated as Power Shifter IP and are never reused. This tool exists to reduce waste, not extract concepts."
    },
    {
        question: "Why should I trust this assessment?",
        answer: "This validator is built on nearly 20 years of real product delivery. It reflects patterns from startup MVPs, enterprise innovation programs, and products that shipped — and those that stalled. It’s designed to surface uncomfortable truths early, when they’re cheapest to address."
    },
    {
        question: "What if my MVP scores poorly?",
        answer: "That’s often the most valuable outcome. A weak signal early can prevent months of wasted effort and gives you the opportunity to cut scope, re-sequence features, rethink the approach, or decide not to build yet."
    },
    {
        question: "Is this free? What’s the catch?",
        answer: "The MVP validation is free and takes about two minutes. No credit card is required, and there’s no obligation to move forward. If it makes sense to talk, you’ll know — and so will we."
    }
];

export function FAQ() {
    return (
        <section id="mvp-faq" className="rm-section rm-light rm-bordered">
            <div className="wrap">
                <div className="rm-head center">
                    <span className="eyebrow pink">FAQ</span>
                    <h2 className="rm-h2">Common questions before building an MVP</h2>
                    <p className="rm-lead">
                        Everything you should pressure-test before committing time, budget, or a team.
                    </p>
                </div>

                <div className="rm-faqwrap">
                    <div className="rm-faq">
                        {faqs.map((faq, index) => (
                            <details key={index} open={index === 0}>
                                <summary>
                                    {faq.question}
                                    <span className="chev" />
                                </summary>
                                <p>{faq.answer}</p>
                            </details>
                        ))}
                    </div>

                    <div className="rm-cta-center">
                        <Link href="/validate" className="btn solid">Validate my MVP now →</Link>
                        <span className="rm-note dark">Takes ~2 minutes · No credit card</span>
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />
        </section>
    );
}
