import { NavLink } from "react-router-dom";

export const FeaturedSection = () => {
    
    const items = [
        {
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            title: "Women",
            text: "Fashionable and trendy clothes for women"
        },
        {
            image: "https://preview.vwthemesdemo.com/vw-boutique-pro/wp-content/themes/vw-boutique-pro/assets/images/mens-collection/mens-image.png",
            title: "Men",
            text: "The perfect clothing for every man"
        },
        {
            image: "https://images.unsplash.com/photo-1556048219-bb6978360b84?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Footwear",
            text: "For every generation"
        },
    ]
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 my-20">
            {
                items.map((item) => (
                    <div key={item.title} className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                        <div className="h-96 w-full">
                        <img
                            className="h-full w-full transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                            src={item.image}
                            alt=""
                        />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="mb-10 absolute inset-0 flex translate-y-[60%] flex-col space-y-4 items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 className="font-dmserif text-3xl font-bold text-white">{item.title}</h1>
                            <p className="mb-16 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {item.text}
                            </p>
                            <NavLink to="/products">
                                <button onClick={() => localStorage.setItem("catName", JSON.stringify(item.title.toLowerCase()))} className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
                                    Explore
                                </button>
                            </NavLink>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
