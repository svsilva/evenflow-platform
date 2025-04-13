// src/components/InputForm.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputForm({ label, type, name, value, onChange }) {
  return (
    <div className="mb-4">
      <Label htmlFor={name} className="block mb-1">
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
}
