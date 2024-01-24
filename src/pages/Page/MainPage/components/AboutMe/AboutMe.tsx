import React, { FC } from "react";

import classNames from "classnames";
import parse from "html-react-parser";

import { CustomImage } from "pages/Page/commons";
import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { AboutMeI } from "./interface";
import useStyles from "./style";
import { useImageName } from "../../../../../commons/HookGetSizeImage/hook";

const AboutMe: FC<AboutMeI> = ({
  aboutMeDescription,
  aboutMeTitle,
  imageName,
}) => {
  const { language } = useLanguage();
  const { is360, is481, is1081 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  const { imageUrl } = useImageName({
    imageName,
  });

  const styles = useStyles({ theme: { is1081 } });
  return (
    <div
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block}`
      )}
    >
      <h3 className={classNames(`${stylesPage.titleBlock}`)}>
        {/* @ts-ignore */}
        {aboutMeTitle[language]}
      </h3>
      <div className={classNames(`${styles.aboutMe}`)}>
        <div className={classNames(`${styles.aboutMePhoto}`)}>
          <CustomImage src={imageUrl} alt="Панфилов Александр" className="" />
        </div>
        <article className={classNames(`${styles.aboutMeArticle}`)}>
          {/* @ts-ignore */}
          {parse(aboutMeDescription[language])}
        </article>
      </div>
    </div>
  );
};

export default AboutMe;
