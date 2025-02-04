import { NavLink, useNavigate } from "react-router-dom"
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartSharp } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai";
import { GrContact } from "react-icons/gr";
import { AiOutlineHome } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
import { IoMdInformationCircle } from "react-icons/io";
import { CgLogIn } from "react-icons/cg";
import { TiMessages } from "react-icons/ti";
import { Card } from "../components/index"
import { motion } from "framer-motion";

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

export const Header = () => {

    const items = [
        {
            name: "HOME",
            icon: <AiOutlineHome size={25}/>,
            path: "/"
        },
        {
            name: "SHOP",
            icon: <GiShoppingBag size={25}/>,
            path: "/products"
        },
        {
            name: "CONTACT",
            icon: <GrContact size={25}/>,
            path: "/contact"
        },
        {
            name: "ABOUT",
            icon: <IoMdInformationCircle size={25}/>,
            path: "/about"
        },
    ]
    const navigate = useNavigate()
    const [products, setProducts] = useState(null)
    const [isLogoutButton, setIsLogoutButton] = useState(false)
    const { userLoggedIn, currentUser } = useAuth()
    const cartItems = useSelector(state => state.cart)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [header, setHeader] = useState(false)
    
    const listenScrollEvent = (event) => {
        if (window.scrollY > window.innerHeight/3) return setHeader(true)
        else setHeader(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);

        return () =>
            window.removeEventListener('scroll', listenScrollEvent);
    }, []);
    
    useEffect(() => {
        fetch("https://sujit1210.pythonanywhere.com/api/v1/products/")
        .then(response => response.json())
        .then(data => {
            setProducts(data)
        })
    }, [])
    
    return(
        <>
            <div className={`fixed ${!isLogoutButton ? "hidden" : ""} z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
                <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
                    <div className="flex justify-end p-2">
                        <button onClick={() => setIsLogoutButton(false)} type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <AiOutlineClose size={20}/>
                        </button>
                    </div>

                    <div className="p-6 pt-0 text-center">
                        <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to signout?</h3>
                        <a href="#" onClick={ () => doSignOut().then(() => {
                                        setIsLogoutButton(false)
                                        navigate("/login")
                                    })}
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            Yes, I'm sure
                        </a>
                        <a href="#" onClick={() => setIsLogoutButton(false)}
                            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                            data-modal-toggle="delete-user-modal">
                            No, cancel
                        </a>
                    </div>

                </div>
            </div>

            {/* Navigation */}
            <motion.header
                initial={{ y: -250 }}
                animate={{ y: 0 }}
                transition={{delay:2 ,duration: 2, type:"spring", stiffness:200 }}
                className="top-0 fixed w-full z-50"
            >
                <div className={`${header ? "bg-white" : "transparent"} lg:px-32 py-4 px-6 flex justify-between items-center`}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden transition-all ml-6">
                        {isMenuOpen ? <AiOutlineClose size={20}/> : <GiHamburgerMenu size={30}/>}
                    </button>
                    <div className="">
                        <a href="/" className="font-[900] text-[#333333] text-2xl uppercase font-Montserrat">
                            Blake
                        </a>
                    </div>

                    <nav className="hidden md:flex text-sm font-medium items-center">
                        <ul className="flex">
                            {
                                items.map((item) => (
                                <li key={item.name} className="list-none decoration text-[#333333] text-sm font-[800] px-4 py-2">
                                    <NavLink
                                        className={({isActive}) => isActive ? "border-b-2 border-gray-800 pb-2" : ""}
                                        to={item.path}>
                                        {item.name}
                                    </NavLink>
                                </li>
                                ))
                            }
                            {
                            userLoggedIn ? 
                            <button onClick={() => setIsLogoutButton(true)} className="text-sm font-[800] bg-black hover:bg-gray-600 text-white py-2 px-8 rounded-3xl">
                                Logout
                            </button> : 
                            <NavLink to="/login" className="text-sm font-[800] bg-black hover:bg-gray-600 text-white py-2 px-8 rounded-3xl">
                                Login
                            </NavLink>
                        }
                        </ul>
                    </nav>
                    <div className="flex items-center">
                        <button className="text-black hover:text-gray-500 relative mr-4">
                            <NavLink to={"/cart"}>
                                <span className="absolute -mt-3 bg-[#E11313] py-0.5 px-2 font-bold text-xs text-white rounded-full">{cartItems.length}</span>
                                <IoCartSharp style={{fontWeight: "bold"}} size={25} />
                            </NavLink>
                        </button>
                    </div>
                </div>
                <div className={`absolute ${isMenuOpen ? "left-0" : "-left-24"} top-0 inline-block z-[60] bg-[#212121] text-white/80  h-[100vh] duration-700 shadow-lg font-poppins`}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="px-8 py-5 hover:rotate-180 duration-1000"><AiOutlineClose size={20} color="red"/></button>
                    {
                        userLoggedIn ? 
                        <button onClick={() => setIsLogoutButton(true)} className="relative text-sm px-8 py-4 font-bold flex items-center group hover:bg-slate-200 hover:shadow-lg hover:text-white">
                            <span className="mr-2 group-hover:text-black group-hover:rotate-45 duration-700"><FaRegCircleUser size={20}/></span><span className="absolute hidden text-center left-24 p-4 bg-[#212121] text-[0.68rem] group-hover:block w-32 shadow-lg shadow-green-200">LOGOUT</span>
                        </button> :
                        <NavLink to="/login" className="relative text-sm px-8 py-4 font-bold flex items-center group hover:bg-slate-200 hover:shadow-lg hover:text-white">
                        <span className="mr-2 group-hover:text-black group-hover:rotate-45 duration-700"><CgLogIn size={20}/></span><span className="absolute hidden text-center left-24 p-4 bg-[#212121] text-[0.68rem] group-hover:block w-32 shadow-lg shadow-green-200">LOGIN</span>
                    </NavLink>
                    }
                    
                    {
                        items.map((item) => (
                            <NavLink key={item.name} to={item.path} className="relative text-sm px-8 py-4 font-bold flex items-center group hover:bg-slate-200 hover:shadow-lg hover:text-white">
                                <span className="mr-2 group-hover:text-black group-hover:rotate-45 duration-700">{item.icon}</span><span className="absolute hidden text-center left-24 p-4 bg-[#212121] text-[0.68rem] group-hover:block w-32 shadow-lg shadow-green-200">{item.name}</span>
                            </NavLink>
                        ))
                    }
                </div>
            </motion.header>
        </>
    )
}

