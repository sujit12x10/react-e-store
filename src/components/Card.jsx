import { NavLink } from "react-router-dom"

export const Card = ({product}) => {
    
    return (     
        <div className="bg-white shadow hover:scale-105 duration-300 w-72 overflow-hidden rounded" key={product.id}>
            <img className="h-80 w-full" src={product.image_url1} alt="" />
            <div className="px-4 py-3">
                <span className="text-orange-500 bg-orange-100 uppercase text-xs font-bold px-2 py-1 rounded">{product.category[0]}</span>
                <p className="text-sm font-semibold truncate capitalize py-3">{product.name}</p>
                <div className="flex items-center py-3">
                    <p className="text-sm font-bold bg-green-100 text-green-600 rounded py-1 px-2">₹ {product.price}</p>
                    <div className="ml-auto">
                        {/* <button className="flex items-center bg-[#333] text-white px-2 py-1 rounded text-sm"><span className="mr-1"><FaCartPlus color="white" size={12}/></span>Add to Cart</button> */}
                    </div>
                </div>
            </div>
        </div>
        
    )
}