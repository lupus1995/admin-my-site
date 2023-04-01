import React, { FC } from "react";

import classNames from "classnames";
import Head from "next/head";

import { URL } from "utils/constants";
import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { BackgroundImageI } from "./itnterface";
import useStyles from "./style";
import { useImageName } from "../../../widgets/HookGetSizeImage/hook";

const BackgroundImage: FC<BackgroundImageI> = ({
  imageName,
  firstBlockTitle,
  firstBlockSubtitle,
}) => {
  const { language } = useLanguage();
  const { is360, is481, is721, is1081, is1367, is1921, isMinDevicePixelRatio } =
    useIsMediaQuery();

  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const styles = useStyles({ theme: { is360, is481, is721 } });

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

  return (
    <>
      <Head>
        {/* @ts-ignore */}
        <meta name="vk:image" content={`${URL}/main-page/510/${imageName}`} />
        {/* @ts-ignore */}
        <meta name="og:image" content={`${URL}/main-page/510/${imageName}`} />
      </Head>
      <div
        style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : {}}
        className={classNames(`${styles.firstBlock} ${stylesPage.block}`)}
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
