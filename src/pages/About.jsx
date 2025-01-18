export const About = () => {
    return (
        <>
            <section style={{'--image-url': `url("https://preview.colorlib.com/theme/selling/images/hero_2.jpg.webp")`}} 
                className='bg-[image:var(--image-url)] bg-cover bg-right-top mt-12'>
                <div className="h-screen items-end bg-backOverlay">
                    <div className="flex flex-col items-center mb-64 px-10 pt-36 text-center">
                        <h1 className="">
                            <span className="text-white text-3xl font-bold font-poppins">BLAKE</span> <br />
                            <span className="text-white font-semibold">Elevate Your Everyday</span>
                        </h1>
                        <p className="italic text-white mt-6">
                            <span className="text-xl">At BLAKE, our purpose is simple, to live and deliver WOW...</span> <br /> <br />
                            We try to provide the very best customer service, customer experience, and company culture. <br />
                            Deliver happiness to customers, employees, vendors, shareholders, and the community in a long-term, sustainable way. 
                        </p>
                        <a href="/products">
                            <button className="text-base uppercase font-bold font-poppins px-4 py-2 mt-4 bg-neutral-800 text-white hover:scale-110 hover:text-cyan-200">
                                Explore Products
                            </button>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

// Your Destination for Quality Finds
// Trending Shop
// Welcome to Trending Shop, where every product tells a story. From handpicked items to the latest trends!