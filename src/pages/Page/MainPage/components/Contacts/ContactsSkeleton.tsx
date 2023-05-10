import React from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStyleSkeleton, useStylesClasses } from "utils/stylesPage";

import useStyles from "./style";

const ContactsSkeleton = () => {
  const style = useStyles();
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const skeletonStyle = useStyleSkeleton();

  return (
    <div
      data-testid="formWrapper"
      className={classNames(
        `${stylesPage.container} ${stylesPage.block} ${stylesPage.wrapper}`
      )}
    >
      <div
        data-testid="titleFormWrapper"
        className={classNames(
          `${stylesPage.titleBlock} ${skeletonStyle.titleBlockSkeleton} ${skeletonStyle.skeleton}`
        )}
      />
      <div className={`${style.contacts}`}>
        <div className={`${style.inputWrapper}`}>
          <div
            data-testid="formLabelUsername"
            className={classNames(
              `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton} ${style.label}`
            )}
          />
          <div
            data-testid="formInputUsername"
            className={classNames(
              `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
            )}
          />
          <div
            data-testid="formLabelFeedback"
            className={classNames(
              `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton} ${style.label}`
            )}
          />
          <div
            data-testid="formInputFeedback"
            className={classNames(
              `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
            )}
          />
        </div>
        <div className={`${style.inputWrapper}`}>
          <div
            data-testid="formInputSubmit"
            className={classNames(
              `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactsSkeleton;
