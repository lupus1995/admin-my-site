import React, { FC, useEffect, useMemo, useState } from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { getImages } from "./api";
import { SIZES_FOR_FILES } from "./constants";
import { findImage } from "./helpers";
import { ImageI } from "./interface";
import useStyles from "./style";

const BackgroundImage: FC<{ imageName: string }> = ({ imageName }) => {
  const [images, setImages] = useState<ImageI[]>([]);
  const { is360, is481, is721, is1081, is1367, is1921, isMinDevicePixelRatio } =
    useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const styles = useStyles({ theme: { is360, is481, is721 } });

  const imageUrl = useMemo(() => {
    if (isMinDevicePixelRatio) {
      if (is1921) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_1921@2X"] });
      }

      if (is1367) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_1367@2X"] });
      }

      if (is1081) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_1081@2X"] });
      }

      if (is721) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_721@2X"] });
      }

      if (is481) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_481@2X"] });
      }

      if (is360) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_360@2X"] });
      }
    }

    if (is1921) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_1921 });
    }

    if (is1367) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_1367 });
    }

    if (is1081) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_1081 });
    }

    if (is721) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_721 });
    }

    if (is481) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_481 });
    }

    if (is360) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_360 });
    }

    return "";
  }, [
    images,
    is1081,
    is1367,
    is1921,
    is360,
    is481,
    is721,
    isMinDevicePixelRatio,
  ]);

  useEffect(() => {
    getImages({ imageName: "firstBlockBackgroundImage.jpeg" }).then(
      ({ status, responseBody }) => {
        if (status) {
          setImages(responseBody);
        }
      }
    );
  }, [imageName]);

  return (
    <div
      style={{ backgroundImage: `url("${imageUrl}")` }}
      className={classNames(`${styles.firstBlock} ${stylesPage.block}`)}
    >
      <div
        className={classNames(`${stylesPage.wrapper} ${stylesPage.container}`)}
      >
        <h1 className={classNames(`${styles.title}`)}>WEB FOR SELF</h1>
        <h2 className={classNames(`${styles.subtitle}`)}>
          программиварование для себя и окружающих
        </h2>
      </div>
    </div>
  );
};

export default BackgroundImage;
