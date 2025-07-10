import React from "react";

const OfficeBuilding: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  className = "",
  width = 20,
  height = 20,
  style = {},
  ...props
}) => {
  return (
    <img
      src={"/office-building.png"}
      alt="Money Icon"
      width={width}
      height={height}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default OfficeBuilding;
