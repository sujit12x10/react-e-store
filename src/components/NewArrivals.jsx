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
        <div className="flex flex-wrap justify-center px-12 py-16 gap-5">
            {
                products && products.map(product => (
                    <Card key={product.id} product={product}/>
                ))
            }
        </div>
    )
}