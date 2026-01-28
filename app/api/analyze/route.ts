import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // 1. Origin Check (Simple CSRF/Abuse protection)
        const origin = req.headers.get('origin');
        const host = req.headers.get('host');

        console.log('[API/Analyze] Request received. Origin:', origin, 'Host:', host);

        // Allow requests if they come from the same host (simple check)
        // In production, you might want to match against a specific env variable like process.env.NEXT_PUBLIC_URL
        if (origin && host && !origin.includes(host)) {
            console.error('[API/Analyze] Origin mismatch. Origin:', origin, 'Host:', host);
            return NextResponse.json({ error: `Forbidden: Invalid Origin (${origin} vs ${host})` }, { status: 403 });
        }

        const body = await req.json();
        const {
            problem, problem_impact,
            solution, solution_critical_path,
            market, market_behavior_change,
            features, competitors, timeline, budget, execution_owner
        } = body;

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
      # SYSTEM ROLE
      You are a veteran VC and Product Strategist at "Power Shifter Digital." Your expertise is "Rapid MVPs." You possess a "ruthless prioritization" mindset. You believe 90% of features are distractions. Your goal is to tell founders the hard truth they need to hear to launch in 6 weeks, not 6 months.

      # THE TASK
      Analyze the following startup idea submission. You must look past the user's optimism and identify the "Execution Risks" and "Scope Creep" that will kill the project.
      Analyse purely from a BUILD & ENGINEERING perspective, but use your strategist persona to frame the advice.

      # INPUT DATA
      - **Problem:** ${problem}
      - **Consequence:** ${problem_impact}
      - **Target Audience:** ${market} (Context)
      - **Solution Pitch:** ${solution}
      - **Critical Path:** ${solution_critical_path}
      - **Key Features Listed:** ${features}
      - **Competitors:** ${competitors}
      - **User Behavior Change:** ${market_behavior_change}
      - **Differentiation:** ${body.differentiation || 'Not provided'}
      - **Timeline:** ${timeline}
      - **Budget:** ${budget}
      - **Execution Owner:** ${execution_owner}

      # ANALYSIS LOGIC (THINK STEP-BY-STEP)
      1. **Infer the "Implicit Bloat":** Based on the industry (e.g., if it's a pet app, implicit bloat is "community features" or "live video"; if it's a marketplace, implicit bloat is "advanced admin dashboards"). You must identify features the user likely *wants* but didn't list, which must be cut to hit a 6-week timeline.
      2. **Find the "Blindspot":** Look at the *Behavior Change* and *Consequence* answers. Find a non-technical risk (trust, adoption, legal, physical safety). This is not a software bug; it is a human failure mode.
      3. **Calculate Viability & Complexity:** 
         - If "Hardware" is involved but timeline is < 3 months -> High Complexity.
         - If "AI" is the core but no proprietary data -> High Risk.
         - If Budget is Low but scope is "Platform" -> High Complexity.

      # OUTPUT FORMAT (STRICT JSON)
      Return a JSON object with NO markdown formatting, just raw JSON. The keys must match exactly:

      {
        "score": (integer 0-100, where 100 = Easy/Standard CRUD App, 0 = Extremely High Complexity/R&D required),
        "readiness": {
            "problem": (integer 0-100),
            "market": (integer 0-100),
            "tech": (integer 0-100),
            "diff": (integer 0-100),
            "risk": (integer 0-100)
        },
        "complexity": "Low" | "Medium" | "High" | "Rocket Science",
        "complexitySummary": "1-2 sentences explaining specifically WHAT makes it this level of complexity.",
        "monthsToBuild": (integer estimate for a professional dev team),
        "traditionalBuildRationale": "1-2 sentences explaining WHY it takes this long traditionally (Path A).",
        "mvpRule": "A declarative statement on the shape of the MVP (e.g. 'This should be a single-flow MVP, not a platform').",
        "good": ["List technical accelerators (e.g., standard auth, simple data model)"],
        "bad": ["List specific complexity drivers (e.g., realtime sync, complex 3rd party integrations, AI training)"],
        "killList": ["List 3-5 'Implicit Bloat' features you INFERRED that must be EXCLUDED from phase 1. Be specific."],
        "aiHumanMix": {
             "aiPercent": (integer 0-100),
             "humanPercent": (integer 0-100),
             "rationale": "Short explanation of what AI accelerates vs where humans are needed."
        },
        "timelineNarrative": ["Week 1-2: [Goal]", "Week 3-4: [Goal]", "Week 5-6: [Goal]"],
        "decisionGate": {
            "proceed": (boolean),
            "reason": "Short reason why they should proceed/pivot/pause based on tech feasibility."
        },
        "verdict": "A encouraging technical summary. Explain WHY it takes the estimated time based on the complexity.",
        "unsaidRisk": "Identify one critical non-technical risk (e.g., trust signals, legal, distribution, adoption) that the score does not capture. Be specific to this idea.",
        "tradeoff": "A specific strategic sacrifice required to succeed (e.g., 'To hit the 6-week timeline, you must sacrifice the custom scheduling engine and use a third-party API instead.'). This replaces the generic advice."
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Cleanup any markdown code blocks if the model adds them despite instructions
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return NextResponse.json(JSON.parse(jsonStr));

    } catch (error: any) {
        console.error('[API/Analyze] AI Error:', error);
        return NextResponse.json({
            error: error.message || 'Failed to analyze idea',
            details: error.toString()
        }, { status: 500 });
    }
}
