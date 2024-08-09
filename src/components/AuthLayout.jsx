import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
    //   if(authStatus === true){
    //     navigate('/')
    //   } else if(authStatus === false){
    //     navigate('/login')
    //   }

    // let authValue = authStatus === true ? true : false

    if(authentication && authStatus !== authentication){   //Understand this
        navigate("/login")
    } else if(!authentication && authStatus !== authentication){
        console.log("2nd Condition");
        
        navigate("/")
    }

    setLoader(false)
    
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected
