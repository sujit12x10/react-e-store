import { Card, Loader } from "../components/index"
import { useState, useEffect } from "react"

export const NewArrivals = () => {
    const [products, setProducts] = useState(null)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        fetch("https://sujit1210.pythonanywhere.com/api/v1/products/")
        .then((resp) => resp.json())
        .then(data => {
            setProducts(data.slice(0, 12))
            setLoader(false)
        })
    }, [products])

    return loader ? <Loader /> : (
        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-5 mt-10 mb-5">
            {
                products && products.map(product => (
                    <Card key={product.id} product={product}/>
                ))
            }
        </div>
    )
}