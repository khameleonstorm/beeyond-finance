import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { projectAuth } from "../firebase/config";
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuth()
    const navigate = useNavigate()

    // creating a logout function
    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            await signOut(projectAuth)

            // dispatching a logout function
            dispatch({ type: "LOGOUT" })
            navigate('/login')

            if(isCancelled === true){
                setIsPending()
                setError()
            } else{
                setIsPending(false)
                setError(null)
            }

        } catch (err) {
            if(isCancelled === true){
                setIsPending()
                setError()
            } else{
                setIsPending(false)
                setError(err.message)
                console.log(err.message)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, logout }
    
}