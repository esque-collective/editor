"use client";
import { Button } from "@/components/ui/button";
import { type SchemaParams, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  File,
  Folder,
  FolderPlus,
  FolderTree,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo, type FC, type HTMLAttributes } from "react";

interface SchemaNavigationButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  kind?: "root" | "folder" | "entity";
  slug?: string;
  identation?: 0 | 1 | 2 | 3 | 4 | 5;
}

export const SchemaNavigationButton: FC<SchemaNavigationButtonProps> = ({
  disabled,
  children,
  className,
  kind = "entity",
  slug,
  identation,
  ...rest
}) => {
  const { entity: entitySlug } = useParams<SchemaParams>();
  const pathname = usePathname();

  const Icon = useMemo(() => {
    switch (kind) {
      case "root":
        return FolderTree;
      case "folder":
        return Folder;
      default:
        return File;
    }
  }, [kind]);

  const identationClassName = useMemo(() => {
    switch (identation) {
      case 1:
        return `pl-2.5`;
      case 2:
        return `pl-5`;
      case 3:
        return `pl-10`;
      case 4:
        return `pl-16`;
      case 5:
        return `pl-20`;
    }
  }, [identation]);

  const active = useMemo(() => {
    if (kind === "root" && !disabled && pathname === routes.schema) {
      return true;
    }
    if (slug && entitySlug === slug) {
      return true;
    }

    return false;
  }, [pathname, kind, entitySlug, slug, disabled]);

  const href = useMemo(() => {
    if (kind === "root" || !slug) {
      return routes.schema;
    }
    return routes.schemaEntry(slug);
  }, [kind, slug]);

  const action = useMemo(() => {
    switch (kind) {
      case "folder":
      case "root":
        return (
          <>
            <Button variant="outline" size="sm" className="w-24">
              New Entity
            </Button>
            <Button variant="outline" className="h-9 w-9 p-0">
              <FolderPlus className="h-4 w-4 stroke-primary" />
            </Button>
          </>
        );
      default:
        return (
          <Button variant="ghost" className="h-9 w-9 p-0">
            <MoreHorizontal className="h-4 w-4 fill-primary" />
          </Button>
        );
    }
  }, [kind]);

  return (
    <section
      className={cn("group flex gap-2 overflow-hidden", className, identationClassName)}
      {...rest}
    >
      <Button
        variant={active ? "secondary" : "secondary-ghost"}
        size="sm"
        disabled={disabled}
        className={cn(
          "min-w-9 max-w-[calc(100%-2.625rem)] flex-grow justify-start gap-2 overflow-hidden pl-2.5 pr-2.5",
          kind !== "entity" && active && "max-w-full",
        )}
        asChild
      >
        <Link href={href}>
          <Icon className="h-4 w-4 flex-shrink-0 stroke-primary" />
          <span className="truncate">{children}</span>
        </Link>
      </Button>
      <section
        className={cn(
          "hidden w-0 gap-1 group-hover:flex group-hover:w-max",
          kind === "root" && "flex w-max",
          active &&
            (kind !== "entity"
              ? "hidden w-0 group-hover:hidden"
              : "flex w-max"),
        )}
      >
        {action}
      </section>
    </section>
  );
};
