"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Settings } from "lucide-react";
import { type FC, type HTMLAttributes } from "react";
type EditorHeaderActionPartProps = HTMLAttributes<HTMLDivElement>;

export const EditorHeaderActionPart: FC<EditorHeaderActionPartProps> = () => {
  return (
    <section className="flex gap-4">
      <section className="flex gap-1">
        <Button variant="ghost" size="icon">
          <Search className="h-4 w-4 stroke-primary" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4 stroke-primary" />
        </Button>
      </section>
      <Avatar>
        <AvatarFallback>AA</AvatarFallback>
      </Avatar>
    </section>
  );
};
