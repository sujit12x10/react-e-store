import { onAuthStateChanged } from "firebase/auth";
import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../../firebase/firebase";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [isEmailUser, setIsEmailUser] = useState(false)
    const [isGoogleUser, setIsGoogleUser] = useState(false)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe
    }, [])

    const initializeUser = async (user) => {
        if (user){
            setCurrentUser({...user})
            const isEmail = user.providerData.some((provider) => provider.providerId === "password")
            setIsEmailUser(isEmail)
            setUserLoggedIn(true)
        } else{
            setCurrentUser(null)
            setUserLoggedIn(false)
        }
        setLoading(false)
    }

    const value = {
        userLoggedIn,
        isEmailUser,
        isGoogleUser,
        currentUser,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}