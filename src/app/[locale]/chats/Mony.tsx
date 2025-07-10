import React from "react";

const Mony: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className = "", width = 20, height = 20, style = {}, ...props }) => {
  return (
    <img
      src={"/money.png"}
      alt="Money Icon"
      width={width}
      height={height}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default Mony; 