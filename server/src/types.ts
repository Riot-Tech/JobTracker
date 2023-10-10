export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

enum jobType {
    FULL_TIME,
    PART_TIME,
    CONTRACT,
}

enum jobModality {
    FULL_TIME = "Full Time",
    PART_TIME = "Part Time",
    CONTRACT = "Contract",
}

export type Application = {
    id: number;
    jobName: string;
    company: string;
    jobType: jobType;
    jobModality: jobModality;
    location: string;
    expectedIncome: number;
    currency: string;
    feedback: string;
    comments: string;
};