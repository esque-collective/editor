"use client";
import { type FC, type PropsWithChildren } from "react";
import { SchemaNavigation } from "../navigation/schema-navigation";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export const SchemaNavigationLayout: FC<PropsWithChildren> = ({ children }) => {
  const searchParams = useSearchParams();
  return (
    <main
      className={cn(
        "container grid min-h-dvh gap-4 pt-20 transition-all duration-500 ease-out",
        searchParams.get("sidebar") !== null
          ? "grid-cols-[minmax(0rem,3fr)_repeat(9,_minmax(0,1fr))]"
          : "grid-cols-[minmax(2.25rem,0fr)_repeat(9,_minmax(0,1fr))]",
      )}
    >
      <SchemaNavigation />
      {children}
    </main>
  );
};
