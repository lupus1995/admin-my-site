import React from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import useStyles from "./style";

const Contacts = () => {
  const style = useStyles();
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  return (
    <div
      className={classNames(
        `${stylesPage.container} ${stylesPage.block} ${stylesPage.wrapper}`
      )}
    >
      <h3 className={`${stylesPage.titleBlock}`}>Контакты</h3>
      <div className={`${style.contacts}`}>
        <form action="#">
          <div className={`${style.inputWrapper}`}>
            <label className={`${style.label}`} htmlFor="username">
              Имя Фамилия
            </label>
            <input className={`${style.input}`} type="text" id="username" />
          </div>
          <div className={`${style.inputWrapper}`}>
            <label className={`${style.label}`} htmlFor="text">
              Ваши пожелания и предложения
            </label>
            <textarea
              className={`${style.input}`}
              name="text"
              id="text"
              cols={30}
              rows={10}
            ></textarea>
          </div>

          <div className={`${style.inputWrapper}`}>
            <input
              className={`${style.input} ${style.inputSubmit}`}
              type="submit"
              id="submit"
            />
          </div>
        </form>
        <div>ссылки на иконки, в разработке</div>
      </div>
    </div>
  );
};

export default Contacts;
