import { useEffect, useState } from "react"
import { Card } from "../components/index"

export const AllProducts = () => {
    // const [loading, setLoading] = useState(true)
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
    }, [allProducts, categoryName])


    return (
        <>
            <div className='h-96 mt-16 relative overflow-hidden'>
                <img className="h-full w-full" src="https://preview.colorlib.com/theme/winter/img/banner_img.png" alt="" />
                <div className="mx-auto mb-64 p-12 z-10 absolute top-16 px-10 lg:px-40">
                    <h1 className="text-[#333333] uppercase text-2xl md:text-4xl font-extrabold font-poppins">
                        All 
                        <br />
                        New
                        <br />
                        Collection
                    </h1>
                    <p className="text-gray-600 w-full md:text-xl  font-racing">Treat Yourself, 
                        <br />with Awesome Products!
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {
                        allProducts && allProducts.map((product) => (
                            <Card product={product}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}