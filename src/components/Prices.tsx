import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 0,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-2 border-green-800 rounded-lg ${contentClass}`}
      >
        <span className="text-green-800 !leading-none">{String(price*1000)} đ</span>
      </div>
    </div>
  );
};

export default Prices;
