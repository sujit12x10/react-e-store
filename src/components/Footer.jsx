import { BsInstagram } from "react-icons/bs"
import { FaXTwitter } from "react-icons/fa6";
import { AiFillYoutube } from "react-icons/ai";
import { FaPinterest } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";

export const Footer = () => {
    const items = [
        {
            name: "CATEGORIES",
            list: ["New Arrivals", "Women's Section", "Men's Section", "Footwear"],
        },
        {
            name: "SUPPORT",
            list: ["Exchange Policy", "Privacy Policy", "Shipping", "Terms of Services"],
        },
        {
            name: "COMPANY",
            list: ["Delivery", "Terms and conditions", "About us", "Secure payment"],
        },
        {
            name: "HELP",
            list: ["Reporting", "Documentation", "Privacy", "Sitemap"],
        },
    ]

    return(
        <footer className="bg-[#212121]">
            <div className="text-white grid grid-cols-12 py-8 px-5 lg:px-20 pt-20">
                <div className="col-span-12 md:col-span-4">
                    <div className="col-span-12 font-poppins md:col-span-6 lg:col-span-2 py-4">
                        <h1 className="font-[900] text-2xl uppercase font-Montserrat">Blake</h1>
                        <p className="mb-6 text-white/60 font-karla">Elevate Your Everyday</p>
                        <button className="p-2 border border-white/60 mr-2">
                            <BsInstagram color="white" size={20}/>
                        </button>
                        <button className="p-2 border border-white/60 mr-2">
                            <FaXTwitter color="white" size={20}/>
                        </button>
                        <button className="p-2 border border-white/60 mr-2">
                            <AiFillYoutube color="white" size={20}/>
                        </button>
                        <button className="p-2 border border-white/60 mr-2">
                            <FaPinterest color="white" size={20}/>
                        </button>
                        <button className="p-2 border border-white/60 mr-2">
                            <MdOutlineMailOutline color="white" size={20}/>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-12 col-span-12 md:col-span-8">
                    {
                        items.map((item) => (
                            <div key={item.name} className="col-span-12 md:col-span-6 lg:col-span-3 font-poppins py-4">
                                <h2 className="font-bold text-white">{item.name}</h2>
                                <hr className="mb-3 w-12 border-orange-500"/>
                                <ul className="font-[500] cursor-pointer text-sm">
                                    {item.list.map(item => (
                                        <li key={item} className="py-1 text-[15px] font-normal text-white/60"><span className="hover:text-orange-300">{item}</span></li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }    
                </div> 
            </div>
            <hr className="mt-5"/>
            <div className="py-6">
                <img className="mx-auto mb-4" src="https://www.danyboutique.com/images/payment.png" alt="" />
                <h1 className="text-center font-bold text-white/60">Copyright ©<span className="uppercase">Blake all rights reserved.</span> </h1>
            </div>
        </footer>
    )
}

