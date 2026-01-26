import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, report } = body;

        if (!email || !report) {
            return NextResponse.json({ error: 'Missing email or report data' }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;

        // Development / No Key Mode
        if (!apiKey) {
            console.log('--- SIMULATING EMAIL SEND ---');
            console.log(`To: ${email}`);
            console.log('Subject: Your Rapid MVP Validation Report');
            console.log('Content Summary:', {
                score: report.score,
                killList: report.killList,
                roadmap: report.timelineNarrative
            });
            console.log('-----------------------------');

            // Artificial delay to simulate network request
            await new Promise(resolve => setTimeout(resolve, 1000));

            return NextResponse.json({ success: true, mode: 'simulation' });
        }

        const resend = new Resend(apiKey);

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Rapid MVP Validator <onboarding@resend.dev>', // Use verified domain or default for testing
            to: [email],
            subject: getRandomSubject(report.score),
            html: `
                <html style="background-color: #0B0D12;">
                <body style="background-color: #0B0D12; margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                    <div style="background-color: #0B0D12; color: #F4F6FB; line-height: 1.6; padding: 40px 20px;">
                        
                        <div style="max-width: 600px; margin: 0 auto;">
                            <!-- Header -->
                            <div style="padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.10); margin-bottom: 30px;">
                                <h1 style="color: #4F8CFF; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.02em;">POWER SHIFTER Digital's Rapid MVP Analysis</h1>
                                <p style="margin: 5px 0 0; color: rgba(244,246,251,0.72); font-size: 14px;">Assessment for ${email}</p>
                            </div>

                            <!-- Intro -->
                            <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.10);">
                                <p style="margin-bottom: 15px; color: #F4F6FB;">Thank you for sharing your MVP idea with us. Before diving in, a quick note on trust: <strong>your idea remains yours.</strong> We do not claim ownership of submissions, reuse them, or treat validator inputs as our IP.</p>
                                <p style="margin-bottom: 0; color: #F4F6FB;">For nearly two decades, we’ve helped teams design, build, and ship digital products across industries. This analysis reflects how we think about MVPs in practice — not as feature-heavy builds, but as focused tools for validating assumptions, sequencing risk, and learning what deserves further investment.</p>
                            </div>

                            <!-- Hook -->
                            <p style="font-size: 18px; margin-bottom: 30px; color: #F4F6FB;">
                                Based on what you shared, your idea is <strong>viable — but it is execution-sensitive.</strong>
                            </p>

                            <!-- Score & Tradeoff -->
                            <div style="background: rgba(16,20,33,1); padding: 25px; border-radius: 22px; border: 1px solid rgba(255,255,255,0.10); margin-bottom: 35px;">
                                <h2 style="margin: 0 0 10px; font-size: 32px; color: #4F8CFF; font-weight: bold;">${report.score}/100 <span style="font-size: 16px; color: rgba(244,246,251,0.52); font-weight: normal;">Viability Score</span></h2>
                                <p style="margin: 0; font-weight: 500; color: #F4F6FB;">The Tradeoff:</p>
                                <p style="margin: 5px 0 0; color: rgba(244,246,251,0.72);">
                                    ${report.tradeoff || "This idea is not hard to build — it’s hard to sequence correctly. The fastest path to proof is a single financial integration, a narrow trust-first flow, and aggressive scope discipline. Anything beyond that before validation increases risk without increasing learning."}
                                </p>
                            </div>

                            <!-- The Scope Kill List -->
                            <h3 style="color: #FF4D5A; font-size: 18px; margin-top: 0;">🛑 The Hard Decisions</h3>
                            <p style="margin-bottom: 15px; color: #F4F6FB;">If we were responsible for this MVP, these are the things we would <strong>explicitly refuse to build</strong> in Phase 1 to ensure you actually launch:</p>
                            <ul style="background: rgba(255,77,90,0.10); border: 1px solid rgba(255,77,90,0.25); border-radius: 14px; padding: 20px 20px 20px 40px; margin-bottom: 35px;">
                                ${report.killList.map((item: string) => `<li style="margin-bottom: 8px; color: #FF4D5A;">${item}</li>`).join('')}
                            </ul>

                            <!-- The Unsaid Risk (New Section) -->
                            ${report.unsaidRisk ? `
                            <h3 style="color: #FFB020; font-size: 18px;">⚠️ The Unsaid Risk</h3>
                            <p style="margin-bottom: 10px; color: #F4F6FB;">Scores don't capture everything. Based on the complexity pattern of your answers, here is the one non-technical risk that could kill this venture:</p>
                            <blockquote style="border-left: 4px solid #FFB020; padding-left: 15px; margin: 0 0 35px; color: rgba(244,246,251,0.72); font-style: italic;">
                                "${report.unsaidRisk}"
                            </blockquote>
                            ` : ''}

                            <!-- 6-Week Plan / Paths -->
                            <h3 style="color: #F4F6FB; font-size: 18px;">🗺️ Two Paths Forward</h3>
                            <p style="color: #F4F6FB;">You have a choice on how to execute this:</p>
                            
                            <div style="display: flex; margin-bottom: 35px;">
                                <div style="flex: 1; padding: 15px; background: rgba(16,20,33,1); border: 1px solid rgba(255,255,255,0.10); border-radius: 14px;">
                                    <strong style="display: block; color: rgba(244,246,251,0.52); font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">Path A: Traditional Build</strong>
                                    <div style="font-size: 24px; font-weight: bold; color: rgba(244,246,251,0.72); margin-bottom: 5px;">${report.monthsToBuild} Months</div>
                                    <div style="font-size: 13px; color: rgba(244,246,251,0.52);">High burn. Slow feedback loop. You’ll learn if this works <em>after</em> most of the cost is sunk.</div>
                                </div>
                                <!-- Spacer for email compatibility -->
                                <div style="width: 10px; min-width: 10px;"></div>
                                <div style="flex: 1; padding: 15px; background: rgba(79,140,255,0.10); border: 1px solid rgba(79,140,255,0.25); border-radius: 14px;">
                                    <strong style="display: block; color: #4F8CFF; font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">Path B: Rapid MVP</strong>
                                    <div style="font-size: 24px; font-weight: bold; color: #4F8CFF; margin-bottom: 5px;">6 Weeks</div>
                                    <div style="font-size: 13px; color: #4F8CFF;">Aggressive scope cuts. Faster truth. You’ll know early whether this deserves more investment — or a pivot.</div>
                                </div>
                            </div>

                            <!-- CTA -->
                            <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.10);">
                                <p style="font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #F4F6FB;">Want a second opinion on the MVP idea or the exact scope?</p>
                                
                                <a href="https://justshift.it/meeting-with-jp" style="display: inline-block; background: #4F8CFF; color: #F4F6FB; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: bold; margin-bottom: 30px;">Book your free, no obligation discovery call today</a>

                                <p style="font-size: 14px; color: rgba(244,246,251,0.52); margin-bottom: 20px; font-style: italic;">
                                    "Most teams stall at this point. The ones that move forward usually do so by making one uncomfortable scope decision early."
                                </p>

                                <div style="margin-top: 40px; color: #F4F6FB;">
                                    <p style="margin-bottom: 10px;">Sincerely,</p>
                                    <img src="https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/SignatureTransparent-white.png" alt="Signature" style="height: 40px; display: block; margin-bottom: 10px;" />
                                    <p style="margin: 0; font-weight: bold;">JP Holecka // CEO/Founder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (error: unknown) {
        console.error('Email Error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message || 'Failed to send email' }, { status: 500 });
    }
}

function getRandomSubject(score: number) {
    const defaultSubjects = [
        "Your idea is execution-sensitive (Score inside)",
        "Your idea is viable — but execution-sensitive",
        "This MVP can work, but only if executed carefully"
    ];

    // We can still keep the high score ones if the score is exceptionally high, 
    // but the user prefers the "Execution Sensitive" framing generally.
    const highScoreSubjects = [
        "Your MVP scored high. Don't ruin it with overbuilding.",
        "Your idea is execution-sensitive (Score inside)", // Include the winner here too
        `${score}/100 is solid. Here's what would break this MVP.`,
    ];

    const subjects = score > 80 ? highScoreSubjects : defaultSubjects;
    return subjects[Math.floor(Math.random() * subjects.length)];
}
