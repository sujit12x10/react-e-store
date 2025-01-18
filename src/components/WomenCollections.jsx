import { useEffect, useState } from "react"
import { Card } from "./index"

export const WomenCollections = () => {
    const [products, setProducts] = useState(null)
    
    useEffect(() => {
        fetch("https://sujit1210.pythonanywhere.com/api/v1/categories/women/products/")
        .then(resp => resp.json())
        .then(data => setProducts(data.slice(0, 12)))
    }, [products])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {
                products && products.map((product) => (
                    <Card product={product}/>
                ))
            }
        </div>
    )
}