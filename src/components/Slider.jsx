import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const Slider = () => {
    const slider = (
        <AutoplaySlider
          play={true}
          animation="cubeAnimation"
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={2000}
        >
            <div data-src="https://avedafashion.myshopify.com/cdn/shop/files/parallaxbackground1.png?v=1614316643"
                className='h-screen bg-cover bg-[60%] mt-16 relative overflow-hidden bg-black'>
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
            <div data-src="https://www.pxdraft.com/wrap/shopapp/assets/img/fashion2/home-banner-3.jpg" />
            <div data-src="https://htmldemo.net/sauget/p2/img/sauget/slide-two.jpg" />
            <div data-src="https://pixelgeeklab.com/html/marvel/images/slides/demo-slide-1.jpg" />
        </AutoplaySlider>
    )
    return (
        <div>
            {slider}
        </div>
    )
}