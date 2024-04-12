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
  kind?: "root" | "folder" | "entity";
  slug?: string;
  identation?: 0 | 1 | 2 | 3 | 4 | 5;
}

export const SchemaNavigationButton: FC<SchemaNavigationButtonProps> = ({
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
        return `pl-4`;
      case 2:
        return `pl-8`;
      case 3:
        return `pl-12`;
      case 4:
        return `pl-16`;
      case 5:
        return `pl-20`;
    }
  }, [identation]);

  const active = useMemo(() => {
    if (kind === "root" && pathname === routes.schema) {
      return true;
    }
    if (slug && entitySlug === slug) {
      return true;
    }

    return false;
  }, [pathname, kind, entitySlug, slug]);

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

  console.log(kind, active);

  return (
    <section
      className={cn("group flex gap-2", className, identationClassName)}
      {...rest}
    >
      <Button
        variant={active ? "secondary" : "secondary-ghost"}
        size="sm"
        className={cn(
          "max-w-[calc(100%-8.875rem)] flex-grow justify-start gap-2 overflow-hidden pl-4 pr-4",
          kind === "entity" && "max-w-[calc(100%-2.625rem)]",
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
          "hidden gap-1 group-hover:flex",
          kind === "root" && "flex",
          active && (kind !== "entity" ? "hidden group-hover:hidden" : "flex"),
        )}
      >
        {action}
      </section>
    </section>
  );
};
