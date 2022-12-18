import React, { FC } from "react";

import classNames from "classnames";
import parse from "html-react-parser";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { useImages } from "../../hook";
import { AboutMeI } from "./interface";
import useStyles from "./style";

const AboutMe: FC<AboutMeI> = ({
  aboutMeDescription,
  aboutMeTitle,
  imageName,
}) => {
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
      <h3 className={classNames(`${stylesPage.titleBlock}`)}>{aboutMeTitle}</h3>
      <div className={classNames(`${styles.aboutMe}`)}>
        <div className={classNames(`${styles.aboutMePhoto}`)}>
          <img src={imageUrl} alt="Панфилов Александр" />
        </div>
        <article className={classNames(`${styles.aboutMeArticle}`)}>
          {parse(aboutMeDescription)}
        </article>
      </div>
    </div>
  );
};

export default AboutMe;
