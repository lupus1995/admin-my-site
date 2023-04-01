import React, { FC } from "react";

import classNames from "classnames";
import parse from "html-react-parser";

import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { AboutMeI } from "./interface";
import useStyles from "./style";
import { useImageName } from "../../hook";

const AboutMe: FC<AboutMeI> = ({
  aboutMeDescription,
  aboutMeTitle,
  imageName,
}) => {
  const { language } = useLanguage();
  const { is360, is481, is721, is1081, is1367, is1921, isMinDevicePixelRatio } =
    useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  const { imageUrl } = useImageName({
    imageName,
    is360,
    is481,
    is721,
    is1081,
    is1367,
    is1921,
    isMinDevicePixelRatio,
  });

  const styles = useStyles();
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
          <img src={imageUrl} alt="Панфилов Александр" />
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
