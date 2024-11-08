import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function CustomCarousel() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  }

  return (
    <div className="w-full">
      <Slider {...settings}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="relative h-60 md:h-40">
            <Image
              src={`/dummy/dummy${i + 1}.png`}
              alt={`Slide ${i + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}
