import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type FC, type HTMLAttributes, type PropsWithChildren } from "react";

type HomeButtonProps = HTMLAttributes<HTMLButtonElement>;

export const HomeButton: FC<PropsWithChildren<HomeButtonProps>> = ({
  className,
  ...rest
}) => {
  return (
    <Button
      asChild
      className={cn("w-10 rounded-xl px-0 text-xs", className)}
      {...rest}
    >
      <Link href="/">ESQ</Link>
    </Button>
  );
};
