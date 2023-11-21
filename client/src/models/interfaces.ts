export interface UserInfo{
    id: number,
    email: string,
    name: string,
    token: string,
    linkedIn: string,
    portfolio: string,
    gitHub: string,
    profilePicture: string
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

export interface File{
    id: number,
    userId: number,
    name: string,
    url: string,
    enabled: boolean,
    isCv: boolean
}

export interface Spontaneous{
    id: number,
    userId: number,
    message: string,
    receiver: string,
    company: string,
    date: string,
    enabled: boolean,
    link: string,
}

export interface SpontaneousState{
    EmptySpontaneous: Spontaneous[],
    EmptyCopySpontaneous: Spontaneous[]
}

export interface ApplicationsState{
    EmptyApplications: Application[],
    EmptyCopyApplications: Application[]
}

export interface AppStore {
    user: UserInfo,
    applications: ApplicationsState,
    spontaneous: SpontaneousState
    sideBarOpen: boolean
}

export interface LoginForm {
    email: string,
    password: string
}

export interface input {
    name: string,
    email: string,
    password: string,
    linkedIn: string,
    gitHub: string,
    portfolio: string,
    [key: string]: string,
  }

export interface inputLogin {
    email: string,
    password: string,
    [key: string]: string;
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

export type inputFile = {
    name: string,
    isCv: boolean,
}

export type fileErrors = {
    // name: string,
    file: string,
}

export type Spont = {
    id?: number,
    userId?: number,
    date?: string,
    company?: string,
    message?: string,
    feedback?: string,
    location?: string,
    receiver?: string,
    link?: string,
  };