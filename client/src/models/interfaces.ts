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

export interface Spontaneous{
    id: number,
    userId: number,
    message: string,
    receiver: string,
    company: string,
    date: string,
    enabled: boolean,
}


export interface SpontaneousInfo extends Array<Spontaneous> {}
export interface ApplicationInfo extends Array<Application> {}

export interface AppStore {
    user: UserInfo,
    applications: ApplicationInfo,
    spontaneous: SpontaneousInfo
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
  