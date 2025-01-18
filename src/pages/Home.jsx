import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { HeroImage  } from "../components/index"
import { ProductCard, WomenCollections, MenCollections, FeaturedSection, Card, NewArrivals } from "../components/index"

export const Home = () => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        fetch("https://sujit1210.pythonanywhere.com/api/v1/products/")
        .then((resp) => resp.json())
        .then((data) => setProducts(data))
    }, [products])

    return (
        <>
            {/* Hero Section */}
            <div style={{'--image-url': `url("https://avedafashion.myshopify.com/cdn/shop/files/parallaxbackground1.png?v=1614316643")`}} 
            className='bg-[image:var(--image-url)] h-screen bg-cover bg-[60%] mt-16 relative overflow-hidden'>
                <div className="mb-64 z-10 absolute top-1/4 px-14 md:px-20">
                    <h1 className="text-[#333333] uppercase text-4xl md:text-6xl lg:text-7xl font-extrabold font-poppins">
                        Style 
                        <br />
                        Your
                        <br />
                        Confidence
                    </h1>
                    <p className="text-gray-600 w-full font-racing text-2xl">Dress smart, look trendy!</p>
                    <a href="" className="bg-neutral-800 font-Montserrat text-white uppercase text-sm font-semibold px-4 py-2 mt-2 rounded-md inline-block hover:scale-110 hover:text-gray-300 transition-all">
                        Shop Now
                    </a>
                </div>
            </div>

            {/* Offers Section */}
            <div className="pt-0 p-12">
                <FeaturedSection />
                <div className="mt-10">
                    <h2 className="text-center text-xl font-bold">NEW ARRIVALS</h2>
                    <hr className="border-2 border-gray-600 w-20 mt-3 m-auto"/>
                </div>
                <NewArrivals />

                {/* Women's Section */}
                <div className='h-80 mt-8 relative'>
                    <img className="h-full w-full" src="https://preview.colorlib.com/theme/coloshop/images/slider_1.jpg.webp" alt="" />
                    <div className="mx-auto mb-64 p-12 z-10 absolute top-8 md:top-3 px-10 md:px-40">
                        <h1 className="text-[#333333] uppercase text-2xl md:text-4xl font-extrabold font-poppins">
                            Women's 
                            <br />
                            Latest
                            <br />
                            Style
                        </h1>
                        <p className="text-gray-600 w-full md:text-xl font-racing">Get more for less!</p>
                        <a href="" className="bg-neutral-800 font-Montserrat text-white uppercase text-sm font-semibold px-4 py-2 mt-2 rounded-md inline-block hover:scale-110 hover:text-gray-300 transition-all">
                            Shop Now
                        </a>
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="text-center text-xl font-bold">POPULAR IN WOMEN</h2>
                    <hr className="border-2 border-gray-600 w-20 mt-3 m-auto"/>
                    <WomenCollections />
                </div>

                <div className='h-80 mt-8 relative'>
                    <img className="h-full w-full" src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/dafed838-121b-474b-b192-d35effda5181.__CR0,0,1464,600_PT0_SX1464_V1___.jpg" alt="" />
                    <div className="mx-auto mb-64 p-12 z-10 absolute top-8 md:top-3 px-10 md:px-40">
                        <h1 className="text-[#333333] uppercase text-2xl md:text-4xl font-extrabold font-poppins">
                            ultimate 
                            <br />
                            men's
                            <br />
                            apparel 
                        </h1>
                        <p className="text-gray-600 w-full md:text-xl font-racing">Designed For Apparel!</p>
                        <a href="" className="bg-neutral-800 font-Montserrat text-white uppercase text-sm font-semibold px-4 py-2 mt-2 rounded-md inline-block hover:scale-110 hover:text-gray-300 transition-all">
                            Shop Now
                        </a>
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="text-center text-xl font-bold">POPULAR IN MEN</h2>
                    <hr className="border-2 border-gray-600 w-20 mt-3 m-auto"/>
                    <MenCollections />
                </div>
            </div>
        </>
    )
}

[
    "https://preview.colorlib.com/theme/divisima/img/bg.jpg.webp", 
    "https://preview.colorlib.com/theme/coloshop/images/slider_1.jpg.webp", 
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/dafed838-121b-474b-b192-d35effda5181.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
    "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/home-new-bg-free-img.jpg",
    "https://preview.colorlib.com/theme/winter/img/banner_img.png",
]