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
        
        <div className="flex flex-col min-h-screen font-poppins py-28 px-16 md:px-40">
            {userLoggedIn && <Navigate to="/" />}
            <h2 className="text-[#333333] font-bold text-center text-xl mb-4 font-poppins uppercase">Register</h2>
            <form onSubmit={onSubmit} className="flex flex-col space-y-5">
                <input className="p-3 rounded border text-sm" required onChange={handleChange} name="name" type="text" placeholder="Name"/>
                <input className="p-3 rounded border text-sm" required onChange={handleChange} name="email" type="email" placeholder="Email Address"/>
                <input className="p-3 rounded border text-sm" required onChange={handleChange} name="password" type="password" placeholder="Enter Password"/>
                <input className="p-3 rounded border text-sm" required onChange={handleChange} name="password2" type="password" placeholder="Enter Password Again"/>
                <button className="bg-[#333333] text-white font-poppins font-semibold py-2 text-sm w-[100px] rounded">Register</button>
                <a href="/login" className="text-blue-800 py-4 underline italic">Already have an account.</a>
            </form>
        </div>
    )
}