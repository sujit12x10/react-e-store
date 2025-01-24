import { doSignInWithEmailAndPassword, doSignInWithGoogle, doSignOut } from "../firebase/auth"
import { useAuth } from "../contexts/authContext"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

export const Login = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
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
            await doSignInWithEmailAndPassword(user.email, user.password)
            notify()
            // navigate("/", {state: "You are now logged in!"})
            setTimeout(() => navigate("/"), 5000)
        }
    }

    return (
        <div className="flex flex-col min-h-screen items-center font-poppins px-40 py-28">
            <ToastContainer autoClose={2000} position="bottom-left" type="error" theme="dark"/>
            {userLoggedIn && <Navigate to="/" />}
            <h1 className="text-xl italic text-red-600 font-bold text-center uppercase mb-6">{location.state?.message}</h1>
            <h2 className="text-2xl font-bold text-center uppercase">Login</h2>
            <form onSubmit={onSubmit} className="mt-6 p-10 w-96 flex flex-col bg-slate-100 rounded shadow-md">
                <input className="bg-white text-center w-full p-2 my-3 " required onChange={handleChange} name="email" type="email" placeholder="Email Address"/>
                <input className="bg-white text-center w-full p-2 my-3 " required onChange={handleChange} name="password" type="password" placeholder="Password"/>
                <button className="bg-neutral-900 w-full rounded text-white py-2 mt-2 uppercase font-bold">Log in</button>
                <a href="/register" className="text-blue-800 py-4 text-center font-bold uppercase">Don't have an account.</a>
            </form>
        </div>
    )
}



    
    