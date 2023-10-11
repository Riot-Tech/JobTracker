import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { PublicRoutes } from "../models/routes"

export const AuthGuard = () => {
    const userState = useSelector((store: any)=> store.user)
    
    if(userState.id){
        return <Outlet/>
    }
    return <Navigate replace to={PublicRoutes.LOGIN}/>
}