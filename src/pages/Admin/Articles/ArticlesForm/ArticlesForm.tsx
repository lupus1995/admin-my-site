import React, { useEffect, useMemo, useState } from "react";

import classNames from "classnames";
import { format } from "date-fns";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AdminDatePicker from "commons/AdminDatePicker";
import AdminEditor from "commons/AdminEditor";
import BlockImageInput from "commons/BlockImageInput";
import ButtonSubmit from "commons/ButtonSubmit";
import Dashboard from "commons/Dashboard";
import Form from "commons/Form";
import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import SpaceBetween from "commons/SpaceBetween";
import TextError from "commons/TextError";
import Title from "commons/Title";
import { useDisabled, useSession, useUpdateTextError } from "pages/Admin/hooks";
import { hasWindow } from "utils/helpers";
import { ResponseI } from "utils/interfaces";
import useUtilsStyles from "utils/styles";

import { ArticleI } from "../../../interface";
import { saveArticle, getArticle } from "./api";
import { LinkToArticleList, HidePublishedArticle } from "./components";
import useStyles from "./style";

const ArticlesForm = () => {
  useSession();
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

  useUpdateTextError({ trigger, isSubmitted });

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
      register("title.ru", { required: t("requiredText") });
      register("title.en", { required: t("requiredText") });
      register("description.ru", { required: t("requiredText") });
      register("description.en", { required: t("requiredText") });
      register("text.ru", { required: t("requiredText") });
      register("text.en", { required: t("requiredText") });
      register("keyWords.ru", { required: t("requiredText") });
      register("keyWords.en", { required: t("requiredText") });
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
              <div
                className={classNames(
                  `${utilsStyles.dFlex} ${utilsStyles.spaceBetween}`
                )}
              >
                <div className={classNames(`${styles.colForm}`)}>
                  <FormLabel>{t("firstBlockTitleLabel")}</FormLabel>
                  <FormRow>
                    <SpaceBetween>
                      <span>ru</span>
                      <input
                        className={classNames(`${utilsStyles.input}`, {
                          [disabledClass]: isDisabled,
                        })}
                        type="text"
                        role="textbox"
                        {...register("title.ru", {
                          required: t("requiredText"),
                        })}
                      />
                    </SpaceBetween>
                    <TextError
                      message={get(errors, "title.ru")?.message as string}
                    />
                  </FormRow>

                  <FormRow>
                    <SpaceBetween>
                      <span>en</span>
                      <input
                        className={classNames(`${utilsStyles.input}`, {
                          [disabledClass]: isDisabled,
                        })}
                        type="text"
                        role="textbox"
                        {...register("title.en", {
                          required: t("requiredText"),
                        })}
                      />
                    </SpaceBetween>
                    <TextError
                      message={get(errors, "title.en")?.message as string}
                    />
                  </FormRow>
                </div>
                <div className={classNames(`${styles.colForm}`)}>
                  <FormLabel>{t("descriptionLabel")}</FormLabel>
                  <FormRow>
                    <SpaceBetween>
                      <span>ru</span>
                      <input
                        className={classNames(`${utilsStyles.input}`, {
                          [disabledClass]: isDisabled,
                        })}
                        type="text"
                        {...register("description.ru", {
                          required: t("requiredText"),
                        })}
                      />
                    </SpaceBetween>
                    <TextError
                      message={get(errors, "description.ru")?.message as string}
                    />
                  </FormRow>
                  <FormRow>
                    <SpaceBetween>
                      <span>en</span>
                      <input
                        className={classNames(`${utilsStyles.input}`, {
                          [disabledClass]: isDisabled,
                        })}
                        type="text"
                        {...register("description.en", {
                          required: t("requiredText"),
                        })}
                      />
                    </SpaceBetween>
                    <TextError
                      message={get(errors, "description.en")?.message as string}
                    />
                  </FormRow>
                </div>
              </div>
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
              register={register}
            />

            {hasWindow() && (
              <div
                className={classNames(
                  `${utilsStyles.dFlex} ${utilsStyles.spaceBetween}`
                )}
              >
                <div className={classNames(`${styles.colForm}`)}>
                  <AdminEditor
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    isSubmitted={isSubmitted}
                    trigger={trigger}
                    watch={watch}
                    isDisabled={isDisabled}
                    disabledClass={disabledClass}
                    name="text.ru"
                    label={t("textLabel")}
                    language="ru"
                  />
                </div>

                <div className={classNames(`${styles.colForm}`)}>
                  <AdminEditor
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    isSubmitted={isSubmitted}
                    trigger={trigger}
                    watch={watch}
                    isDisabled={isDisabled}
                    disabledClass={disabledClass}
                    name="text.en"
                    label={t("textLabel")}
                    language="en"
                  />
                </div>
              </div>
            )}

            <FormRow>
              <div
                className={classNames(
                  `${utilsStyles.dFlex} ${utilsStyles.spaceBetween}`
                )}
              >
                <div className={classNames(`${styles.colForm}`)}>
                  <FormLabel>{t("keyWordsLabel")}</FormLabel>
                  <FormRow>
                    <SpaceBetween>
                      <span>ru</span>
                      <input
                        className={classNames(`${utilsStyles.input}`, {
                          [disabledClass]: isDisabled,
                        })}
                        type="text"
                        {...register("keyWords.ru", {
                          required: t("requiredText.ru"),
                        })}
                      />
                    </SpaceBetween>
                    <TextError
                      message={get(errors, "keyWords.ru")?.message as string}
                    />
                  </FormRow>
                  <FormRow>
                    <SpaceBetween>
                      <span>en</span>
                      <input
                        className={classNames(`${utilsStyles.input}`, {
                          [disabledClass]: isDisabled,
                        })}
                        type="text"
                        {...register("keyWords.en", {
                          required: t("requiredText.en"),
                        })}
                      />
                    </SpaceBetween>
                    <TextError
                      message={get(errors, "keyWords.en")?.message as string}
                    />
                  </FormRow>
                </div>
                <div className={classNames(`${styles.colForm}`)}>
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
                </div>
              </div>
            </FormRow>
            <HidePublishedArticle
              watch={watch}
              isInitForm={isInitForm}
              disabledClass={disabledClass}
              setValue={setValue}
              isDisabled={isDisabled}
            />

            <FormRow>
              <ButtonSubmit
                isDisabled={isDisabled}
                disabledClass={disabledClass}
                hasFullWidth={false}
              />
              <LinkToArticleList
                isDisabled={isDisabled}
                disabledClass={disabledClass}
              />
              {id && (
                <button
                  className={classNames(`${utilsStyles.button}`, {
                    [disabledClass]: isDisabled,
                  })}
                  type="button"
                  onClick={() => navigate(`/article/${id}?isAdmin=true`)}
                >
                  Предпросмотр
                </button>
              )}
            </FormRow>
          </Form>
        )}
      </div>
    </Dashboard>
  );
};

export default ArticlesForm;
