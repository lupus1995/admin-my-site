import React, { FC } from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { useImages } from "../../hook";
import { BackgroundImageI } from "./itnterface";
import useStyles from "./style";

const BackgroundImage: FC<BackgroundImageI> = ({
  imageName,
  firstBlockTitle,
  firstBlockSubtitle,
}) => {
  const { is360, is481, is721 } = useIsMediaQuery();

  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const styles = useStyles({ theme: { is360, is481, is721 } });

  const imageUrl = useImages({ imageName });

  return (
    <div
      style={{ backgroundImage: `url("${imageUrl}")` }}
      className={classNames(`${styles.firstBlock} ${stylesPage.block}`)}
    >
      <div
        className={classNames(`${stylesPage.wrapper} ${stylesPage.container}`)}
      >
        <h1 className={classNames(`${styles.title}`)}>{firstBlockTitle}</h1>
        <h2 className={classNames(`${styles.subtitle}`)}>
          {firstBlockSubtitle}
        </h2>
      </div>
    </div>
  );
};

export default BackgroundImage;
