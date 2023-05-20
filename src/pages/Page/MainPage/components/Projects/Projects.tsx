import React from "react";

import classNames from "classnames";

import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { useInitProjects } from "./hooks";

const Projects = () => {
  const { t } = useLanguage();
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const { projects } = useInitProjects();
  return (
    <div
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block} ${stylesPage.blockBackground}`
      )}
    >
      <h3 className={classNames(`${stylesPage.titleBlock}`)}>
        {t("projectTitlePage")}
      </h3>
    </div>
  );
};

export default Projects;
