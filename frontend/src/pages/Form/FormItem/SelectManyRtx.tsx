import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface Option {
  value: string;
  text: string;
  selected: boolean;
  element?: HTMLElement;
}

interface MultiSelectRtxProps {
  id: string;
}

const MultiSelectRtx: React.FC<MultiSelectRtxProps> = ({ id }) => {
  const { control, setValue } = useForm();
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadOptions = () => {
      const select = document.getElementById(id) as HTMLSelectElement | null;
      if (select) {
        const newOptions: Option[] = Array.from(select.options).map((opt) => ({
          value: opt.value,
          text: opt.text,
          selected: opt.selected,
        }));
        setOptions(newOptions);
      }
    };
    loadOptions();
  }, [id]);

  const toggleDropdown = () => setShow((prev) => !prev);

  const selectOption = (index: number) => {
    const newOptions = [...options];
    if (!newOptions[index].selected) {
      newOptions[index].selected = true;
      setSelected([...selected, index]);
    } else {
      newOptions[index].selected = false;
      setSelected(selected.filter((i) => i !== index));
    }
    setOptions(newOptions);
    setValue(id, selectedValues());
  };

  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions[index].selected = false;
    setSelected(selected.filter((i) => i !== index));
    setOptions(newOptions);
    setValue(id, selectedValues());
  };

  const selectedValues = () => {
    return selected.length > 0 ? selected.map((option) => options[option]?.value || "") : [];
  };
  
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [show]);
  useEffect(() => {
    console.log("Selected Values:", selectedValues());
    console.log("Options:", options);
  }, [selected, options]);
  
  return (
    <div className="relative z-50">
      <label className="mb-3 block text-sm font-medium">MultiSelect RTX</label>
      <select id={id} className="hidden">
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>

      <Controller
        name={id}
        control={control}
        render={() => (
          <div className="relative w-full" ref={triggerRef} onClick={toggleDropdown}>
            <div className="flex items-center border rounded p-2 cursor-pointer">
              <div className="flex flex-wrap gap-2">
                {selected.map((index) => (
                  <div key={index} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                    {options[index].text}
                    <span className="ml-2 cursor-pointer text-red-500" onClick={() => removeOption(index)}>&times;</span>
                  </div>
                ))}
                {selected.length === 0 && <span className="text-gray-400">Select options</span>}
              </div>
              <span className="ml-auto">▼</span>
            </div>

            {show && (
              <div ref={dropdownRef} className="absolute left-0 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${option.selected ? 'bg-blue-100' : ''}`}
                    onClick={() => selectOption(index)}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MultiSelectRtx;