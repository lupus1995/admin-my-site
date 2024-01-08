import React, { useMemo } from "react";

import classNames from "classnames";
// eslint-disable-next-line import/named
import { get } from "lodash";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import SpaceBetween from "commons/SpaceBetween";
import {
  Title,
  Form,
  FormRow,
  FormLabel,
  TextError,
  ButtonSubmit,
  LinkToUrl,
} from "pages/Admin/commons";
import {
  Dashboard,
  BlockImageInput,
  AdminEditor,
  AdminDatePicker,
} from "pages/Admin/components";
import { useDisabled, useSession, useUpdateTextError } from "pages/Admin/hooks";
import { HidePublished } from "pages/Admin/widget";
import { useSetAdminBlogModule } from "store/services/manageModules";
import { hasWindow } from "utils/helpers";
import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import { useInitFormArticle, useSaveArticle } from "./hooks";
import useStyles from "./style";

const ArticlesForm = () => {
  useSetAdminBlogModule();
  useSession();
  const { t } = useLanguage();
  const {
    push,
    query: { id },
  } = useRouter();
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

  const onSubmit = useSaveArticle({ setIsDisabled });

  const isInitFormArticle = useInitFormArticle({ register, setValue });

  return (
    <Dashboard>
      <div>
        <Title title={titleText} />
        {isInitFormArticle && (
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

            <HidePublished
              watch={watch}
              isInitForm={isInitFormArticle}
              disabledClass={disabledClass}
              setValue={setValue}
              isDisabled={isDisabled}
              name="hidePublishedArticle"
              label={t("hidePublishedArticleLabel")}
              publishedAtValue={watch("publishedAt")}
            />

            <FormRow>
              <ButtonSubmit
                isDisabled={isDisabled}
                disabledClass={disabledClass}
                hasFullWidth={false}
              />
              <LinkToUrl
                isDisabled={isDisabled}
                disabledClass={disabledClass}
                url="/admin/articles"
              />
              {id && (
                <button
                  className={classNames(
                    `${utilsStyles.button} ${styles.previewButton}`,
                    {
                      [disabledClass]: isDisabled,
                    }
                  )}
                  type="button"
                  onClick={() => push(`/article/${id}?isAdmin=true`)}
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
