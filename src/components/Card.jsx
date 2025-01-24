import { NavLink } from "react-router-dom"

export const Card = ({product}) => {
    
    return (     
            <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                <img src={product.image_url1} alt="" className="w-full h-60 duration-500 group-hover:scale-x-125 group-hover:scale-y-125 transition-transform" />
                <div className="absolute hidden group-hover:block inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                <div className="absolute inset-0 flex flex-col space-y-4 items-center justify-center px-9 text-center translate-y-[60%] transition-all duration-700 group-hover:translate-y-0">
                    <h3 className="text-white italic opacity-0 group-hover:opacity-100 duration-300">{product.name}</h3>
                    <NavLink to={`/product/${product.slug}`}>
                        <button className="bg-neutral-900 shadow shadow-black/60 rounded-full py-2 px-3.5 text-sm capitalize text-white">See More</button>
                    </NavLink>
                </div>
                <h1 className="text-black font-bold mt-4 px-3">₹{product.price}</h1>
            </div>
        
    )
}