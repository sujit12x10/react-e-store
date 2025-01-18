import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { Card } from "../components/index";
import { useDispatch } from "react-redux";
import { addProduct, remodveProduct } from "../store/cartSlice";

export const Product = () => {
    const [product, setProduct] = useState(null)
    const [relatedProduct, setRelatedProduct] = useState(null)
    const [currentImage, setCurrentImage] = useState(null)
    const [quantity, setQuantity] = useState(1) 
    const params = useParams()
    const dispatch = useDispatch()

    const notify = (product) => {
        toast.success(`Successfully added to the cart.`)
    }

    // Products
    useEffect(() => {
        fetch(`https://sujit1210.pythonanywhere.com/api/v1/products/${params.slug}/`)
        .then((resp) => resp.json())
        .then((data) => setProduct(data))
    }, [product, relatedProduct]) 
    
    // Related Products
    useEffect(() => {
        product && 
            fetch(`https://sujit1210.pythonanywhere.com/api/v1/categories/${product.category[0]}/products/`)
            .then((resp) => resp.json())
            .then((data) => setRelatedProduct(data.slice(0, 4)))
    }, [product])
    
    return (
        <>
            {
                product && 
                <div className="py-28">
                    <ToastContainer autoClose={2000} position="bottom-left" type="error" theme="dark"/>
                    <div className="flex space-x-8 min-h-screen flex-wrap lg:px-48 px-12">
                        {/* Images */}
                        <div className="w-full lg:w-1/2 h-full">
                            <div className="flex flex-col items-center">
                                <div className="rounded-lg shadow-lg overflow-hidden mb-4">
                                    <img className="" src={currentImage} alt="" />
                                    {!currentImage && <img className="" src={product.image_url1} alt="" />}
                                </div>
                                <div className="flex space-x-2">
                                    { product.image_url1 && <img onClick={() => setCurrentImage(product.image_url1)} className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${currentImage === product.image_url1 ? "border-2 border-black" : ""}`} src={product.image_url1} alt="" />}
                                    { product.image_url2 && <img onClick={() => setCurrentImage(product.image_url2)} className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${currentImage === product.image_url2 ? "border-2 border-black" : ""}`} src={product.image_url1} alt="" />}
                                    { product.image_url3 && <img onClick={() => setCurrentImage(product.image_url3)} className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${currentImage === product.image_url3 ? "border-2 border-black" : ""}`} src={product.image_url1} alt="" />}
                                    { product.image_url4 && <img onClick={() => setCurrentImage(product.image_url4)} className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${currentImage === product.image_url4 ? "border-2 border-black" : ""}`} src={product.image_url1} alt="" />} 
                                </div>
                            </div>
                        </div>
                        {/* Description */}
                        <div className="flex-1 p-10 px-4">
                            <p className="text-orange-500 uppercase font-semibold text-sm mb-2">{product.category}</p>
                            <h1 className="text-gray-900 text-3xl font-bold mb-4">{product.name}</h1>
                            <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                {product.decription}
                            </p>
                            <div className="flex items-center mb-4">
                                <span className="text-gray-900 text-2xl font-bold">₹{product.price}</span>
                                <span className="text-orange-500 bg-orange-100 text-sm font-semibold px-2 py-1 rounded-lg ml-4">{product.discount}%</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border rounded-lg px-4 py-2">
                                    <select onClick={(event) => setQuantity(event.target.value)} className="bg-gray-100" name="" id="">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                            <option key={num} className="bg-gray-100" value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={() => {
                                    dispatch(addProduct({quantity: quantity, ...product }))
                                    notify(product)
                                    }} 
                                    className="flex-1 bg-orange-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-orange-600 transition">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                        {
                            relatedProduct && 
                            <div className="mt-10 p-8">
                                <h2 className="text-center text-xl font-bold">You may also like</h2>
                                <hr className="border-2 border-gray-600 w-20 mt-3 m-auto"/>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">

                                {
                                    relatedProduct.map(product => (
                                        <Card product={product}/>
                                    ))
                                }
                                </div>
                            </div>
                        }
                </div>
            }
        </>
    )
}