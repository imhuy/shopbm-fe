"use client";

import { useEffect, useRef, useState } from "react";
import Heading from "./Heading/Heading";

// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import CardCategory1 from "./CardCategories/CardCategory1";
import { CATS_DISCOVER } from "./CardCategories/data";
const DiscoverMoreSlider = () => {
  const sliderRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
 
      perView: 3,
      gap: 20,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 3,
        },
        1279: {
          gap: 20,
          perView: 3,
        },
        1023: {
          gap: 20,
          perView: 2,
        },
        768: {
          gap: 20,
          perView: 1,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  return (
    <div
      ref={sliderRef}
      className={`nc-DiscoverMoreSlider nc-p-l-container ${isShow ? "" : "invisible"
        }`}
    >
      <Heading
        className="mb-12 lg:mb-14  text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        desc=""
        rightDescText="Tài nguyên trên website phục vụ mục đích quảng cáo."
        hasNextPrev
      >
        Bmfacebook.com
      </Heading>
      <div className="" data-glide-el="track">
        <ul className="glide__slides">
          {CATS_DISCOVER.map((item, index) => (
            <li key={index}  >
              <CardCategory1
                name={item.name}
                desc={item.desc}
                featuredImage={item.featuredImage}
              // color={item.color}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;
