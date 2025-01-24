import { Card, Loader } from "../components/index"
import { useState, useEffect } from "react"

export const NewArrivals = () => {
    const [products, setProducts] = useState(null)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        fetch("https://sujit1210.pythonanywhere.com/api/v1/products/")
        .then((resp) => resp.json())
        .then((data) => setProducts(data.slice(0, 12)))
        .then(setLoader(false))
    }, [products])

    return loader ? <Loader /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
            {
                products && products.map((product) => (
                    <Card key={product.id} product={product}/>
                ))
            }
        </div>
    )
}