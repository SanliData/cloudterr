import { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
};

type InputProps = BaseProps & {
  type?: "text" | "email" | "tel" | "number";
  placeholder?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id">;

type SelectProps = BaseProps & {
  options: { value: string; label: string }[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "id">;

type TextareaProps = BaseProps & {
  rows?: number;
  placeholder?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "id">;

type CheckboxProps = BaseProps & {
  checked?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id" | "type">;

export function FormFieldInput({
  label,
  name,
  error,
  required,
  type = "text",
  placeholder,
  ...rest
}: InputProps) {
  const id = `field-${name}`;
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormFieldSelect({
  label,
  name,
  error,
  required,
  options,
  ...rest
}: SelectProps) {
  const id = `field-${name}`;
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error}
        className="block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        {...rest}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormFieldTextarea({
  label,
  name,
  error,
  required,
  rows = 4,
  placeholder,
  ...rest
}: TextareaProps) {
  const id = `field-${name}`;
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        className="block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormFieldCheckbox({
  label,
  name,
  error,
  required,
  checked,
  ...rest
}: CheckboxProps) {
  const id = `field-${name}`;
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-2">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          checked={checked}
          aria-invalid={!!error}
          className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
          {...rest}
        />
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
