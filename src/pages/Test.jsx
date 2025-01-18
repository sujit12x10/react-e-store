import { NavLink } from "react-router-dom"

export const Test
 = ({product}) => {
    
    return (
        <NavLink to={`product/${product.slug}`}>
            <div className="bg-white shadow-md overflow-hidden min-h-96">
                <img src={product.image_url1} alt="" className="w-full h-72" />
                <div className="p-4">
                    <h3 className="text-gray-600 text-sm">{product.name.slice(0, 30)}</h3>
                    <button className="mt-4 font-semibold text-cyan-900 bg-gray-200 px-3 rounded">₹{product.price}</button>
                </div>
            </div>
        </NavLink>
    )
}