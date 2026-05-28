import Link from "next/link";
import { Globe2, Languages } from "lucide-react";

import { BrandLogo } from "~/components/brand-logo";

export function AppFooter() {
  return (
    <footer className="bg-surface-container-low pb-28 pt-12 lg:py-12 lg:pl-64">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-12 px-6 font-body md:grid-cols-4 lg:grid-cols-5 lg:px-12">
        <div className="col-span-2">
          <BrandLogo className="mb-4" markClassName="size-10" textClassName="text-2xl" />
          <p className="max-w-xs text-sm leading-relaxed text-on-surface-variant">
            Smooth Material-style form building with tonal surfaces, soft elevation, and adaptable
            accent colors.
          </p>
        </div>
        {[
          ["Product", "Templates", "Integrations"],
          ["Resources", "Documentation", "Community"],
          ["Company", "About Us", "Privacy"],
        ].map(([title, ...items]) => (
          <div key={title}>
            <h5 className="mb-5 text-xs font-bold uppercase tracking-widest text-on-surface">
              {title}
            </h5>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              {items.map((item) => (
                <li key={item}>
                  <Link href="#" className="transition-colors hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-[1600px] flex-col gap-4 px-6 pt-8 sm:flex-row sm:items-center sm:justify-between lg:px-12">
        <p className="text-xs font-semibold text-on-surface-variant/60">
          © 2026 Formora
        </p>
        <div className="flex gap-6">
          <Languages className="size-5 cursor-pointer text-on-surface-variant hover:text-primary" />
          <Globe2 className="size-5 cursor-pointer text-on-surface-variant hover:text-primary" />
        </div>
      </div>
    </footer>
  );
}
