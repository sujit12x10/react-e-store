import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { FaCartPlus } from "react-icons/fa6";
import { Loader, Card } from "../components/index"

export const AllProducts = () => {
    const [categoryName, setcategoryName] = useState(localStorage.getItem("catName") ? JSON.parse(localStorage.getItem("catName")) : localStorage.setItem("catName", JSON.stringify("All")))
    const [products, setProducts] = useState(null)
    const [filterProducts, setFilterProducts] = useState(null)
    const [loader, setLoader] = useState(true)
    const [categories, setCategories] = useState(null)
    const [navColor, setNavColor] = useState(null)
    
    // Navbar Color Changer Function
    const listenScrollEvent = (event) => {
        if (window.scrollY > window.innerHeight/2) return setNavColor("bg-neutral-800")
        else setNavColor(null)
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
            <div className={`px-12 mt-16 ${navColor ? "" : "hidden"} bg-neutral-800 fixed w-screen z-50`}>
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

            {/* Product Section */}
            <div className="flex flex-wrap justify-center px-12 py-16 gap-5">
                {
                    filterProducts && filterProducts.map(product => (
                        <Card key={product.id} product={product}/>
                    ))
                }
            </div>
        </>
    )
}