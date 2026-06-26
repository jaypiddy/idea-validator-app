
export type AnalysisResult = {
    score: number;
    readiness: {
        problem: number;
        market: number;
        tech: number;
        diff: number;
        risk: number;
    };
    complexity: string;
    complexitySummary: string;
    monthsToBuild: number;
    traditionalBuildRationale: string;
    mvpRule: string;
    good: string[];
    bad: string[];
    killList: string[];
    aiHumanMix: {
        aiPercent: number;
        humanPercent: number;
        rationale: string;
    };
    timelineNarrative: string[];
    decisionGate: {
        proceed: boolean;
        reason: string;
    };
    verdict: string;
    unsaidRisk?: string; // New field for "Unsaid Risk" section
    tradeoff?: string; // New field for "The Tradeoff" section
};

// Which kind of build this is. Drives the question set, the analysis lens,
// and the report's readiness dimension labels.
export type ProjectType = 'gtm' | 'internal';

export type FormData = {
    projectType: ProjectType;

    // Shared across both flows
    problem: string;
    problem_impact: string;
    solution: string;
    solution_critical_path: string;
    features: string;
    timeline: string;
    budget: string;
    execution_owner: string;

    // Go-to-market product only
    audience: string;          // target customer
    competitors: string;       // status quo / competitors
    differentiation: string;   // why they switch to you
    behavior_change: string;   // behavior that must change to adopt

    // Internal / enterprise tool only
    internal_users: string;    // which teams/roles, and roughly how many
    replaces: string;          // manual process / spreadsheet / legacy system
    integrations: string;      // systems it must connect to
    adoption: string;          // what must change in how people work + who drives it
    compliance: string;        // security / compliance / data-governance needs
}

export const initialFormData: FormData = {
    projectType: 'gtm',

    problem: '',
    problem_impact: '',
    solution: '',
    solution_critical_path: '',
    features: '',
    timeline: '',
    budget: '',
    execution_owner: '',

    audience: '',
    competitors: '',
    differentiation: '',
    behavior_change: '',

    internal_users: '',
    replaces: '',
    integrations: '',
    adoption: '',
    compliance: '',
}
