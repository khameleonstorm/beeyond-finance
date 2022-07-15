import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"; 
import useAuth from "./useAuth"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase/config";


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuth()
    const navigate = useNavigate()

    const signUp = async(email, password, displayName) => {
        setIsPending(true)
        setError(null)

        try {

            // sign up user
            const res = await 
            createUserWithEmailAndPassword(projectAuth, email, password)
            console.log(res.user)

            if (!res) {
                throw new Error("Sorry, can't create an account")
            }

            // update user profile
            await updateProfile(res.user, { displayName })

            // dispatch login case
            dispatch({type: "LOGIN", payload: res.user})

            // usetting profile doc
            const docRef = doc(db, "profile", res.user.uid)

            await setDoc(docRef, {displayName, uid: res.user.uid})

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


    return { error, isPending, signUp }
}
