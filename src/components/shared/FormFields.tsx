"use client";

import { forwardRef, TextareaHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";

// ─── Base styles ──────────────────────────────────────────────────────────────

const fieldBase =
  "w-full rounded-lg border bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 " +
  "outline-none ring-offset-zinc-950 transition-colors " +
  "border-zinc-800 hover:border-zinc-700 " +
  "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const errorBorder = "border-red-500/70 focus:border-red-500 focus:ring-red-500/20";

// ─── Label ────────────────────────────────────────────────────────────────────

interface LabelProps {
  htmlFor: string;
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

// ─── FieldWrapper ─────────────────────────────────────────────────────────────

interface FieldWrapperProps {
  children: React.ReactNode;
  error?: string;
  hint?: string;
}

export function FieldWrapper({ children, error, hint }: FieldWrapperProps) {
  return (
    <div className="flex flex-col">
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      {!error && hint && <p className="mt-1.5 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

// ─── Field (Label + Input + Error combinados) ─────────────────────────────────

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, name, error, hint, required, className = "", ...props }, ref) => (
    <FieldWrapper error={error} hint={hint}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        ref={ref}
        id={name}
        name={name}
        required={required}
        className={`${fieldBase} ${error ? errorBorder : ""} ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
);
Field.displayName = "Field";

// ─── TextareaField ────────────────────────────────────────────────────────────

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, name, error, hint, required, className = "", ...props }, ref) => (
    <FieldWrapper error={error} hint={hint}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <textarea
        ref={ref}
        id={name}
        name={name}
        required={required}
        rows={4}
        className={`${fieldBase} resize-y ${error ? errorBorder : ""} ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
);
TextareaField.displayName = "TextareaField";

// ─── SelectField ──────────────────────────────────────────────────────────────

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, name, options, placeholder = "Seleccionar...", error, hint, required, className = "", ...props }, ref) => (
    <FieldWrapper error={error} hint={hint}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <select
        ref={ref}
        id={name}
        name={name}
        required={required}
        className={`${fieldBase} ${error ? errorBorder : ""} ${className}`}
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
    </FieldWrapper>
  )
);
SelectField.displayName = "SelectField";

// ─── FormSection ──────────────────────────────────────────────────────────────

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="border-b border-zinc-800 pb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── SubmitButton ─────────────────────────────────────────────────────────────

interface SubmitButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

export function SubmitButton({ loading, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ─── FormFeedback ─────────────────────────────────────────────────────────────

interface FormFeedbackProps {
  success?: string | null;
  error?: string | null;
}

export function FormFeedback({ success, error }: FormFeedbackProps) {
  if (!success && !error) return null;

  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${
        success
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-red-500/30 bg-red-500/10 text-red-400"
      }`}
    >
      {success || error}
    </div>
  );
}
