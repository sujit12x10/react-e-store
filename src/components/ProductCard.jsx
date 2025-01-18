import { NavLink } from "react-router-dom"
import { useId } from "react"

export const ProductCard = ({products}) => {
    const id = useId()
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-x-[20px] mt-8">
            {
                products && products.map((product) => (
                    <NavLink key={product.id} to={`/product/${product.slug}`}>
                        <div className="my-2 flex flex-col items-center min-h-[280px]">
                            <div className="h-[200px] flex bg-black">
                                <img src={product.image_url1} alt="" className="w-full"/>
                            </div>
                            <div className="py-4">
                                <h4 className="text-gray-700 font-[500]">{product.name.substring(0,30)}</h4>
                                <h2 className="font-bold">${product.price}</h2>
                            </div>
                        </div>
                    </NavLink>
                ))
            }
        </div>
    )
}


// {
//     "title": "Tie Front Floral Print Long Sleeve Crop Tops",
//     "price": 199,
//     "description": "Material : Polyester : 92%, Lycra: 8%",
//     "categoryId": 24,
//     "images": ["https://littleboxindia.com/cdn/shop/files/bbcef86d9b1f3a164735ce9b4b2fd61f.jpg?v=1735207947", "https://littleboxindia.com/cdn/shop/files/a34c3fe50d0ea07e838b1da283b599b3.jpg?v=1735207947", "https://littleboxindia.com/cdn/shop/files/4a07f78f16ed7e28a653aa04692ca945.jpg?v=1735207947"]
// }
