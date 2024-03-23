import { type FC } from "react";
import { HomeButton } from "../buttons/home-button";
import { EditorHeaderNavPart } from "../parts/editor-header-nav-part";
import { EditorHeaderActionPart } from "../parts/editor-header-action-part";

export const EditorHeader: FC = () => {
  return (
    <header className="container fixed flex justify-between py-4">
      <HomeButton />
      <EditorHeaderNavPart />
      <EditorHeaderActionPart />
    </header>
  );
};
