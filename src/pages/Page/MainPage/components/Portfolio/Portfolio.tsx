import React from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import useStyles from "./style";

const Portfolio = () => {
  const src =
    "https://images.unsplash.com/photo-1667870989611-c98033c6a534?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80";
  const {
    is360,
    is481,
    is721,
    is1367,
    is1921,
    is1081,
    isMin1367AndMax1920,
    isMin1081AndMax1366,
    isMin721AndMax1080,
  } = useIsMediaQuery();
  const styles = useStyles({
    theme: {
      is360,
      is481,
      is721,
      is1367,
      is1921,
      is1081,
      isMin1367AndMax1920,
      isMin1081AndMax1366,
      isMin721AndMax1080,
    },
  });
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  return (
    <div
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block} ${stylesPage.blockBackground}`
      )}
    >
      <h3 className={classNames(`${stylesPage.titleBlock}`)}>Портфолио</h3>

      <div className={classNames(`${styles.articlesContainer}`)}>
        <div className={classNames(`${styles.articleContainer}`)}>
          <img
            className={classNames(`${styles.previewImage}`)}
            src={src}
            alt="1"
          />
          <h4 className={classNames(`${styles.previewTitle}`)}>
            Заголовок статьи
          </h4>
          <p className={classNames(`${styles.previewDescription}`)}>
            описание статьи
          </p>
        </div>

        <div className={classNames(`${styles.articleContainer}`)}>
          <img
            className={classNames(`${styles.previewImage}`)}
            src={src}
            alt="1"
          />
          <h4 className={classNames(`${styles.previewTitle}`)}>
            Заголовок статьи
          </h4>
          <p className={classNames(`${styles.previewDescription}`)}>
            описание статьи
          </p>
        </div>

        <div className={classNames(`${styles.articleContainer}`)}>
          <img
            className={classNames(`${styles.previewImage}`)}
            src={src}
            alt="1"
          />
          <h4 className={classNames(`${styles.previewTitle}`)}>
            Заголовок статьи
          </h4>
          <p className={classNames(`${styles.previewDescription}`)}>
            описание статьи
          </p>
        </div>

        <div className={classNames(`${styles.articleContainer}`)}>
          <img
            className={classNames(`${styles.previewImage}`)}
            src={src}
            alt="1"
          />
          <h4 className={classNames(`${styles.previewTitle}`)}>
            Заголовок статьи
          </h4>
          <p className={classNames(`${styles.previewDescription}`)}>
            описание статьи
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
