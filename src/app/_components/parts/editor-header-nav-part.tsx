"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

export const EditorHeaderNavPart: FC = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu className="absolute left-1/2 top-4 -translate-x-1/2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            data-active={pathname.includes(routes.content) || undefined}
            className={navigationMenuTriggerStyle()}
          >
            <Link href={routes.content}>Content</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            data-active={pathname.includes(routes.schema) || undefined}
            className={navigationMenuTriggerStyle()}
          >
            <Link href={routes.schema}>Schema</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            data-active={pathname.includes(routes.media) || undefined}
            className={navigationMenuTriggerStyle()}
          >
            <Link href={routes.media}>Media</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
