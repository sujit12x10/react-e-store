import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { HeroImage, Loader, Crousel  } from "../components/index"
import { ToastContainer, toast } from 'react-toastify';
import { ProductCard, WomenCollections, MenCollections, FeaturedSection, Card, NewArrivals } from "../components/index"

export const Home = () => {

    const [loader, setLoader] = useState({
        newArrivalLoader: true,
        womenCollectionLoader: true,
        menCollectionLoader: true,
    })
    const [products, setProducts] = useState(null)
    const location = useLocation()

    const notify = () => {
        toast.success(location.state)
    }

    // useEffect(() => {
    //     location.state && notify()
    // }, [])

    useEffect(() => {
        fetch("https://sujit1210.pythonanywhere.com/api/v1/products/")
        .then((resp) => resp.json())
        .then((data) => setProducts(data))
    }, [products])

    return (
        <>
            <Crousel>
                <div style={{'--image-url': `url("https://avedafashion.myshopify.com/cdn/shop/files/parallaxbackground1.png?v=1614316643")`}} className='bg-[image:var(--image-url)] h-screen w-screen bg-cover bg-[60%] relative overflow-hidden'>
                    <div className="mb-64 z-10 absolute top-1/3 px-10 md:px-20">
                        <h1 className="text-[#333333] uppercase text-4xl md:text-6xl lg:text-7xl font-extrabold font-poppins">
                            Style 
                            <br />
                            Your
                            <br />
                            Confidence
                        </h1>
                        <p className="text-gray-600 w-full font-racing text-2xl">Dress smart, look trendy!</p>
                        <a href="/products" className="bg-neutral-800 font-Montserrat text-white uppercase text-sm font-semibold px-4 py-2 mt-2 inline-block hover:scale-110 hover:text-gray-300 transition-all">
                            Explore Products
                        </a>
                    </div>
                </div>
                
                <div style={{'--image-url': `url("https://www.pxdraft.com/wrap/shopapp/assets/img/fashion2/home-banner-3.jpg")`}} className='bg-[image:var(--image-url)] h-screen w-screen bg-cover bg-[60%] relative overflow-hidden'>
                    <div className="mb-64 z-10 absolute top-1/3 px-14 md:px-20">
                        <h1 className="text-white uppercase text-4xl md:text-6xl lg:text-7xl font-extrabold font-poppins">
                            20% OFF NEW! 
                            <br />
                            Limited Edition
                            <br />
                            Collection
                        </h1>
                        <p className="text-gray-600 w-full font-racing text-2xl">Get more for less!</p>
                        <a href="" className="bg-neutral-800 font-Montserrat text-white uppercase text-sm font-semibold px-4 py-2 mt-2 inline-block hover:scale-110 hover:text-gray-300 transition-all">
                            Shop Now
                        </a>
                    </div>
                </div>
                
                <div style={{'--image-url': `url("https://pixelgeeklab.com/html/marvel/images/slides/demo-slide-3.jpg")`}} className='bg-[image:var(--image-url)] h-screen w-screen bg-cover bg-[40%] relative overflow-hidden'>
                    <div className="flex flex-col justify-center h-screen z-10 absolute right-0 px-14 md:px-20">
                        <h1 className="text-black text-center uppercase text-4xl md:text-6xl lg:text-7xl font-extrabold font-poppins">
                            All the trends 
                            <br />
                            you need
                        </h1>
                        <a onClick={(event) => localStorage.setItem("catName", JSON.stringify("footwear"))} href="/products" className="bg-neutral-800 font-poppins text-white uppercase text-sm font-semibold px-4 py-2 mt-2 mx-auto hover:scale-110 hover:text-gray-300 transition-all">
                            Shop Now
                        </a>
                    </div>
                </div>
            </Crousel>
       
            <ToastContainer autoClose={2000} position="bottom-left" type="error" theme="dark"/>

            <div className="p-12">
                <h2 className="font-poppins text-center text-4xl font-bold">Popular categories</h2>
                <FeaturedSection />

                {/* New Arrivals */}
                <div className="">
                    <h2 className="font-poppins text-center text-3xl font-bold">NEW ARRIVALS</h2>
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
                        <p className="text-gray-600 w-full md:text-xl font-racing">From Least To Almost</p>
                        <a href="" className="bg-neutral-800 font-Montserrat text-white uppercase text-xs font-semibold px-4 py-2 mt-2 inline-block hover:scale-110 hover:text-gray-300 transition-all">
                            Shop Now
                        </a>
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="text-center text-xl font-bold">POPULAR IN WOMEN</h2>
                    <hr className="border-2 border-gray-600 w-20 mt-3 m-auto"/>
                    <WomenCollections />
                </div>

                {/* Men Section */}
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
                        <a href="" className="bg-neutral-800 font-Montserrat text-white uppercase text-xs font-semibold px-4 py-2 mt-2 inline-block hover:scale-110 hover:text-gray-300 transition-all">
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