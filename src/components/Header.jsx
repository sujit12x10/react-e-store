import { NavLink } from "react-router-dom"
import { IoSearchSharp } from "react-icons/io5"
import { IoCartSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react"
import { useSelector } from "react-redux"

export const Header = () => {
    const [login, setLogin] = useState(false)
    const cartItems = useSelector(state => state.cart)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const items = [
        {
            name: "HOME",
            path: "/"
        },
        {
            name: "SHOP",
            path: "/products"
        },
        {
            name: "CONTACTS",
            path: "/contact"
        },
        {
            name: "ABOUT",
            path: "/about"
        },
    ]
    return(
        <header className="top-0 fixed w-full z-50">
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
                    <button className="text-sm font-[800] bg-black hover:bg-gray-600 text-white py-2 px-8 rounded-3xl">
                        Login
                    </button>
                </nav>
                <div className="flex items-center space-x-6">
                    <button className="text-black hover:text-gray-700">
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
                        <NavLink key={item.name} to={item.path} className="block text-sm px-8 text-gray-700 py-4 font-bold hover:text-white hover:bg-black">
                            {item.name}
                        </NavLink>
                    ))
                }
            </div>}
        </header>
    )
}

