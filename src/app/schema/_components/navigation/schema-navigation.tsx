"use client";
import { SearchField } from "@/app/_components/fields/search-field";
import { useRef, type FC } from "react";
import { SchemaNavigationTreePart } from "../parts/schema-navigation-tree-part";
import { Button } from "@/components/ui/button";
import { SidebarClose, SidebarOpen } from "lucide-react";
import { useSearchParamsLink } from "@/lib/hooks";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const SchemaNavigation: FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [value, setValue] = useSearchParamsLink("sidebar");

  const Icon = value === "locked" ? SidebarClose : SidebarOpen;
  return (
    <section
      className="flex flex-col gap-6"
      onPointerEnter={() => {
        if (value === "locked") {
          return;
        }
        router.replace(setValue({ kind: "string", value: "" }) as string);
      }}
      onPointerLeave={() => {
        if (value === "locked") {
          return;
        }
        router.replace(setValue({ kind: "string", value: null }) as string);
      }}
    >
      <section className="relative flex max-w-full gap-2">
        <SearchField
          ref={searchRef}
          onFocus={() => {
            router.push(
              setValue({ kind: "string", value: "locked" }) as string,
            );
          }}
          inputClassName={cn(
            "w-full min-w-9",
            value === null && "p-0 pl-8 text-transparent",
          )}
          placeholder="Search components and entries"
        />
        <Button
          variant="outline"
          size="icon-xs"
          className={cn(
            "flex-shrink-0 duration-500",
            value !== null ? "w-9" : "w-0 border-0 p-0",
          )}
          asChild
        >
          <Link
            href={setValue({
              kind: "href",
              value: value === "locked" ? null : "locked",
            })}
          >
            <Icon className="h-4 w-4 stroke-primary" />
          </Link>
        </Button>
      </section>
      <SchemaNavigationTreePart />
    </section>
  );
};
