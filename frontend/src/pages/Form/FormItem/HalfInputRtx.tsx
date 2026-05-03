import React from 'react';
import { useFormContext, Controller } from "react-hook-form";

type FormValues = {
 ReactDatepicker?: any;
 [key: string]: any; // Allow any string as a key
};
interface FormInputProps {
  data: {
    title: string;
    name: string;
    type: string;
    disabled: boolean | undefined;
    required: boolean | undefined;
    defaultValue:string|undefined;
  };
}


const HalfInputRtx: React.FC<FormInputProps> = ({ data }) => {
  const { control } = useFormContext<FormValues>();

  return (
    <div className="w-full xl:w-1/2">
      <label className="mb-2.5 block text-black dark:text-white">
        {data.title} {data.required && <span className="text-meta-1">*</span>}
      </label>
      <Controller
        control={control}
        name={data.name}
        render={({ field }) => (
          <input
          {...field}
          required={!!data.required}
          defaultValue={data.defaultValue}
            type={data.type}
            disabled={data.disabled}
            className="w-full rounded min-w-[300px] border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        )}
      />
    </div>
  );
};

export default HalfInputRtx;
