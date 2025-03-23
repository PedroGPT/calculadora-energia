import { useState } from \"react\";

export function Select({ onValueChange, defaultValue, children }: any) {
  const [value, setValue] = useState(defaultValue);

  function handleChange(e: any) {
    setValue(e.target.value);
    onValueChange?.(e.target.value);
  }

  return (
    <select value={value} onChange={handleChange} className=\"border rounded p-2 w-full\">
      {children}
    </select>
  );
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <option disabled>{placeholder}</option>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}
