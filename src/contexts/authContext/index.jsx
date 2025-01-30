import { onAuthStateChanged } from "firebase/auth";
import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/cartSlice";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch()
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
            dispatch(setUser({
                id: user.uid,
                name: user.displayName,
                email: user.email,
            }))
            setUserLoggedIn(true)
        } else{
            dispatch(setUser([]))
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