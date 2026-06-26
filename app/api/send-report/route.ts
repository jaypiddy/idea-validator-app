import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Campaign Monitor Integration
async function addSubscriber(email: string, name: string, inputs: any) {
    const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
    const listId = process.env.CAMPAIGN_MONITOR_LIST_ID;

    if (!apiKey || !listId) {
        console.warn('Campaign Monitor API Key or List ID not set');
        return;
    }

    const customFields = [
        { Key: '[Whatspecificproblemareyousolving?]', Value: inputs.problem },
        { Key: '[Whathappensifthisproblemremainsunsolvedfor12months?]', Value: inputs.problem_impact },
        { Key: '[Whoisexperiencingthispainmostacutely?]', Value: inputs.audience },
        { Key: '[Describeyoursolutioninonesentence.]', Value: inputs.solution },
        { Key: '[WhatpartofthissolutionMUSTworkfortheideatosurvive?]', Value: inputs.solution_critical_path },
        { Key: '[KeyfeaturesfortheMVP?]', Value: inputs.features },
        { Key: '[ExistingCompetitors]', Value: inputs.competitors },
        { Key: '[Whatbehaviormustchangeforthistosucceed?]', Value: inputs.market_behavior_change },
        { Key: '[Whywilltheyswitchtoyou?]', Value: inputs.market },
        { Key: '[EstimatedTimeline]', Value: inputs.timeline },
        { Key: '[RoughBudget]', Value: inputs.budget },
        { Key: '[Whowouldownthisinternallyafterlaunch?]', Value: inputs.execution_owner },
    ].filter(field => field.Value); // Only send defined values

    try {
        const auth = Buffer.from(`${apiKey}:x`).toString('base64');
        const res = await fetch(`https://api.createsend.com/api/v3.3/subscribers/${listId}.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmailAddress: email,
                Name: name,
                CustomFields: customFields,
                Resubscribe: true,
                RestartSubscriptionBasedAutoresponders: true,
                ConsentToTrack: "Yes"
            })
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Campaign Monitor Error:', errorText);
        } else {
            console.log(`Successfully added ${email} to Campaign Monitor`);
        }
    } catch (error) {
        console.error('Failed to add subscriber to Campaign Monitor:', error);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, report, inputs } = body;

        if (!email || !report) {
            return NextResponse.json({ error: 'Missing email or report data' }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;

        // Development / No Key Mode
        if (!apiKey) {
            console.log('--- SIMULATING EMAIL SEND ---');
            console.log(`To: ${email}`);
            console.log(`Name: ${name}`);
            console.log('Subject: Your Rapid MVP Validation Report');
            console.log('Content Summary:', {
                score: report.score,
                killList: report.killList,
                roadmap: report.timelineNarrative
            });
            console.log('--- SIMULATING CAMPAIGN MONITOR ---');
            console.log('Inputs to sync:', inputs ? Object.keys(inputs).length : 0);
            console.log('-----------------------------');

            // Artificial delay to simulate network request
            await new Promise(resolve => setTimeout(resolve, 1000));

            return NextResponse.json({ success: true, mode: 'simulation' });
        }

        const resend = new Resend(apiKey);

        // --- Power Shifter brand tokens (email-safe) ---
        // Web fonts via Typekit are progressive enhancement; the stacks fall
        // back gracefully in clients that strip them (Gmail, Outlook).
        const DISPLAY = `'articulat-heavy-cf', 'Helvetica Neue', Helvetica, Arial, sans-serif`;
        const SANS = `'articulat-cf', 'Helvetica Neue', Helvetica, Arial, sans-serif`;
        const SERIF = `'fraunces-variable', Georgia, 'Times New Roman', serif`;
        const MONO = `'config-mono-vf', ui-monospace, 'SF Mono', Menlo, monospace`;
        const INK = '#121315';
        const CARD = '#1A1B1E';
        const PAPER = '#FAFAF7';
        const MAGENTA = '#FD2E90';
        const LINE = 'rgba(250,250,247,0.14)';
        const MUTE = 'rgba(250,250,247,0.72)';
        const FAINT = 'rgba(250,250,247,0.5)';
        const kicker = `font-family:${MONO}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${MAGENTA}; margin:0 0 8px;`;

        const emailPromise = resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Rapid MVP Validator <mvp.validator@mailupdates.powershifter.com>',
            to: [email],
            subject: getRandomSubject(report.score),
            html: `
                <html style="background-color:${INK};">
                <head>
                    <meta name="color-scheme" content="dark">
                    <meta name="supported-color-schemes" content="dark">
                    <link rel="stylesheet" href="https://use.typekit.net/xkk7api.css">
                </head>
                <body style="background-color:${INK}; margin:0; padding:0; font-family:${SANS};">
                    <div style="background-color:${INK}; color:${PAPER}; line-height:1.6; padding:40px 20px;">

                        <div style="max-width:600px; margin:0 auto;">
                            <!-- Header -->
                            <div style="padding-bottom:22px; border-bottom:1px solid ${LINE}; margin-bottom:30px;">
                                <p style="${kicker}">Power Shifter &middot; MVP Validator</p>
                                <h1 style="color:${PAPER}; margin:0; font-family:${DISPLAY}; font-size:28px; font-weight:800; letter-spacing:-0.02em; line-height:1.1;">Rapid MVP Analysis</h1>
                                <p style="margin:10px 0 0; font-family:${MONO}; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:${FAINT};">Assessment for ${name || email}</p>
                            </div>

                            <!-- Intro -->
                            <div style="margin-bottom:30px; padding-bottom:24px; border-bottom:1px solid ${LINE};">
                                <p style="margin:0 0 15px; color:${PAPER};">Hi ${name || 'there'},</p>
                                <p style="margin:0 0 15px; color:${MUTE};">Thank you for sharing your MVP idea with us. Before diving in, a quick note on trust: <strong style="color:${PAPER};">your idea remains yours.</strong> We do not claim ownership of submissions, reuse them, or treat validator inputs as our IP.</p>
                                <p style="margin:0; color:${MUTE};">For nearly two decades, we&rsquo;ve helped teams design, build, and ship digital products across industries. This analysis reflects how we think about MVPs in practice &mdash; not as feature-heavy builds, but as focused tools for validating assumptions, sequencing risk, and learning what deserves further investment.</p>
                            </div>

                            <!-- Hook -->
                            <p style="font-family:${DISPLAY}; font-weight:800; font-size:22px; line-height:1.3; letter-spacing:-0.01em; margin:0 0 30px; color:${PAPER};">
                                Based on what you shared, your idea is <span style="color:${MAGENTA};">viable &mdash; but it is execution-sensitive.</span>
                            </p>

                            <!-- Score & Tradeoff -->
                            <div style="background:${CARD}; padding:28px; border:1px solid ${LINE}; margin-bottom:35px;">
                                <div style="font-family:${DISPLAY}; font-weight:800; font-size:48px; line-height:1; letter-spacing:-0.03em; color:${MAGENTA}; margin-bottom:14px;">${report.score}<span style="font-size:18px; color:${FAINT}; font-weight:400;">/100</span> &nbsp;<span style="font-family:${MONO}; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:${FAINT};">Viability Score</span></div>
                                <p style="${kicker}">The Tradeoff</p>
                                <p style="margin:0; color:${MUTE};">
                                    ${report.tradeoff || "This idea is not hard to build — it&rsquo;s hard to sequence correctly. The fastest path to proof is a single financial integration, a narrow trust-first flow, and aggressive scope discipline. Anything beyond that before validation increases risk without increasing learning."}
                                </p>
                            </div>

                            <!-- The Hard Decisions -->
                            <p style="${kicker}">The Hard Decisions</p>
                            <p style="margin:0 0 15px; color:${MUTE};">If we were responsible for this MVP, these are the things we would <strong style="color:${PAPER};">explicitly refuse to build</strong> in Phase 1 to ensure you actually launch:</p>
                            <div style="background:${CARD}; border:1px solid ${LINE}; border-left:3px solid ${MAGENTA}; padding:20px 24px; margin-bottom:35px;">
                                <ul style="margin:0; padding-left:18px;">
                                    ${report.killList.map((item: string) => `<li style="margin-bottom:10px; color:${PAPER};">${item}</li>`).join('')}
                                </ul>
                            </div>

                            <!-- The Unsaid Risk -->
                            ${report.unsaidRisk ? `
                            <p style="${kicker}">The Unsaid Risk</p>
                            <p style="margin:0 0 12px; color:${MUTE};">Scores don&rsquo;t capture everything. Based on the complexity pattern of your answers, here is the one non-technical risk that could kill this venture:</p>
                            <blockquote style="border-left:3px solid ${MAGENTA}; padding-left:20px; margin:0 0 35px; color:${PAPER}; font-family:${SERIF}; font-style:italic; font-size:20px; line-height:1.4;">
                                &ldquo;${report.unsaidRisk}&rdquo;
                            </blockquote>
                            ` : ''}

                            <!-- Two Paths Forward -->
                            <p style="${kicker}">Two Paths Forward</p>
                            <p style="margin:0 0 16px; color:${MUTE};">You have a choice on how to execute this:</p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:35px; border-collapse:separate;">
                                <tr>
                                    <td valign="top" width="48%" style="background:${CARD}; border:1px solid ${LINE}; padding:20px;">
                                        <div style="font-family:${MONO}; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:${FAINT}; margin-bottom:8px;">Path A &middot; Traditional Build</div>
                                        <div style="font-family:${DISPLAY}; font-size:28px; font-weight:800; letter-spacing:-0.02em; color:${PAPER}; margin-bottom:8px;">${report.monthsToBuild} Months</div>
                                        <div style="font-size:13px; line-height:1.5; color:${FAINT};">High burn. Slow feedback loop. You&rsquo;ll learn if this works <em>after</em> most of the cost is sunk.</div>
                                    </td>
                                    <td width="4%">&nbsp;</td>
                                    <td valign="top" width="48%" style="background:${CARD}; border:1px solid ${MAGENTA}; padding:20px;">
                                        <div style="font-family:${MONO}; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:${MAGENTA}; margin-bottom:8px;">Path B &middot; Rapid MVP</div>
                                        <div style="font-family:${DISPLAY}; font-size:28px; font-weight:800; letter-spacing:-0.02em; color:${PAPER}; margin-bottom:8px;">6 Weeks</div>
                                        <div style="font-size:13px; line-height:1.5; color:${MUTE};">Aggressive scope cuts. Faster truth. You&rsquo;ll know early whether this deserves more investment &mdash; or a pivot.</div>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA -->
                            <div style="margin-top:50px; padding-top:30px; border-top:1px solid ${LINE};">
                                <p style="font-family:${DISPLAY}; font-size:18px; font-weight:800; letter-spacing:-0.01em; margin:0 0 18px; color:${PAPER};">Want a second opinion on the MVP idea or the exact scope?</p>

                                <a href="https://justshift.it/meeting-with-jp" style="display:inline-block; background:${PAPER}; color:${INK}; text-decoration:none; padding:14px 26px; font-family:${SANS}; font-weight:700; letter-spacing:0.02em; margin-bottom:30px;">Book your free, no-obligation discovery call &rarr;</a>

                                <p style="font-family:${SERIF}; font-style:italic; font-size:16px; color:${MUTE}; margin:0 0 20px;">
                                    &ldquo;Most teams stall at this point. The ones that move forward usually do so by making one uncomfortable scope decision early.&rdquo;
                                </p>

                                <div style="margin-top:40px; color:${PAPER};">
                                    <p style="margin:0 0 10px;">Sincerely,</p>
                                    <img src="https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/SignatureTransparent-white.png" alt="Signature" style="height:40px; display:block; margin-bottom:10px;" />
                                    <p style="margin:0; font-family:${DISPLAY}; font-weight:800;">JP Holecka <span style="color:${MAGENTA};">//</span> CEO/Founder</p>
                                </div>

                                <!-- Unsubscribe Footer -->
                                <div style="margin-top:40px; padding-top:20px; border-top:1px solid ${LINE}; font-family:${MONO}; font-size:11px; letter-spacing:0.04em; color:${FAINT};">
                                    <p style="margin:0;">
                                        You received this email because you used the Rapid MVP Validator.
                                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color:${MUTE}; text-decoration:underline;">Unsubscribe</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            `,
        });

        // Add to Campaign Monitor (Fire and forget-ish, but await to log errors)
        if (inputs) {
            // We await it so the logs appear in Vercel/console before the lambda spins down
            await addSubscriber(email, name, inputs);
        }

        const { data, error } = await emailPromise;

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
