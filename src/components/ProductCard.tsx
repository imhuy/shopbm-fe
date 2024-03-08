"use client";

import { Transition } from "@/app/headlessui";
import { PRODUCTS, Product } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { ArrowsPointingOutIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import BagIcon from "./BagIcon";
import ModalQuickView from "./ModalQuickView";
import Prices from "./Prices";
import ProductStatus from "./ProductStatus";
import Button from "@/shared/Button/Button";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data = PRODUCTS[0],
  isLiked,
}) => {
  const {
    name,
    price,
    description,
    sizes,
    variants,
    variantType,
    status,
    image,
    rating,
    id,
    numberOfReviews,
  } = data;

  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();

  const notifyAddTocart = ({ size }: { size?: string }) => {
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none">
            Added to cart!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ size })}
        </Transition>
      ),
      {
        position: "top-right",
        id: String(id) || "product-detail",
        duration: 3000,
      }
    );
  };

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={image}
            alt={name}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {variants ? variants[variantActive].name : `Natural`}
                  </span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{size || "XL"}</span>
                </p>
              </div>
              <Prices price={price} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getBorderClass = (Bgclass = "") => {
    if (Bgclass.includes("red")) {
      return "border-red-500";
    }
    if (Bgclass.includes("violet")) {
      return "border-violet-500";
    }
    if (Bgclass.includes("orange")) {
      return "border-orange-500";
    }
    if (Bgclass.includes("green")) {
      return "border-green-500";
    }
    if (Bgclass.includes("blue")) {
      return "border-blue-500";
    }
    if (Bgclass.includes("sky")) {
      return "border-sky-500";
    }
    if (Bgclass.includes("yellow")) {
      return "border-yellow-500";
    }
    return "border-transparent";
  };

  const renderVariants = () => {
    if (!variants || !variants.length || !variantType) {
      return null;
    }

    if (variantType === "color") {
      return (
        <div className="flex space-x-1">
          {variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${variantActive === index
                ? getBorderClass(variant.color)
                : "border-transparent"
                }`}
              title={variant.name}
            >
              <div
                className={`absolute inset-0.5 rounded-full z-0 ${variant.color}`}
              ></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex ">
        {variants.map((variant, index) => (
          <div
            key={index}
            onClick={() => setVariantActive(index)}
            className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${variantActive === index
              ? "border-black dark:border-slate-300"
              : "border-transparent"
              }`}
            title={variant.name}
          >
            <div
              className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
              style={{
                backgroundImage: `url(${
                  // @ts-ignore
                  typeof variant.thumbnail?.src === "string"
                    ? // @ts-ignore
                    variant.thumbnail?.src
                    : typeof variant.thumbnail === "string"
                      ? variant.thumbnail
                      : ""
                  })`,
              }}
            ></div>
          </div>
        ))}
      </div>
    );
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {/* <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => notifyAddTocart({ size: "XL" })}
        >
          <BagIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="ms-1">Add to bag</span>
        </ButtonPrimary> */}
        <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">Thông Tin</span>
        </ButtonSecondary>
      </div>
    );
  };


  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        <Link href={"/checkout"} className="absolute inset-0"></Link>



        <div>
          <h2 className="nc-ProductCard__title m-4 text-xl font-bold transition-colors">
            {name}
          </h2>

        </div>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={"/checkout"} className="block">
            {/* <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={image}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            /> */}

            <div className="object-cover w-full h-80 drop-shadow-xl">

              <div className=" font-semibold text-sm flex flex-col mt-4 mx-4 gap-y-5 text-black">
                <div className="flex items-center gap-x-2">
                  <SparklesIcon className="w-3.5 h-3.5" color="green" />
                  <span>Live Ads </span>
                </div>

                <div className="flex items-center gap-x-2">
                  <SparklesIcon className="w-3.5 h-3.5" color="green" />
                  <span>Full Định Dạng</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <SparklesIcon className="w-3.5 h-3.5" color="green" />
                  <span>Bao Tích 902</span>
                </div>

                <div className="flex items-center gap-x-2">
                  <SparklesIcon className="w-3.5 h-3.5" color="green" />
                  <span>Bạn Bè : 50-5000</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <SparklesIcon className="w-3.5 h-3.5" color="green" />
                  <span>Ngày Lập : 2008-2022</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <SparklesIcon className="w-3.5 h-3.5" color="green" />
                  <span>Quốc gia: Random</span>
                </div>

                <div className="flex items-center gap-x-2">
                  <SparklesIcon className="w-3.5 h-3.5" color="green" />
                  <span>Đã xác minh Email</span>
                </div>
              </div>
            </div>
          </Link>

          {/* <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" /> */}
          <ProductStatus status={status} />
          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {/* {renderVariants()} */}


          <div className="flex justify-between items-end flex-wrap  gap-4">
            <Prices price={price} />
            <Button
              className="  border rounded-md bg-slate-800"
              fontSize="text-xs"
              sizeClass="py-2 px-4"
            // onClick={() => notifyAddTocart({ size: "XL" })}
            >
              {/* <BagIcon className="w-3.5 h-3.5 mb-0.5" /> */}
              <Link href="/checkout">   <span className="ms-1 text-white font-bold">Mua Ngay</span>

              </Link>

            </Button>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
