import React, { FC } from "react";

import { useImageName } from "commons/HookGetSizeImage/hook";
import { ProjectI } from "pages/interface";
import { useLanguage } from "utils/hooks";

import { ItemList } from "../widget";

const ProjectItem: FC<{ project: ProjectI }> = ({ project }) => {
  const { language } = useLanguage();
  const { imageUrl } = useImageName({
    imageName: project.thumbnail,
  });

  return (
    <ItemList
      src={imageUrl}
      // @ts-ignore
      title={project.title[language]}
      // @ts-ignore
      description={project.description[language]}
    />
  );
};

export default ProjectItem;
