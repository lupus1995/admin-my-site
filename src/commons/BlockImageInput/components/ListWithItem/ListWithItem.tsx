import React, { FC } from "react";

import classNames from "classnames";

import FormRow from "commons/FormRow";
import useUtilsStyles from "utils/styles";

import { ListWithItemI } from "./interface";
import useStyles from "./style";

const ListWithItem: FC<ListWithItemI> = ({
  disabledClass,
  isDisabled,
  image,
  label,
  onImageUpdate,
  onImageRemove,
  index,
}) => {
  const utilsStyles = useUtilsStyles();
  const styles = useStyles();
  return (
    <div className="image-item">
      <FormRow>
        <img className={`${styles.image}`} src={image?.data_url} alt={label} />
      </FormRow>
      <div className={styles.imageManage}>
        <button
          className={classNames(
            `${utilsStyles.button} ${styles.imageManageMR}`,
            {
              [disabledClass]: isDisabled,
            }
          )}
          type="button"
          onClick={() => onImageUpdate(index)}
        >
          Обновить
        </button>
        <button
          className={classNames(`${utilsStyles.button}`, {
            [disabledClass]: isDisabled,
          })}
          type="button"
          onClick={() => onImageRemove(index)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default ListWithItem;
