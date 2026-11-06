"use client";

import { Check, type LucideIcon } from "lucide-react";
import { createContext, useContext, useId, type ReactNode } from "react";

/** Server-side field errors, keyed by input name. */
export const FieldErrorsContext = createContext<Record<string, string>>({});

function useFieldError(name: string) {
  return useContext(FieldErrorsContext)[name];
}

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-gray-400 hover:border-rose-300 focus:border-rose-400 focus:outline-none focus:ring-4 focus:ring-rose-500/15 aria-[invalid=true]:border-rose-500 dark:placeholder:text-gray-500";

type FieldShellProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
};

function FieldShell({ id, label, hint, error, optional, children }: FieldShellProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-sm font-semibold text-foreground">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> & {
  name: string;
  label: string;
  hint?: string;
};

export function TextField({ name, label, hint, required, className, ...rest }: TextFieldProps) {
  const id = useId();
  const error = useFieldError(name);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={!required}>
      <input
        id={id}
        name={name}
        required={required}
        data-label={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${inputClass} ${className ?? ""}`}
        {...rest}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> & {
  name: string;
  label: string;
  hint?: string;
};

export function TextAreaField({ name, label, hint, required, ...rest }: TextAreaFieldProps) {
  const id = useId();
  const error = useFieldError(name);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={!required}>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={3}
        data-label={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${inputClass} resize-y`}
        {...rest}
      />
    </FieldShell>
  );
}

export type ChoiceOption = {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  /** CSS color for a round swatch (e.g. wood finishes). */
  swatch?: string;
  badge?: string;
};

type ChoiceGroupProps = {
  name: string;
  legend: string;
  hint?: string;
  options: ChoiceOption[];
  /** "radio" = pick one, "checkbox" = pick any. */
  type?: "radio" | "checkbox";
  required?: boolean;
  defaultValue?: string | string[];
  columns?: 2 | 3 | 4;
  onValueChange?: (value: string, checked: boolean) => void;
};

const gridCols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

/** Big, tappable cards backed by real radio / checkbox inputs. */
export function ChoiceGroup({
  name,
  legend,
  hint,
  options,
  type = "radio",
  required,
  defaultValue,
  columns = 2,
  onValueChange,
}: ChoiceGroupProps) {
  const id = useId();
  const error = useFieldError(name);
  const defaults = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];

  return (
    <fieldset
      className="space-y-3"
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
    >
      <legend className="flex w-full items-baseline justify-between gap-2 text-sm font-semibold text-foreground">
        <span>{legend}</span>
        {!required && <span className="text-xs font-normal text-muted">Optional</span>}
      </legend>
      {hint && !error && (
        <p id={`${id}-hint`} className="-mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className={`grid gap-3 ${gridCols[columns]}`}>
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <label
              key={option.value}
              className="group relative flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-border bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-md has-[:checked]:border-rose-500 has-[:checked]:bg-rose-50/70 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-rose-500/25 dark:has-[:checked]:bg-rose-500/10"
            >
              <input
                type={type}
                name={name}
                value={option.value}
                required={type === "radio" ? required : undefined}
                defaultChecked={defaults.includes(option.value)}
                data-label={legend}
                onChange={(event) => onValueChange?.(option.value, event.currentTarget.checked)}
                className="peer sr-only"
              />
              {option.swatch && (
                <span
                  aria-hidden="true"
                  className="mt-0.5 size-8 shrink-0 rounded-full border border-black/10 shadow-inner"
                  style={{ background: option.swatch }}
                />
              )}
              {Icon && (
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-rose-100 to-amber-100 text-rose-600 dark:from-rose-500/20 dark:to-amber-500/20 dark:text-rose-300">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
                  {option.label}
                  {option.badge && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">
                      {option.badge}
                    </span>
                  )}
                </span>
                {option.description && (
                  <span className="mt-0.5 block text-sm leading-snug text-muted">{option.description}</span>
                )}
              </span>
              <span
                aria-hidden="true"
                className={`flex size-5 shrink-0 items-center justify-center border-2 border-border text-white transition-colors peer-checked:border-rose-500 peer-checked:bg-rose-500 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100 ${type === "radio" ? "rounded-full" : "rounded-md"}`}
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function Tip({ icon: Icon, children, tone = "info" }: { icon: LucideIcon; children: ReactNode; tone?: "info" | "warn" }) {
  const toneClass =
    tone === "warn"
      ? "border-amber-300/60 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100"
      : "border-rose-200/60 bg-rose-50/60 text-rose-900 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-100";
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${toneClass}`}>
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
