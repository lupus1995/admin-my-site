import React, { useEffect, useMemo, useState } from "react";

import classNames from "classnames";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AdminCheckbox from "commons/AdminCheckbox";
import AdminDatePicker from "commons/AdminDatePicker";
import AdminEditor from "commons/AdminEditor";
import BlockImageInput from "commons/BlockImageInput";
import ButtonSubmit from "commons/ButtonSubmit";
import Dashboard from "commons/Dashboard";
import Form from "commons/Form";
import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
import Title from "commons/Title";
import { useDisabled } from "pages/Admin/hooks";
import { hasWindow } from "utils/helpers";
import { ResponseI } from "utils/interfaces";
import useUtilsStyles from "utils/styles";

import { ArticleI } from "../interface";
import { saveArticle, getArticle } from "./api";
import useStyles from "./style";

const ArticlesForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isInitForm, setIsInitForm] = useState<boolean>(false);
  const { disabledClass, setIsDisabled, isDisabled } = useDisabled();

  const styles = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    setValue,
    trigger,
  } = useForm();

  const utilsStyles = useUtilsStyles();

  const titleText = useMemo(() => {
    if (id) {
      return t("editedArticle");
    }

    return t("createdArticle");
  }, [id, t]);

  const onSubmit = (data: ArticleI) => {
    setIsDisabled(true);
    saveArticle(data)
      .then((response: ResponseI) => {
        toast(t(response.message), {
          type: response.status ? "success" : "error",
          hideProgressBar: true,
          theme: "colored",
        });

        if (response.redirectTo) {
          navigate(response.redirectTo);
        }
      })
      .finally(() => setIsDisabled(false));
  };

  useEffect(() => {
    if (!isInitForm) {
      register("title", { required: t("requiredText") });
      register("description", { required: t("requiredText") });
      register("thumbnail", { required: t("selectedFile") });
      register("text", { required: t("requiredText") });
      register("keyWords", { required: t("requiredText") });
      register("publishedAt", { required: t("requiredText") });
      register("createdAt");
      register("updatedAt");
      register("hidePublishedArticle");

      if (id) {
        getArticle({ id })
          .then((result) => {
            if (!result.status) {
              toast(t(result.message), {
                type: "error",
                hideProgressBar: true,
                theme: "colored",
              });

              navigate(result.redirectTo);
            }

            if (result.responseBody) {
              Object.entries(result.responseBody).forEach(
                ([key, value]: [string, string]) => {
                  setValue(key, value);
                }
              );
            }
          })
          .finally(() => setIsInitForm(true));
      } else {
        setValue("createdAt", format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
        setValue("updatedAt", format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
        setValue("hidePublishedArticle", false);
        setIsInitForm(true);
      }
    }
  }, [id, isInitForm, navigate, register, setValue, t]);

  return (
    <Dashboard>
      <div>
        <Title title={titleText} />
        {isInitForm && (
          <Form
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            formPosition="baceline"
            className={`${styles.articlesForm}`}
          >
            <FormRow>
              <FormLabel>{t("firstBlockTitleLabel")}</FormLabel>
              <input
                className={classNames(`${utilsStyles.input}`, {
                  [disabledClass]: isDisabled,
                })}
                type="text"
                role="textbox"
                {...register("title", {
                  required: t("requiredText"),
                })}
              />
              <TextError message={errors.title?.message as string} />
            </FormRow>
            <FormRow>
              <FormLabel>{t("descriptionLabel")}</FormLabel>
              <input
                className={classNames(`${utilsStyles.input}`, {
                  [disabledClass]: isDisabled,
                })}
                type="text"
                {...register("description", {
                  required: t("requiredText"),
                })}
              />
              <TextError message={errors.description?.message as string} />
            </FormRow>

            <BlockImageInput
              watch={watch}
              setValue={setValue}
              errors={errors}
              isSubmitted={isSubmitted}
              trigger={trigger}
              name="thumbnail"
              label={t("thumbnailLabel")}
              isDisabled={isDisabled}
              disabledClass={disabledClass}
            />

            {hasWindow() && (
              <AdminEditor
                register={register}
                setValue={setValue}
                errors={errors}
                isSubmitted={isSubmitted}
                trigger={trigger}
                watch={watch}
                isDisabled={isDisabled}
                disabledClass={disabledClass}
                name="text"
                label={t("textLabel")}
              />
            )}

            <FormRow>
              <FormLabel>{t("keyWordsLabel")}</FormLabel>
              <input
                className={classNames(`${utilsStyles.input}`, {
                  [disabledClass]: isDisabled,
                })}
                type="text"
                {...register("keyWords", {
                  required: t("requiredText"),
                })}
              />
              <TextError message={errors.keyWords?.message as string} />
            </FormRow>
            <AdminDatePicker
              disabledClass={disabledClass}
              isDisabled={isDisabled}
              errors={errors}
              defaultValue={watch("publishedAt")}
              setValue={setValue}
              name="publishedAt"
              label={t("publishedAtLabel")}
              trigger={trigger}
              isSubmitted={isSubmitted}
            />
            <AdminCheckbox
              isDisabled
              disabledClass={disabledClass}
              name="hidePublishedArticle"
              setValue={setValue}
              value={watch("hidePublishedArticle")}
              label={t("hidePublishedArticleLabel")}
            />

            <ButtonSubmit
              isDisabled={isDisabled}
              disabledClass={disabledClass}
            />
          </Form>
        )}
      </div>
    </Dashboard>
  );
};

export default ArticlesForm;
