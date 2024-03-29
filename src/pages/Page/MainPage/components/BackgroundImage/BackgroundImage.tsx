import React, { FC } from "react";

import classNames from "classnames";
import Head from "next/head";

import { URL } from "utils/constants";
import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStyleSkeleton, useStylesClasses } from "utils/stylesPage";

import { BackgroundImageI } from "./itnterface";
import useStyles from "./style";
import { useImageName } from "../../../../../commons/HookGetSizeImage/hook";

const BackgroundImage: FC<BackgroundImageI> = ({
  imageName,
  firstBlockTitle,
  firstBlockSubtitle,
}) => {
  const { language } = useLanguage();
  const { is360, is481, is721 } = useIsMediaQuery();

  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const styles = useStyles({ theme: { is360, is481, is721 } });
  const stylesSkeleton = useStyleSkeleton();

  const { imageUrl } = useImageName({
    imageName,
  });

  return (
    <>
      <Head>
        {/* @ts-ignore */}
        <meta name="vk:image" content={`${URL}/main-page/1280/${imageName}`} />
        {/* @ts-ignore */}
        <meta name="og:image" content={`${URL}/main-page/510/${imageName}`} />
      </Head>
      <div
        style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : {}}
        className={classNames(`${styles.firstBlock} ${stylesPage.block}`, {
          [stylesSkeleton.skeleton]: Boolean(imageUrl),
        })}
      >
        <div
          className={classNames(
            `${stylesPage.wrapper} ${stylesPage.container}`
          )}
        >
          <h1 className={classNames(`${styles.title}`)}>
            {/* @ts-ignore */}
            {firstBlockTitle[language]}
          </h1>
          <h2 className={classNames(`${styles.subtitle}`)}>
            {/* @ts-ignore */}
            {firstBlockSubtitle[language]}
          </h2>
        </div>
      </div>
    </>
  );
};

export default BackgroundImage;
