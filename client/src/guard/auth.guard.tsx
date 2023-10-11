import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { PublicRoutes } from "../models/routes"
import { AppStore } from "../models/interfaces"

export const AuthGuard = () => {
    const activeUser = useSelector((store: AppStore)=> store.user)

    if(activeUser.token)return <Outlet/>
    
    return <Navigate replace to={PublicRoutes.LOGIN}/>
}