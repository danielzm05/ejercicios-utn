import { InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>{
  children: React.ReactNode;
}

export function Label({ htmlFor, children, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`flex gap-2 text-2xl font-font1 text-t2 ${className}`}>
      {children}
      
    </label>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
}

export function InputField({ label, required, id, ...props}: InputProps){
  return(
    <Label htmlFor={id}>
      {label}
      <input id={id} required={required} {...props } className="w-full text-t1 px-2 rounded-sm border-2 border-border1 bg-background outline-primary"/>
    </Label>
  )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  label: string;
}

export function TextAreaField({ label, required, id, ...props}: TextAreaProps){
  return(
    <Label htmlFor={id}  className='flex flex-col'>
      {label}
      <textarea id={id} required={required} {...props } className="w-full text-t1 px-2 rounded-sm border-2 border-border1 bg-background outline-primary"/>
    </Label>
  )
}

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  label: string;
  options: Option[];
  placeholder: string;

}

export function SelectField({ label, required, id, placeholder, options, ...props}: SelectProps){
  return(
    <Label htmlFor={id}>
      {label}
      <select
        id={id}
        required={required}
        {...props}
        className="w-full text-t1 px-2 rounded-sm border-2 border-border1 bg-background outline-primary"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Label>
  )
}

interface DataListProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  options: Option[];
}

export function DataListField({ label, required, list, id, options, ...props}: DataListProps){
  return(
    <Label htmlFor={id}>
      {label}
      <input id={id} required={required} list={list} {...props } className="w-full text-t1 px-2 rounded-sm border-2 border-border1 bg-background outline-primary"/>
      <datalist id={list} >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </datalist>
    </Label>
  )
}

