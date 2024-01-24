import React, { FC } from "react";

import Image from "next/image";

const CustomImage: FC<{
  src: string;
  className?: string;
  alt: string;
  useHeight?: boolean;
}> = ({ src, className, alt }) => {
  if (src === "") {
    return null;
  }
  return (
    <div style={{ position: "relative" }}>
      <Image
        loading="lazy"
        className={className}
        src={src}
        alt={alt}
        sizes="100vw"
        style={{
          width: "auto",
        }}
        width={0}
        height={0}
      />
    </div>
  );
};

export default CustomImage;
