import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
import { useClickOutside } from "@/hooks/ui/useClickOutside";

interface Option {
  id: number;
  label: string;
  value: "light" | "dark" | "system";
}

const themeOptions: Option[] = [
  {
    id: 1,
    label: "Light",
    value: "light",
  },
  {
    id: 2,
    label: "Dark",
    value: "dark",
  },
  {
    id: 3,
    label: "System",
    value: "system",
  },
];

const ThemeSelect: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null!);

  useClickOutside(
    selectRef,
    () => {
      if (isOptionVisible) {
        setIsOptionVisible(false);
      }
    },
    isOptionVisible
  );

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOptionVisible(false);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOptionVisible(!isOptionVisible);
    }
  };

  const handleOptionSelect = (option: Option) => {
    setTheme(option.value);
    setIsOptionVisible(false);
  };

  const selectedOption = themeOptions.find((option) => option.value === theme);

  return (
    <div ref={selectRef} className="relative">
      <button
        className="relative px-3 py-2 flex items-center gap-x-2 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
        onClick={() => setIsOptionVisible(!isOptionVisible)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOptionVisible}
        aria-label="Select theme"
      >
        <span className="text-sm font-medium">{selectedOption?.label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOptionVisible ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Options dropdown */}
      {isOptionVisible && (
        <div
          className="absolute top-full left-0 right-0 mt-1 border border-[var(--color-border)] bg-[var(--color-background)] rounded-md shadow-lg z-50 overflow-hidden"
          role="listbox"
        >
          {themeOptions.map((option) => (
            <button
              key={option.id}
              className={`w-full px-3 py-2 text-sm text-left text-[var(--color-foreground)] hover:bg-[var(--color-muted)] focus:bg-[var(--color-muted)] focus:outline-none transition-colors duration-150 ${
                option.value === theme ? "bg-[var(--color-muted)]" : ""
              }`}
              onClick={() => handleOptionSelect(option)}
              role="option"
              aria-selected={option.value === theme}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelect;
