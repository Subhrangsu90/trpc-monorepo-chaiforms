import { cn } from "~/lib/utils";

type BrandMarkProps = {
  className?: string;
};

type BrandLogoProps = BrandMarkProps & {
  markClassName?: string;
  textClassName?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-9", className)}
      fill="none"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="fill-primary" height="48" rx="16" width="48" />
      <path
        className="fill-primary-container"
        d="M14 12h17a5 5 0 0 1 5 5v19H19a5 5 0 0 1-5-5V12Z"
      />
      <path
        className="stroke-on-primary"
        d="M14 12h17a5 5 0 0 1 5 5v19H19a5 5 0 0 1-5-5V12Z"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <path
        className="stroke-on-primary-container"
        d="M20 20h10M20 26h7"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        className="fill-tertiary"
        d="M29.5 31.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      />
      <path
        className="stroke-on-tertiary"
        d="m24.4 31.5 1.2 1.2 2-2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function BrandLogo({
  className,
  markClassName,
  textClassName,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <BrandMark className={markClassName} />
      <span className={cn("font-display text-xl font-bold text-on-surface", textClassName)}>
        Formora
      </span>
    </span>
  );
}
