export interface ActivityEntry {
    id: number;
    message: string;
    success: boolean;
}

export type Section = "dashboard" | "profile" | "routine" | "report" | "instructor"
