
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
};

export type FormData = {
    problem: string;
    problem_impact: string; // New: What happens if unsolved...
    audience: string;
    solution: string;
    solution_critical_path: string; // New: What part must work...
    features: string;
    market: string;
    market_behavior_change: string; // New: What behavior must change...
    competitors: string;
    timeline: string;
    budget: string;
    execution_owner: string; // New: Who would own this...
}

export const initialFormData: FormData = {
    problem: '',
    problem_impact: '',
    audience: '',
    solution: '',
    solution_critical_path: '',
    features: '',
    market: '',
    market_behavior_change: '',
    competitors: '',
    timeline: '',
    budget: '',
    execution_owner: '',
}
