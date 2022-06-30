import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentAdmin } from '../functions/auth.Function'
import LoaddingToRedirect from './loadingToRedirect.Route'

const AdminRoute = ({children}) => {
    const { user } = useSelector((state)=> ({...state}))
    const [ok, setOk] = useState(false)

    useEffect(()=>{
        if(user && user.token){
            currentAdmin(user.token)
            .then(res=>{
                setOk(true)
            }).catch(err=>{
                console.log(err);
                setOk(false)
            })
        }
    },[user])
  return ok ? children : <LoaddingToRedirect/>
}

export default AdminRoute