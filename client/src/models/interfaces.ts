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

export interface Link{
    id?: number,
    userId?: number,
    appId?: number,
    spontId?: number,
    name?: string,
    url?: string,
    enabled?: boolean,
    isCv?: boolean
}

export interface Spontaneous{
    id: number,
    userId: number,
    message: string,
    receiver: string,
    company: string,
    date: string,
    enabled: boolean,
    links: Link[]
}


export interface ApplicationInfo extends Array<Application> {}

export interface AppStore {
    user: UserInfo,
    applications: ApplicationInfo,
    spontaneous: Spontaneous[]
}

export interface LoginForm {
    email: string,
    password: string
}

export interface input {
    name?: string,
    email: string,
    password: string,
  }
  
export type inputSpontaneous = {
    company: string,/* 
    date: string, */
    message: string,
    feedback: string,
    location: string,
    receiver: string,
    link: string,
    [key: string]: string,
  };

export type Spont = {
    id?: number,
    userId?: number,
    date?: string,
    company?: string,
    message?: string,
    feedback?: string,
    location?: string,
    receiver?: string,
    links?: Link[]
  };