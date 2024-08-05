"use client";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { shimmer } from "../Shimmer";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

declare global {
  var cloudinary: any;
}

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<Props> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="wzncg8pc"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        const toBase64 = (str: string) =>
          typeof window === "undefined"
            ? Buffer.from(str).toString("base64")
            : window.btoa(str);
        const dataUrl = `data:image/svg+xml;base64,${toBase64(
          shimmer(600, 400)
        )}`;

        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <CldImage
                  placeholder={dataUrl as PlaceholderValue}
                  fill
                  src={value}
                  alt={"Upload"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
