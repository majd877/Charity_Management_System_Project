import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type FormValues = {
  [key: string]: any;
};

interface FormInputProps {
  data: {
    title: string;
    name: string;
    disabled?: boolean;
    required?: boolean;
    defaultValue?: any;
  };
}

const TextAreaRtx: React.FC<FormInputProps> = ({ data }) => {
  const { control, setValue } = useFormContext<FormValues>();
  const [editorContent, setEditorContent] = useState<string>(data.defaultValue || '');

  useEffect(() => {
    setEditorContent(data.defaultValue || '');
    setValue(data.name, data.defaultValue || ''); 
  }, [data.defaultValue, data.name, setValue]);

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
    setValue(data.name, value);
  };

  const toolbarOptions = [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean'],
    [{ 'direction': 'rtl' }]
  ];

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'color',
    'background',
    'align',
    'direction',
    'code-block',
    'script',
  ];

  const modules = {
    toolbar: toolbarOptions,
    history: { 
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {data.title} {data.required && <span className="text-meta-1">*</span>}
      </label>
      <Controller
  control={control}
  name={data.name}
  render={({ field }) => (
    <ReactQuill
      {...field}
      value={editorContent}
      onChange={(value) => {
        setEditorContent(value);
        field.onChange(value);
      }}
      theme="snow"
      placeholder="Start typing..."
      modules={modules}
      formats={formats}
    />
  )}
/>


    </div>
  );
};

export default TextAreaRtx;