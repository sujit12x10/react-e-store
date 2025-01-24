import { NavLink, useNavigate } from "react-router-dom"

import { IoSearchSharp } from "react-icons/io5"
import { IoCartSharp } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
import { IoMdInformationCircle } from "react-icons/io";
import { TiMessages } from "react-icons/ti";

import { useState } from "react"
import { useSelector } from "react-redux"
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

export const Header = () => {

    const navigate = useNavigate()
    const [showSearchbar, setShowSearchbar] = useState(false)
    const [isLogoutButton, setIsLogoutButton] = useState(false)
    const { userLoggedIn, currentUser } = useAuth()
    const [login, setLogin] = useState(false)
    const cartItems = useSelector(state => state.cart)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const items = [
        {
            name: "HOME",
            icon: <AiOutlineHome size={20}/>,
            path: "/"
        },
        {
            name: "SHOP",
            icon: <GiShoppingBag size={20}/>,
            path: "/products"
        },
        {
            name: "BLOG",
            icon: <TiMessages size={20}/>,
            path: "/contact"
        },
        {
            name: "ABOUT",
            icon: <IoMdInformationCircle size={20}/>,
            path: "/about"
        },
    ]
    return(
        <>
            {
                isLogoutButton ? 
                <div className="fixed flex justify-center bg-transparent mt-20 pb-4 z-50 w-screen h-28">
                    <div className=" w-60 flex items-center justify-center bg-neutral-950 space-x-2 rounded">
                        <button onClick={ () => doSignOut().then(() => {
                            setIsLogoutButton(false)
                            navigate("/login")
                        })} className="bg-red-800 font-bold text-white px-2 rounded">Logout</button>
                        <button onClick={() => setIsLogoutButton(false)} className="bg-green-300 font-bold text-white px-2 rounded">Cancel</button>
                    </div>
                </div> : ""
            }
            {
                showSearchbar ? 
                <div className="flex justify-center fixed bg-white z-50 w-screen py-6 h-20">
                    <form action="" className="flex justify-center ">
                        <button className="bg-slate-100 px-2"><VscSearch size={15}/></button>
                        <input className="bg-slate-100 inline min-w-80 text-center py-2 rounded outline-none font-poppins" type="text" placeholder="serach product..."/>
                        <button type="none" className="bg-slate-100 px-2" onClick={() => setShowSearchbar(false)}><AiOutlineClose size={15}/></button>
                    </form>
                </div> : ""
            }
            <header className="top-0 fixed w-full z-40">
                <div className="bg-white mx-auto flex px-8 lg:px-32 py-4 justify-between items-center">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden transition-all">
                        {isMenuOpen ? <AiOutlineClose size={30}/> : <GiHamburgerMenu size={30}/>}
                    </button>
                    <div className="ml-2">
                        <a href="/" className="font-[900] text-[#333333] text-2xl uppercase font-Montserrat">
                            Blake
                        </a>
                    </div>
                    <nav className="hidden md:flex space-x-4 text-sm font-medium items-center">
                        {
                            items.map((item) => (
                                <li key={item.name} className="px-3 list-none decoration text-[#333333] text-sm font-[800]">
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
                            <NavLink to="/login">
                                <button className="text-sm font-[800] bg-black hover:bg-gray-600 text-white py-2 px-8 rounded-3xl">
                                    Login
                                </button>
                            </NavLink>
                        }
                        
                    </nav>
                    <div className="flex items-center space-x-6">
                        <button onClick={() => setShowSearchbar(true)} className="text-black hover:text-gray-700">
                            <IoSearchSharp size={25} />
                        </button>
                        <button className="text-black hover:text-gray-500 relative">
                            <NavLink to={"/cart"}>
                                <span className="absolute -mt-3 bg-[#E11313] py-0.5 px-2 font-bold text-xs text-white rounded-3xl">{cartItems.length}</span>
                                <IoCartSharp style={{fontWeight: "bold"}} size={25} />
                            </NavLink>
                        </button>
                    </div>
                </div>
                {isMenuOpen && <div className="md:hidden bg-white border-t w-[70vw] h-[100vh] duration-500">
                    {
                        items.map((item) => (
                            <NavLink key={item.name} to={item.path} className="text-sm px-8 text-gray-700 py-4 font-bold hover:text-white hover:bg-black flex items-center">
                                <span className="mr-2">{item.icon}</span>{item.name}
                            </NavLink>
                        ))
                    }
                </div>}
            </header>
        </>
    )
}

