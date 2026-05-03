// UploadRtx.tsx
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import AlertError from "../../UiElements/AlertError";

type FormValues = {
  ReactDatepicker?: any;
  [key: string]: any; // Allow any string as a key
};

interface FormInputProps {
  data: {
    title: string;
    name: string;
    disabled: boolean | undefined;
    required: boolean | undefined;
    defaultValue: Array<any> | undefined;
  };
}

const UploadMulltyRtx: React.FC<FormInputProps> = ({ data }) => {
  const { control, setValue } = useFormContext<FormValues>();
  const [showError, setShowError] = useState(false);
  const [images, setImages] = useState<
    { origin: any; toShow: string; toSend?: any }[]
  >([]);

  useEffect(() => {
    if (data?.defaultValue?.length) {
      const updatedImages = data.defaultValue.map((item: any) => ({
        origin: item,
        toShow: `${import.meta.env.VITE_IMAGE_URL}${item}`,
        toSend: item,
      }));
      setImages(updatedImages);
    }
  }, [data.defaultValue]);

  const handleImage = (file: File | undefined) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 6000);
      } else {
        const image = URL.createObjectURL(file);
        setValue(`image${image.length}${images.length}`, file);
        setImages((prevImages) => [
          ...prevImages,
          { origin: file, toShow: image },
        ]);
      }
    }
  };

  const deleteImage = (item: any, index: number) => {
    setValue(`deleteValue${index}`, item.toSend);
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <>
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          {data.title} {data.required && <span className="text-meta-1">*</span>}
        </label>
        <div className="flex justify-center">
          <div
            id="FileUpload"
            className="relative flex justify-center mb-5.5 cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          >
            <Controller
              control={control}
              name={data.name}
              render={({ field }) => (
                <input
                  type="file"
                  disabled={data.disabled}
                  accept="image/*"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  onChange={(e) => {
                    handleImage(e.target.files?.[0]);
                  }}
                />
              )}
            />
            <div className="w-[300px] h-[300px]">
              <div className="flex flex-col items-center justify-center space-y-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                      fill="#3C50E0"
                    />
                    <path
                      d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                      fill="#3C50E0"
                    />
                    <path
                      d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                      fill="#3C50E0"
                    />
                  </svg>
                </span>
                <p>
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </p>
                <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                <p>(max, 800 X 800px)</p>
              </div>
            </div>
          </div>
        </div>
        {showError && (
          <AlertError
            data={{
              title: "Type Error",
              message: "Accept Only Images",
            }}
          />
        )}
      </div>
      <div className="flex justify-around flex-wrap">
        {images.map((item, index) => (
          <div
            key={index}
            className="flex border border-dashed border-primary relative flex-col items-center m-4"
          >
            <button
              onClick={() => deleteImage(item, index)}
              type="button"
              className="flex justify-center pb-2 top-2 text-red-600 text-2xl absolute right-3 px-2 py-0 m-0 bg-meta-4"
              style={{ borderRadius: "50%" }}
            >
              x
            </button>
            <img
              className="w-[150px] h-[150px] object-cover"
              src={item.toShow}
              alt={`Preview ${item.toSend}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadMulltyRtx;
