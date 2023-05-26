import React, { FC } from "react";

import classNames from "classnames";

import { ContentI } from "pages/interface";
import { useIsMediaQuery } from "utils/mediaQuery";

import Content from "./Content";
import useStyles from "./style";

const ContentsContainer: FC<{
  contents: ContentI[];
}> = ({ contents }) => {
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
    isMin1600AndMax1920,
    isMin1367AndMax1600,
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
      isMin1600AndMax1920,
      isMin1367AndMax1600,
    },
  });

  return (
    <div
      data-testid="contentsContainer"
      className={classNames(`${styles.contentsContainer}`)}
    >
      {contents.map((contentItem) => (
        <Content contentItem={contentItem} key={contentItem._id} />
      ))}
    </div>
  );
};

export default ContentsContainer;
