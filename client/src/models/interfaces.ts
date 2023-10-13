export interface UserInfo{
    id: number,
    email: string,
    name: string,
    token: string
}

export interface AppStore {
    user: UserInfo
}