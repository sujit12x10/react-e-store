import { useState } from "react"
import { doCreateUserWithEmailAndPassword } from "../firebase/auth"
import { useAuth } from "../contexts/authContext"
import { Navigate, useNavigate } from "react-router-dom"


export const Register = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    const [user, setUser] = useState({name:"", email: "", password: "", password2: ""})

    const handleChange = async (event) => {
        const {name, value} = event.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        await doCreateUserWithEmailAndPassword(user.name, user.email, user.password)
        return navigate("/login")
    }

    return (
        
        <div className="flex flex-col  min-h-screen items-center font-poppins px-40 py-36">
            {userLoggedIn && <Navigate to="/" />}
            <h2 className="text-2xl font-bold text-center uppercase">Register</h2>
            <form onSubmit={onSubmit} className="mt-6 p-10 w-96 flex flex-col bg-slate-100 rounded shadow-md">
                <input className="bg-white text-center w-full p-2 my-3 " required onChange={handleChange} name="name" type="text" placeholder="Name"/>
                <input className="bg-white text-center w-full p-2 my-3 " required onChange={handleChange} name="email" type="email" placeholder="Email Address"/>
                <input className="bg-white text-center w-full p-2 my-3 " required onChange={handleChange} name="password" type="password" placeholder="Enter Password"/>
                <input className="bg-white text-center w-full p-2 my-3 " required onChange={handleChange} name="password2" type="password" placeholder="Enter Password Again"/>
                <button className="bg-neutral-900 w-full rounded text-white py-2 mt-2 uppercase font-bold">Register</button>
                <a href="/login" className="text-blue-800 py-4 text-center font-bold uppercase">Already have an account.</a>
            </form>
        </div>
    )
}