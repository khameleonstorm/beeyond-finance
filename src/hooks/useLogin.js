import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"
import useAuth from "./useAuth"
import { useNavigate } from "react-router-dom"


export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuth()
    const navigate = useNavigate()



    const login = async (email, password ) => {
        setError(null)
        setIsPending(true)

        try {

            // sign up user
            const res = await 
            signInWithEmailAndPassword(projectAuth, email, password)
            console.log(res.user)

            if (!res) {
                throw new Error("Sorry, you don't have an account")
            }

            // dispatch login case
            dispatch({type: "LOGIN", payload: res.user})

            if(isCancelled === true){
                setIsPending()
                setError()
            } else{
                setIsPending(false)
                setError(null)
            }

            navigate('/dashboard')

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


    return { error, isPending, login }
}
