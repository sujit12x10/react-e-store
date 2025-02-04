export const About = () => {
    return(
        <>
            <div className="grid lg:grid-cols-2 gap-10 mt-28 px-12 md:px-24 mb-20">
                <div className="col-span-1 bg-slate-600">
                    <img className="w-full h-full" src="https://www.pxdraft.com/wrap/shopapp/assets/img/pages/blog_1-6.jpg" alt="" />
                </div>
                <div className="lg:col-span-1 flex flex-col justify-center">
                    <h1 className="font-[900] text-[#333333] text-2xl uppercase font-Montserrat text-center">BLAKE</h1>
                    <span className="font-semibold text-center mb-6">Elevate Your Everyday</span>
                    
                    <p className="font-semibold">
                        <span >At BLAKE, our purpose is simple, to live and deliver WOW...</span> <br />
                        We try to provide the very best customer service, customer experience, and company culture.
                        Deliver happiness to customers, employees, vendors, shareholders, and the community in a long-term, sustainable way.
                        We aim to inspire the world by showing it's possible to simultaneously deliver happiness to customers, employees, vendors, shareholders, and the community in a long-term, sustainable way. 
                    </p>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-2 md:gap-12 bg-neutral-800 px-16 lg:px-28 py-12">
                <div className="grid-cols-1 text-white">
                    <h1 className="text-xl font-bold font-poppins py-4 uppercase">Our Vision</h1>
                    <p>
                    Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.
                    </p>
                </div>
                <div className="grid-cols-1 text-white">
                    <h1 className="text-xl font-bold font-poppins py-4 uppercase">Our Mission</h1>
                    <p>
                        Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.
                    </p>
                </div>
                <div className="grid-cols-1 text-white">
                    <h1 className="text-xl font-bold font-poppins py-4 uppercase">Our Goal</h1>
                    <p>
                    Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.
                    </p>
                </div>
            </div>
        </>
    )
}