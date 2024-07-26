import { Check } from "iconoir-react";

export default function Step({
    type,
    checked = false,
    active = false,
    label,
    textSize,
  }: {
    type: number;
    checked?: boolean;
    active?: boolean;
    label: string;
    textSize?: string;
  }) {
    return (
      <div
        className={`flex items-center rounded-full p-1 ${textSize} ${
          active ? "bg-orange-200" : "text-white"
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full flex justify-center items-center ${
            active ? "bg-orange-500 text-white" : "bg-black"
          }`}
        >
          {checked ? (
            <Check strokeWidth={2.5} className="w-4 h-4 text-white" />
          ) : (
            type + 1
          )}
        </div>
        <div
          className={`px-3 ${
            active ? "text-black" : "text-black/80"
          }`}
        >
          {label}
        </div>
      </div>
    );
  }
  