"use client";

import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEventHandler, type FC } from "react";
import { useDebounceCallback } from "usehooks-ts";

export const SearchField: FC<InputProps> = ({ className, ...props }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchCallback = useDebounceCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    const modSearchParams = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      modSearchParams.set("search", e.target.value);
    } else {
      modSearchParams.delete("search");
    }

    const params = modSearchParams.toString();
    const query = params ? `?${params}` : "";

    router.replace(`${pathname}${query}`);
  }, 500);

  return (
    <span className={cn("relative w-full", className)}>
      <Input className="peer pl-8" {...props} onChange={searchCallback} />
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 stroke-muted-foreground transition peer-focus:stroke-primary peer-[&:not(:placeholder-shown)]:stroke-primary" />
    </span>
  );
};
