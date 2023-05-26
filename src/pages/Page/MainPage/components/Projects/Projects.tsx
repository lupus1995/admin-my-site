import React from "react";

import classNames from "classnames";

import {
  ContentsContainer,
  ContentsContainerSkeleton,
} from "pages/Page/components";
import { useGetConents } from "pages/Page/components/Content/hooks";
import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { useInitProjects } from "./hooks";

const Projects = () => {
  const { t } = useLanguage();
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const { projects, visibleSkeleton } = useInitProjects();

  const contents = useGetConents(projects, "projects");
  return (
    <div
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block}`
      )}
    >
      <h3 className={classNames(`${stylesPage.titleBlock}`)}>
        {t("projectTitlePage")}
      </h3>

      {!visibleSkeleton && <ContentsContainer contents={contents} />}
      {visibleSkeleton && <ContentsContainerSkeleton />}
    </div>
  );
};

export default Projects;
