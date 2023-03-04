import React, { FC } from "react";

import classNames from "classnames";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { AboutMeI } from "./interface";
import useStyles from "./style";
import { useImages } from "../../hook";

const AboutMe: FC<AboutMeI> = ({
  aboutMeDescription,
  aboutMeTitle,
  imageName,
}) => {
  const { i18n } = useTranslation();
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  const imageUrl = useImages({ imageName });

  const styles = useStyles();
  return (
    <div
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block}`
      )}
    >
      <h3 className={classNames(`${stylesPage.titleBlock}`)}>
        {/* @ts-ignore */}
        {aboutMeTitle[i18n.language]}
      </h3>
      <div className={classNames(`${styles.aboutMe}`)}>
        <div className={classNames(`${styles.aboutMePhoto}`)}>
          <img src={imageUrl} alt="Панфилов Александр" />
        </div>
        <article className={classNames(`${styles.aboutMeArticle}`)}>
          {/* @ts-ignore */}
          {parse(aboutMeDescription[i18n.language])}
        </article>
      </div>
    </div>
  );
};

export default AboutMe;
