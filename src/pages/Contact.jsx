import { AiFillYoutube } from "react-icons/ai"
import { BsInstagram } from "react-icons/bs"
import { FaXTwitter, FaPinterest } from "react-icons/fa6"
import { MdOutlineMailOutline } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5";

export const Contact = () => {
    return (
        <div>
            <div className="h-[70vh] overflow-hidden">
                <div className="bg-white z-20 absolute w-screen h-[70vh] opacity-30 flex justify-center items-center">
                    <h1 className="text-4xl font-bold font-poppins uppercase">Contact Us</h1>
                </div>
                <img className="w-screen h-full z-10" src="https://images.pexels.com/photos/3184286/pexels-photo-3184286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 p-6 py-32 lg:p-32 font-poppins">
                <div className="bg-[#FCFBF4] shadow-lg border rounded text-center py-10">
                    <h1 className="text-xl font-bold uppercase mb-3 text-[#333333]">New Delhi Office</h1>
                    <p className="text-base">
                        Nehru Place <br />
                        New Delhi <br />
                        Delhi 110019<br />
                    </p>
                </div>
                <div className="bg-[#FCFBF4]  shadow-lg border rounded text-center py-10">
                    <h1 className="text-xl font-bold uppercase mb-3 text-[#333333]">Bangalore Office</h1>
                    <p className="text-base">
                        Dickenson Road <br />
                        Bangalore <br />
                        Karnataka 560042 <br />
                    </p>
                </div>
                <div className="bg-[#FCFBF4] text-center py-10 shadow-lg border">
                        <h1 className="text-xl font-bold uppercase mb-3 text-[#333333]">Social</h1>
                        <button className="p-2 border border-black/60 mr-2">
                            <BsInstagram color="black" size={20}/>
                        </button>
                        <button className="p-2 border border-black/60 mr-2">
                            <FaXTwitter color="black" size={20}/>
                        </button>
                        <button className="p-2 border border-black/60 mr-2">
                            <AiFillYoutube color="black" size={20}/>
                        </button>
                        <button className="p-2 border border-black/60 mr-2">
                            <FaPinterest color="black" size={20}/>
                        </button>
                        <button className="p-2 border border-black/60 mr-2">
                            <MdOutlineMailOutline color="black" size={20}/>
                        </button>
                </div>
            </div>
            <div className="px-6 pb-32 lg:px-32">
                <h1 className="text-[#333333] font-bold text-xl mb-4 font-Montserrat">Write to us</h1>
                <form action="" className="flex flex-col space-y-5">
                    <input className="p-3 rounded border text-sm" type="text" placeholder="Your Name"/>
                    <input className="p-3 rounded border text-sm" type="email" placeholder="Email"/>
                    <textarea className="resize-none p-3 rounded border text-sm" name="" cols="30" rows="10" id="" placeholder="Enter your message here..."></textarea>
                    <button className="bg-[#333333] text-white font-poppins font-semibold py-2 text-sm w-[100px] rounded">Send Now</button>
                </form>
            </div>
        </div>
    )
}
