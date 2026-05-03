import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FormValues = {
  [key: string]: any; // Allow any string as a key
};

interface FormInputProps {
  data: {
    title: string;
    name: string;
    disabled?: boolean; // Optional property for disabling the checkbox
    defaultChecked?: boolean | string | number; // Allow different input types
  };
}

const CheckBoxRtx: React.FC<FormInputProps> = ({ data }) => {
  const { control, setValue } = useFormContext<FormValues>();
  
  // Normalize the value to 1 or 0
  const normalizeValue = (value: boolean | string | number | undefined) =>
    value === "true" || value === true || value === 1 || value === "1" ? 1 : 0;

  useEffect(() => {
    // Set initial normalized value
    setValue(data.name, normalizeValue(data.defaultChecked));
  }, [data.name, data.defaultChecked, setValue]);

  return (
    <div className="mt-6">
      <label
        htmlFor={data.name}
        className="flex cursor-pointer select-none items-center"
      >
        <Controller
          control={control}
          name={data.name}
          defaultValue={normalizeValue(data.defaultChecked)}
          render={({ field: { onChange, value } }) => (
            <div className="relative">
              <input
                type="checkbox"
                id={data.name}
                className="sr-only"
                checked={value == 1||value==true}
                disabled={data.disabled}
                onChange={(e) => {
                  const newValue = e.target.checked ? 1 : 0;
                  setValue(data.name, newValue);
                  onChange(newValue);
                }}
              />
              <div
                className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary ${
                  value == 1||value==true ? '!border-4' : ''
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
              </div>
            </div>
          )}
        />
        <span>{data.title}</span>
      </label>
    </div>
  );
};

export default CheckBoxRtx;
