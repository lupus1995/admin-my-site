import React from "react";

import classNames from "classnames";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useDisabled } from "pages/Admin/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { createFeedback } from "./api";
import { ContactsI } from "./interface";
import useStyles from "./style";

const Contacts = () => {
  const style = useStyles();
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  const { disabledClass, setIsDisabled, isDisabled } = useDisabled();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: ContactsI) => {
    setIsDisabled(true);
    createFeedback({ data })
      .then((response) => {
        toast(response.message, {
          type: response.status ? "success" : "error",
          hideProgressBar: true,
          theme: "colored",
        });
      })
      .finally(() => setIsDisabled(false));
  };

  return (
    <div
      className={classNames(
        `${stylesPage.container} ${stylesPage.block} ${stylesPage.wrapper}`
      )}
    >
      <h3 className={`${stylesPage.titleBlock}`}>Контакты</h3>
      <div className={`${style.contacts}`}>
        <form onSubmit={handleSubmit(onSubmit)} action="#">
          <input
            className={`${style.input} ${style.inputHidden}`}
            type="text"
            id="falseField"
            {...register("falseField")}
          />
          <div className={`${style.inputWrapper}`}>
            <label className={`${style.label}`} htmlFor="username">
              Имя Фамилия
            </label>
            <input
              className={classNames(`${style.input}`, {
                [disabledClass]: isDisabled,
              })}
              type="text"
              id="username"
              {...register("username")}
            />
          </div>
          <div className={`${style.inputWrapper}`}>
            <label className={`${style.label}`} htmlFor="text">
              Ваши пожелания и предложения
            </label>
            <textarea
              className={classNames(`${style.input}`, {
                [disabledClass]: isDisabled,
              })}
              name="text"
              id="text"
              cols={30}
              rows={10}
              {...register("text")}
            />
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
