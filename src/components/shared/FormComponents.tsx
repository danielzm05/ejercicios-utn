import { InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>{
  children: React.ReactNode;
  required?: boolean;
}

export function Label({ htmlFor, children, required }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
      {children}
      {required && <span className="ml-1 text-indigo-400">*</span>}
    </label>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
}

export function InputField({ label, required, id, ...props}: InputProps){
  return(
    <Label htmlFor={id} required={required}>
      {label}
      <input id={id} required={required} {...props }/>
    </Label>
  )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  label: string;
}

export function TextAreaField({ label, required, id, ...props}: TextAreaProps){
  return(
    <Label htmlFor={id} required={required}>
      {label}
      <textarea id={id} required={required} {...props }/>
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
    <Label htmlFor={id} required={required}>
      {label}
      <select
        id={id}
        required={required}
        {...props}
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
    <Label htmlFor={id} required={required}>
      {label}
      <input id={id} required={required} list={list} {...props }/>
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

