import React from "react";

import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useDisabled } from "pages/Admin/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { createFeedback } from "./api";
import { ContactsI } from "./interface";
import useStyles from "./style";

const Contacts = () => {
  const { t } = useTranslation();
  const style = useStyles();
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  const { disabledClass, setIsDisabled, isDisabled } = useDisabled();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: ContactsI) => {
    setIsDisabled(true);
    createFeedback({ data })
      .then((response) => {
        toast(t(response.message), {
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
      <h3 className={`${stylesPage.titleBlock}`}>{t("contactsTitlePage")}</h3>
      <div className={`${style.contacts}`}>
        <form onSubmit={handleSubmit(onSubmit)} action="#">
          <input
            className={`${style.input} ${style.inputHidden}`}
            type="text"
            data-testid="falseField"
            id="falseField"
            {...register("falseField")}
          />
          <div className={`${style.inputWrapper}`}>
            <label className={`${style.label}`} htmlFor="username">
              {t("userNameLastName")}
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
              {t("feedbackPage")}
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
              data-testid="submit"
              className={`${style.input} ${style.inputSubmit}`}
              type="submit"
              id="submit"
              value={t("submit")}
            />
          </div>
        </form>
        <div>ссылки на иконки, в разработке</div>
      </div>
    </div>
  );
};

export default Contacts;
