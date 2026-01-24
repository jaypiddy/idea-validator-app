import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // 1. Origin Check (Simple CSRF/Abuse protection)
        const origin = req.headers.get('origin');
        const host = req.headers.get('host');
        // Allow requests if they come from the same host (simple check)
        // In production, you might want to match against a specific env variable like process.env.NEXT_PUBLIC_URL
        if (origin && host && !origin.includes(host)) {
            return NextResponse.json({ error: 'Forbidden: Invalid Origin' }, { status: 403 });
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
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        // 2. Prompt Hardening: XML Tags for clear separation
        const prompt = `
      Act as an optimistic, senior technical architect and agency owner of "Power Shifter".
      Your philosophy is: "Everything is doable. It's just a matter of complexity and time."
      Analyze this startup idea purely from a BUILD & ENGINEERING perspective.
      Do not judge the business viability or market fit. Assume the user has handled that.
      Focus on what makes this technically complex to build vs what is standard boilerplate.

      <input_data>
      <problem>${problem}</problem>
      <problem_impact>${problem_impact}</problem_impact>
      <solution>${solution}</solution>
      <solution_critical_path>${solution_critical_path}</solution_critical_path>
      <features>${features}</features>
      <market>${market}</market>
      <market_behavior_change>${market_behavior_change}</market_behavior_change>
      <competitors>${competitors}</competitors>
      <timeline>${timeline}</timeline>
      <budget>${budget}</budget>
      <execution_owner>${execution_owner}</execution_owner>
      </input_data>

      Return a JSON object with NO markdown formatting, just raw JSON:
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
        "traditionalBuildRationale": "1-2 sentences explaining WHY it takes this long traditionally.",
        "mvpRule": "A declarative statement on the shape of the MVP (e.g. 'This should be a single-flow MVP, not a platform').",
        "good": ["List technical accelerators (e.g., standard auth, simple data model)"],
        "bad": ["List specific complexity drivers (e.g., realtime sync, complex 3rd party integrations, AI training)"],
        "killList": ["List 3-6 specific features/items that should be EXCLUDED from phase 1 to save time/budget"],
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

    } catch (error) {
        console.error('AI Error:', error);
        return NextResponse.json({ error: 'Failed to analyze idea' }, { status: 500 });
    }
}
