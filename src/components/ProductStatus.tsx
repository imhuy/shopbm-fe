import { Product } from "@/data/data";
import {
  ClockIcon,
  NoSymbolIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { FC } from "react";

interface Props {
  status: Product["status"];
  className?: string;
}

const ProductStatus: FC<Props> = ({
  status,
  className = "absolute top-0 end-0 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300",
}) => {
  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center ${className}`;
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          {/* <IconDiscount className="w-3.5 h-3.5" /> */}
          {/* <div className="ms-1 leading-none font-bold  text-[13px] "> */}

          <SparklesIcon className="w-3.5 h-3.5" />
            <span className="ms-1 leading-none">Còn: <span className=" text-blue-600 font-extrabold">100</span></span>

          {/* </div> */}
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{'Hết hàng'}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  return renderStatus();
};

export default ProductStatus;
