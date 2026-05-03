import React from 'react';
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  id?: string | number;
  name?: string;
};

type FormValues = {
  ReactDatepicker?: any;
  [key: string]: any;
};

interface FormInputProps {
  data: {
    title: string;
    name: string;
    disabled?: boolean;
    required?: boolean;
    defaultValue?: string;
    option: Option[] | string[];
  };
}

const isOption = (item: any): item is Option =>
  typeof item === "object" && item !== null && ("id" in item || "name" in item);

const SelectRtx: React.FC<FormInputProps> = ({ data }) => {
  const { control } = useFormContext<FormValues>();

  const getDefaultOption = () => {
    if (!data.defaultValue) return undefined;
    
    if (Array.isArray(data.option)) {
      if (data.option.length === 0) return undefined;
      
      // Check if first item is Option or string
      if (isOption(data.option[0])) {
        return (data.option as Option[]).find(
          (opt) => opt.id?.toString() === data.defaultValue
        );
      } else {
        return (data.option as string[]).includes(data.defaultValue) 
          ? { id: data.defaultValue, name: data.defaultValue }
          : undefined;
      }
    }
    return undefined;
  };

  const renderOptions = () => {
    if (!Array.isArray(data.option)) return null;
    
    return data.option.map((item, index) => {
      if (isOption(item)) {
        return (
          <option
            key={item.id ?? index}
            value={item.id}
            className="text-body dark:text-bodydark"
          >
            {item.name}
          </option>
        );
      } else {
        return (
          <option 
            key={item} 
            value={item} 
            className="text-body dark:text-bodydark"
          >
            {item}
          </option>
        );
      }
    });
  };

  const defaultOption = getDefaultOption();

  return (
    <div className="my-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {data.title} {data.required && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <Controller
          control={control}
          name={data.name}
          defaultValue={data.defaultValue || ""}
          render={({ field }) => (
            <select
              {...field}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              disabled={data.disabled}
            >
              <option
                key="default"
                value={defaultOption?.id ?? ""}
                className="text-body dark:text-bodydark"
              >
                {defaultOption?.name ?? "Select your subject"}
              </option>
              {renderOptions()}
            </select>
          )}
        />
        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectRtx;