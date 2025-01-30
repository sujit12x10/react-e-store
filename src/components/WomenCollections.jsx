import { useEffect, useState } from "react"
import { Card, Loader } from "./index"

export const WomenCollections = () => {
    const [loader, setLoader] = useState(true)
    const [products, setProducts] = useState(null)
    
    useEffect(() => {
        fetch("https://sujit1210.pythonanywhere.com/api/v1/categories/women/products/")
        .then(resp => resp.json())
        .then(data => {
            setProducts(data.slice(0, 12))
            setLoader(false)
        })
    }, [products])

    return loader ? <Loader /> : (
        <div className="flex flex-wrap justify-center px-12 py-16 gap-5">
            {
                products && products.map(product => (
                    <Card key={product.id} product={product}/>
                ))
            }
        </div>
    )
}