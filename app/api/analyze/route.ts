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
            projectType,
            // Shared
            problem, problem_impact, solution, solution_critical_path, features,
            timeline, budget, execution_owner,
            // Go-to-market
            audience, competitors, differentiation, behavior_change,
            // Internal / enterprise
            internal_users, replaces, integrations, adoption, compliance,
        } = body;

        const isInternal = projectType === 'internal';

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.5-flash' });

        // --- Persona, inputs, and analysis lens fork on the build type ---

        const role = isInternal ? `
      You are a veteran Enterprise Delivery Lead and Solutions Architect at "Power Shifter Digital." You have shipped dozens of internal and enterprise tools into messy, real-world IT environments. You know the build is rarely the hard part — integrations, data migration, security review, and getting busy teams to actually change their behavior are what sink internal projects. Your job is to give an honest signal on DELIVERY and ADOPTION risk, not optimism. Be direct and specific about where this will get stuck.
    ` : `
      You are a veteran VC and Product Strategist at "Power Shifter Digital." Your expertise is "Rapid MVPs." You possess a "ruthless prioritization" mindset. You believe 90% of features are distractions. Your goal is to tell founders the hard truth they need to hear to launch in 6 weeks, not 6 months. Look past the user's optimism and identify the "Execution Risks" and "Scope Creep" that will kill the project.
    `;

        const inputData = isInternal ? `
      - **Build type:** Internal / enterprise tool (a defined group is expected to use it)
      - **Workflow / problem:** ${problem}
      - **Business cost today:** ${problem_impact}
      - **Users (teams/roles & scale):** ${internal_users}
      - **Solution Pitch:** ${solution}
      - **Critical Path (must work):** ${solution_critical_path}
      - **Must-have features:** ${features}
      - **Replaces today (manual/spreadsheet/legacy):** ${replaces}
      - **Required integrations:** ${integrations}
      - **Adoption / change required + who drives it:** ${adoption}
      - **Security & compliance needs:** ${compliance}
      - **Timeline:** ${timeline}
      - **Budget:** ${budget}
      - **Owner after launch + sign-off:** ${execution_owner}
    ` : `
      - **Build type:** Go-to-market product (customers choose whether to use it)
      - **Problem:** ${problem}
      - **Cost to customers if unsolved:** ${problem_impact}
      - **Target customer (who would pay):** ${audience}
      - **Solution Pitch:** ${solution}
      - **Critical Path (must work):** ${solution_critical_path}
      - **Must-have features:** ${features}
      - **Status quo / competitors:** ${competitors}
      - **Differentiation (why they switch):** ${differentiation}
      - **Behavior that must change to adopt:** ${behavior_change}
      - **Timeline:** ${timeline}
      - **Budget:** ${budget}
      - **Owner after launch:** ${execution_owner}
    `;

        const analysisLogic = isInternal ? `
      1. **Map the Integration Surface:** Every system this must connect to (SSO, ERP, CRM, internal API, legacy DB) is a dependency you do not control — it adds auth complexity, data-mapping work, and a team to coordinate with. This is the #1 cost and risk driver for internal tools. Call out which integrations are standard vs. fragile/legacy.
      2. **Find the Adoption Blindspot:** Internal tools fail on adoption, not technology. Weigh the required behavior change against whether there is a real mandate or executive sponsor. A tool that adds steps, that no one is required to use, gets ignored no matter how good it is.
      3. **Treat Compliance & Security as architecture, not features:** SSO, audit logs, PII handling, and data residency shape the build from day one and trigger review cycles that add weeks. Flag any that are underestimated.
      4. **Assess Replacement Risk:** Replacing a spreadsheet is a clean slate. Replacing a legacy system means data migration, feature-parity expectations, and a risky cut-over. Identify which this is.
      5. **Frame value as ROI, not market:** Success is time saved, errors reduced, and risk removed for a FIXED internal user base — never market size or revenue.
    ` : `
      1. **Infer the "Implicit Bloat":** Based on the industry, identify features the user likely *wants* but didn't list, which must be cut to hit a 6-week timeline.
      2. **Find the "Blindspot":** Look at the *Behavior Change* and *Differentiation* answers. Find a non-technical risk (trust, adoption, legal, distribution, switching cost). This is a human failure mode, not a software bug.
      3. **Calculate Viability & Complexity:** Hardware + short timeline = high complexity; AI core without proprietary data = high risk; "platform" scope on a low budget = high complexity.
    `;

        // Both flows return the same 5 readiness keys; their MEANING is reframed by build type.
        const readinessRubric = isInternal ? `
      Score each 0-100 where HIGHER IS HEALTHIER:
      - "problem": clarity & severity of the workflow problem.
      - "market": ADOPTION PRESSURE — how strongly users will actually adopt (clear mandate/sponsor + acute pain = high; optional + adds friction = low).
      - "tech": INTEGRATION FEASIBILITY — how clean the integration & data picture is (few standard integrations = high; many fragile/legacy systems + migration = low).
      - "diff": PROCESS FIT — how cleanly it fits real workflows and replaces the status quo (clean replacement = high; parallel system / extra steps = low).
      - "risk": EXECUTION READINESS — fewer stakeholders, sign-offs, compliance hurdles and moving parts = HIGH; many = low.
    ` : `
      Score each 0-100 where HIGHER IS HEALTHIER:
      - "problem": clarity & severity of the customer problem.
      - "market": MARKET PRESSURE — urgency of demand ("hair on fire" pull = high; needs education/push = low).
      - "tech": TECH FEASIBILITY — ease of implementation (standard/proven = high; complex R&D = low).
      - "diff": DIFFERENTIATION — uniqueness vs the status quo (clear moat = high; commodity = low).
      - "risk": EXECUTION READINESS — fewer dependencies & operational moving parts = HIGH; many = low.
    `;

        const prompt = `
      # SYSTEM ROLE
      ${role}
      Analyze primarily from a BUILD, DELIVERY & ENGINEERING perspective, but frame the advice in your persona's voice.

      # INPUT DATA
      ${inputData}

      # ANALYSIS LOGIC (THINK STEP-BY-STEP)
      ${analysisLogic}

      # SCORING THE READINESS DIMENSIONS
      ${readinessRubric}

      # OUTPUT FORMAT (STRICT JSON)
      Return a JSON object with NO markdown formatting, just raw JSON. The keys must match exactly:

      {
        "score": (integer 0-100, where 100 = Easy/Standard build, 0 = Extremely High Complexity / R&D required),
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
        "traditionalBuildRationale": "1-2 sentences explaining WHY it takes this long the traditional way.",
        "mvpRule": "A declarative statement on the shape of the MVP (e.g. 'This should be a single-flow MVP, not a platform').",
        "good": ["List the accelerators (standard auth, simple data model, ${isInternal ? 'one clean integration, a clear sponsor' : 'proven patterns'})"],
        "bad": ["List the specific complexity drivers (${isInternal ? 'fragile/legacy integrations, data migration, compliance review, weak adoption mandate' : 'realtime sync, complex 3rd-party integrations, AI training, switching cost'})"],
        "killList": ["List 3-5 features you INFERRED that must be EXCLUDED from phase 1 to ship fast. Be specific."],
        "aiHumanMix": {
             "aiPercent": (integer 0-100),
             "humanPercent": (integer 0-100),
             "rationale": "Short explanation of what AI accelerates vs where humans are needed."
        },
        "timelineNarrative": ["Week 1-2: [Goal]", "Week 3-4: [Goal]", "Week 5-6: [Goal]"],
        "decisionGate": {
            "proceed": (boolean),
            "reason": "Short reason to proceed / pivot / pause based on feasibility."
        },
        "verdict": "An encouraging but honest summary. Explain WHY it takes the estimated time based on the complexity.",
        "unsaidRisk": "${isInternal
                ? 'The single biggest NON-technical risk to delivery — usually adoption, a missing sponsor, compliance review, or stakeholder sign-off. Be specific to this tool.'
                : 'One critical non-technical risk the score does not capture (trust, legal, distribution, adoption). Be specific to this idea.'}",
        "tradeoff": "A specific strategic sacrifice required to hit the timeline (e.g. ${isInternal
                ? "'To launch in 6 weeks, integrate with only the system of record and defer the NetSuite sync to phase 2.'"
                : "'To hit the 6-week timeline, drop the custom engine and use a third-party API instead.'"})."
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
