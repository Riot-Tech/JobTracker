export interface UserInfo{
    id: number,
    email: string,
    name: string,
    token: string
}

export interface AppStore {
    user: UserInfo
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
  