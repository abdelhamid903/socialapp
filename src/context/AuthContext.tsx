import React, { createContext, useEffect, useState } from "react";
import type { user } from "../interfaces/user";
import axios from "axios";

export const AuthContext=createContext()


export default function AuthContextProvider({children}){
    const [userData,setUser]=useState<user|null>(null)

    async function getProfile(token:string|null) {
        try {
            const {data}=await axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setUser(data.data.user)
        } catch (err) {
            console.log(err.response.message);
            
        }
        
    }
    useEffect(()=>{
        if (localStorage.getItem('userToken')){
            getProfile(localStorage.getItem('userToken'))
        }
    },[])

    return <AuthContext.Provider value={{userData,setUser}}>
        {children}
    </AuthContext.Provider>
}