import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { FaCartPlus } from "react-icons/fa6";
import { Loader, Card, Crousel } from "../components/index"
import { AiOutlineClose } from "react-icons/ai";
import { VscSearch } from "react-icons/vsc";

export const AllProducts = () => {
    const [categoryName, setcategoryName] = useState(localStorage.getItem("catName") ? JSON.parse(localStorage.getItem("catName")) : localStorage.setItem("catName", JSON.stringify("All")))
    const [products, setProducts] = useState(null)
    const [filterProducts, setFilterProducts] = useState(null)
    const [loader, setLoader] = useState(true)
    const [categories, setCategories] = useState(null)
    const [isNavbar, setIsNavbar] = useState(false)
    const [searchTerm, setSearchTerm] = useState(null)
    
    // Categories Navbar
    const listenScrollEvent = (event) => {
        if (window.scrollY > window.innerHeight/2) return setIsNavbar(true)
        else setIsNavbar(null)
    }

    // Change Navbar Color
    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);

        return () =>
            window.removeEventListener('scroll', listenScrollEvent);
    }, []);
    
    // Get All Categories
    useEffect(() => {
        fetch("https://sujit1210.pythonanywhere.com/api/v1/categories/")
        .then((resp) => resp.json())
        .then((data) => setCategories(data))
    }, [categories])

    // Get All Products
    useEffect(() => {
        fetch(`https://sujit1210.pythonanywhere.com/api/v1/products/`)
        .then(resp => resp.json())
        .then(data => {
            setProducts(data)
            setFilterProducts(data)
            setLoader(false)
        })
    }, [])

    // Filtering Products
    useEffect(() => {
        if (products){
            if (categoryName === "All") setFilterProducts(products)
            else {
                const filterProducts = products.filter(product => product.category[0] === categoryName)
                setFilterProducts(filterProducts)
            }
        }
    }, [categoryName])

    return loader ? <Loader /> : (
        <>
            {/* Categories */}
            <div className={`px-12 mt-16 ${isNavbar ? "top-0" : "-top-32" } duration-700 bg-neutral-800 fixed w-screen z-40`}>
                <button 
                    onClick={() => {
                        localStorage.setItem("catName", JSON.stringify("All")) 
                        setcategoryName("All")}}  
                    className={`capitalize mx-3 font-poppins text-sm font-semibold py-4 ${categoryName == "All" ? "text-orange-400" : "text-white"}`}>All</button>
                {   
                    categories && categories.map(cat => <button key={cat.name} 
                        onClick={
                            () => {localStorage.setItem("catName", JSON.stringify(cat.name))
                            setcategoryName(cat.name)}
                        } 
                        className={`uppercase mx-3 font-poppins text-sm font-semibold py-4 ${cat.name === categoryName ? "text-orange-400" : "text-white"}`}>{cat.name}</button>)
                }
            </div>

            {/* Herosection */}
            <Crousel>
                <div style={{'--image-url': `url("https://mb-demo1.myshopify.com/cdn/shop/files/marbo-fashion-slider-images-01.jpg?v=1695389331&width=1500")`}} className='bg-[image:var(--image-url)] h-screen w-screen bg-cover bg-[50%] relative flex justify-center items-center overflow-hidden px-10'>
                    <div className="py-12 z-10 absolute bg-black opacity-50 px-20">
                        <h1 className="text-white uppercase text-4xl md:text-7xl font-extrabold font-poppins text-center">
                            All New Collection
                        </h1>
                        <p className="text-white w-full md:text-xl text-center font-racing">
                            Treat Yourself, with Awesome Products!
                        </p>
                    </div>
                </div>
                <div style={{'--image-url': `url("https://bcb.ac.in/wp-content/uploads/2021/05/shop37_home_slide1-1536x464.jpg")`}} className='bg-[image:var(--image-url)] h-screen w-screen bg-cover bg-[70%] relative flex justify-center items-center overflow-hidden px-10'>
                    <div className="py-12 z-10 absolute bg-black opacity-50 px-20">
                        <h1 className="text-white uppercase text-4xl md:text-7xl font-extrabold font-poppins text-center">
                            All New Collection
                        </h1>
                        <p className="text-white w-full md:text-xl text-center font-racing">
                        Find the Boundaries. Push Through!
                        </p>
                    </div>
                </div>
                <div style={{'--image-url': `url("https://zaika.bytesed.com/assets/uploads/media-uploader/header-slider-316373824741649660847.jpg")`}} className='bg-[image:var(--image-url)] h-screen w-screen bg-cover bg-[70%] relative flex justify-center items-center overflow-hidden px-10'>
                    <div className="py-12 z-10 absolute bg-black opacity-50 px-20">
                        <h1 className="text-white uppercase text-4xl md:text-7xl font-extrabold font-poppins text-center">
                            All New Collection
                        </h1>
                        <p className="text-white w-full md:text-xl text-center font-racing">
                        Find the Boundaries. Push Through!
                        </p>
                    </div>
                </div>
            </Crousel>
            
            
            <div action="" className="flex justify-center my-12">
                <button className="bg-slate-100 px-2"><VscSearch size={15}/></button>
                <input onChange={(event) => event.target.value === "" ? setSearchTerm(null)  : setSearchTerm(event.target.value)} 
                        className="bg-slate-100 inline min-w-80 text-center py-2 rounded outline-none font-poppins" 
                        type="text" placeholder="serach product..."
                />
            </div>
            {/* Product Section */}
            <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-5 mt-10 mb-5">
                {
                    filterProducts && filterProducts.filter(product => {
                        if (searchTerm) {
                            return product.name.toLowerCase().includes(searchTerm.toLowerCase())
                        } else return product
                    }).map(product => (
                        <Card key={product.id} product={product}/>
                    ))
                }
            </div>
        </>
    )
}

// "https://perly-demo.myshopify.com/cdn/shop/files/slider-006.png?v=1613528351"