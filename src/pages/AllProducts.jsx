import { useEffect, useState } from "react"
import { Card, Loader } from "../components/index"

export const AllProducts = () => {
    const [categories, setCategories] = useState(null)
    const [allProducts, setAllProducts] = useState(null)
    const [categoryName, setcategoryName] = useState("")

    // Getting Categories
    useEffect(() => {
        fetch("https://sujit1210.pythonanywhere.com/api/v1/categories/")
        .then((resp) => resp.json())
        .then((data) => setCategories(data))
    }, [categories])

    useEffect(() => {
        const name = JSON.parse(localStorage.getItem("catName"))
        if (name) setcategoryName(name) 
        else setcategoryName("")

        const productsURL = categoryName ? `https://sujit1210.pythonanywhere.com/api/v1/categories/${categoryName}/products/` : "https://sujit1210.pythonanywhere.com/api/v1/products/"
        fetch(productsURL)
        .then(resp => resp.json())
        .then(data => setAllProducts(data))
        .then(() => setLoading(false))
    }, [allProducts, categoryName])


    return (
        <>
            <div style={{'--image-url': `url("https://mb-demo1.myshopify.com/cdn/shop/files/marbo-fashion-slider-images-01.jpg?v=1695389331&width=1500")`}} className='bg-[image:var(--image-url)] h-screen w-screen bg-cover bg-[50%] relative flex justify-center items-center overflow-hidden px-10'>
                <div className="py-12 z-10 absolute bg-black opacity-50 px-20">
                    <h1 className="text-white uppercase text-4xl md:text-7xl lg:text-5xl font-extrabold font-poppins text-center">
                        All New Collection
                    </h1>
                    <p className="text-white w-full md:text-xl text-center font-racing">
                        Treat Yourself, with Awesome Products!
                    </p>
                </div>
            </div>

            <div className=" p-8">
                <select value={categoryName} onChange={(event) => localStorage.setItem("catName", JSON.stringify(event.target.value))} name="categories" className="p-2 rounded-none">
                    <option value="" className="">Categories</option>
                    {
                        categories && categories.map((cat) => (
                            <option key={cat.id} className="cursor-pointer hover:bg-slate-200 font-karla font-[400]" value={cat.name}>{cat.name}</option>
                        ))
                    }
                </select>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
                    {
                        allProducts && allProducts.map((product) => (
                            <Card key={product.id} product={product}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}