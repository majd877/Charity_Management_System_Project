// InputRtx.tsx
import React from 'react';
import { Controller, useFormContext } from "react-hook-form";

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
   max?:number;
   min?:number;
  };
}

const InputRtx: React.FC<FormInputProps> = ({ data }) => {
  const { control } = useFormContext<FormValues>();

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {data.title} {data.required && <span className="text-meta-1">*</span>}
      </label>
      <Controller
        control={control}
        name={data.name}
        render={({ field }) => (
          <input
          max={data?.max}
          min={data?.min}
            {...field}
            required={!!data.required}
            type={data.type}
            defaultValue={data.defaultValue}
            disabled={data.disabled}
            step="*"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        )}
      />
    </div>
  );
};

export default InputRtx;
