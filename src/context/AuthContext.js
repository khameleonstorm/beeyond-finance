import { createContext, useReducer,  useEffect } from 'react'
import { projectAuth } from "../firebase/config"

export const AuthContext = createContext()

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        case 'AUTH_STATE_CHANGE':
            return {...state, user: action.payload, authIsReady: true }
    
        default:
            return state
    }
}

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, {user: null, authIsReady: false})

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged(user => {
            dispatch({type: "AUTH_STATE_CHANGE", payload: user})
            unsub()
        })
    }, [])

    console.log(state)


  return (
    <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
  )
}
