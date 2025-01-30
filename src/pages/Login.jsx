import { doSignInWithEmailAndPassword, doSignInWithGoogle, doSignOut } from "../firebase/auth"
import { setUser } from "../store/cartSlice"
import { useDispatch } from "react-redux"
import { useAuth } from "../contexts/authContext"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userLoggedIn, currentUser } = useAuth()
    const location = useLocation()
    const [user, setUser] = useState({email: "", password: ""})
    const [isSignIn, setIsSignIn] = useState(false)

    const notify = () => {
        toast.success("You are logged in!")
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        if (!isSignIn){
            setIsSignIn(true)
            const result = doSignInWithEmailAndPassword(user.email, user.password)
            notify()
            // navigate("/", {state: "You are now logged in!"})
            setTimeout(() => navigate("/"), 5000)
        }
    }

    return (
        <div className="flex flex-col min-h-screen font-poppins py-28 px-16 md:px-40">
            <ToastContainer autoClose={2000} position="bottom-left" type="error" theme="dark"/>
            {userLoggedIn && <Navigate to="/" />}
            <h1 className="text-xl italic text-red-600 font-bold text-center uppercase mb-6">{location.state?.message}</h1>
            <h2 className="text-[#333333] font-bold text-center text-xl mb-4 font-poppins uppercase">Login</h2>
            <form onSubmit={onSubmit} className="flex flex-col space-y-5">
                <input className="p-3 rounded border text-sm" required onChange={handleChange} name="email" type="email" placeholder="Email"/>
                <input className="p-3 rounded border text-sm" required onChange={handleChange} name="password" type="password" placeholder="Password"/>
                <button className="bg-[#333333] text-white font-poppins font-semibold py-2 text-sm w-[100px] rounded">Log in</button>
                <a href="/register" className="text-blue-800 py-4 underline italic">Don't have an account.</a>
            </form>
        </div>
    )
}



    
    