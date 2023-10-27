export interface UserInfo{
    id: number,
    email: string,
    name: string,
    token: string
}

export interface Application{
    id: number,
    userId: number,
    jobName: string,
    company: string,
    location?: string,
    date: string,
    jobType: string,
    jobModality: string,
    expectedIncome: number,
    currency: string,
    status: string,
    feedback: string,
    comments: string,
    enabled: boolean,
}

/* export interface ApplicationInfo {
    applications: Application[];
} */
export interface ApplicationInfo extends Array<Application> {}

export interface AppStore {
    user: UserInfo,
    applications: ApplicationInfo
}

export interface LoginForm {
    email: string,
    password: string
}

export interface input {
    name?: string,
    email: string;
    password: string;
  }
  