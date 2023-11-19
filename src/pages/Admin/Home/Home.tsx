import React, { useEffect, useState } from "react";

import classNames from "classnames";
// eslint-disable-next-line import/named
import { get as getLodash } from "lodash";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import SpaceBetween from "commons/SpaceBetween";
import { useAppDispatch } from "store/hooks";
import { hasWindow } from "utils/helpers";
import { useLanguage } from "utils/hooks";
import { ResponseI } from "utils/interfaces";
import useStylesUtil from "utils/styles";

import { get, save } from "./api";
import useStyles from "./style";
import { HomeFormI } from "../../interface";
import {
  Title,
  Form,
  FormRow,
  FormLabel,
  TextError,
  ButtonSubmit,
} from "../commons";
import { AdminEditor, BlockImageInput, Dashboard } from "../components";
import { useDisabled, useSession, useUpdateTextError } from "../hooks";

const Home = () => {
  useSession();
  const { push } = useRouter();
  const styles = useStyles();
  const stylesUtils = useStylesUtil();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    setValue,
    trigger,
  } = useForm();
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  useUpdateTextError({ trigger, isSubmitted });

  const [isInitForm, setIsInitForm] = useState<boolean>(false);
  const [isEditForm, setIsEditForm] = useState<boolean>(false);
  const { disabledClass, setIsDisabled, isDisabled } = useDisabled();
  const [id, setId] = useState<string>("");

  const onSubmit = (data: HomeFormI) => {
    setIsDisabled(true);
    dispatch(save({ data, isEditForm, id }))
      .then((response: ResponseI) => {
        toast(t(response.message), {
          type: response.status ? "success" : "error",
          hideProgressBar: true,
          theme: "colored",
        });

        if (response.redirectTo) {
          push(response.redirectTo);
        }
      })
      .finally(() => setIsDisabled(false));
  };

  useEffect(() => {
    if (!isInitForm) {
      register("firstBlockBackgroundImage", { required: t("selectedFile") });
      register("firstBlockTitle.ru", { required: t("requiredText") });
      register("firstBlockTitle.en", { required: t("requiredText") });
      register("firstBlockSubtitle.ru", { required: t("requiredText") });
      register("firstBlockSubtitle.en", { required: t("requiredText") });
      register("aboutMeTitle.ru", { required: t("requiredText") });
      register("aboutMeTitle.en", { required: t("requiredText") });
      register("aboutMeDescription.ru", { required: t("requiredText") });
      register("aboutMeDescription.en", { required: t("requiredText") });
      register("aboutMePhoto", { required: t("selectedFile") });
      register("descriptionPage.ru", { required: t("requiredText") });
      register("descriptionPage.en", { required: t("requiredText") });
      register("keyWordsPage.ru", { required: t("requiredText") });
      register("keyWordsPage.en", { required: t("requiredText") });

      dispatch(get())
        .then((result) => {
          if (!result.status) {
            toast(t(result.message), {
              type: "error",
              hideProgressBar: true,
              theme: "colored",
            });
          }

          if (result.responseBody) {
            Object.entries(result.responseBody).forEach(
              ([key, value]: [string, string]) => {
                setValue(key, value);
              }
            );
            setId(result.responseBody._id);
            setIsEditForm(true);
          }
        })
        .finally(() => setIsInitForm(!isInitForm));
    }
  }, [dispatch, isInitForm, push, register, setValue, t]);

  return (
    <Dashboard>
      <div>
        <Title title={t("mainPage")} />
        {isInitForm && (
          <Form
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            formPosition="baceline"
            className={`${styles.homeForm}`}
          >
            <BlockImageInput
              watch={watch}
              setValue={setValue}
              errors={errors}
              isSubmitted={isSubmitted}
              trigger={trigger}
              name="firstBlockBackgroundImage"
              label={t("firstBlockBackgroundImageLabel")}
              isDisabled={isDisabled}
              disabledClass={disabledClass}
              register={register}
            />

            <FormRow>
              <FormLabel>{t("firstBlockTitleLabel")}</FormLabel>
              <FormRow>
                <SpaceBetween>
                  <span>ru</span>
                  <input
                    className={classNames(`${stylesUtils.input}`, {
                      [disabledClass]: isDisabled,
                    })}
                    type="text"
                    {...register("firstBlockTitle.ru", {
                      required: t("requiredText"),
                    })}
                  />
                </SpaceBetween>
                <TextError
                  message={
                    getLodash(errors, "firstBlockTitle.ru")?.message as string
                  }
                />
              </FormRow>

              <FormRow>
                <SpaceBetween>
                  <span>en</span>
                  <input
                    className={classNames(`${stylesUtils.input}`, {
                      [disabledClass]: isDisabled,
                    })}
                    type="text"
                    {...register("firstBlockTitle.en", {
                      required: t("requiredText"),
                    })}
                  />
                </SpaceBetween>
                <TextError
                  message={
                    getLodash(errors, "firstBlockTitle.en")?.message as string
                  }
                />
              </FormRow>
            </FormRow>

            <FormRow>
              <FormLabel>{t("firstBlockSubtitleLabel")}</FormLabel>
              <FormRow>
                <SpaceBetween>
                  <span>ru</span>
                  <input
                    className={classNames(`${stylesUtils.input}`, {
                      [disabledClass]: isDisabled,
                    })}
                    type="text"
                    {...register("firstBlockSubtitle.ru", {
                      required: t("requiredText"),
                    })}
                  />
                </SpaceBetween>
                <TextError
                  message={
                    getLodash(errors, "firstBlockSubtitle.ru")
                      ?.message as string
                  }
                />
              </FormRow>

              <FormRow>
                <SpaceBetween>
                  <span>en</span>
                  <input
                    className={classNames(`${stylesUtils.input}`, {
                      [disabledClass]: isDisabled,
                    })}
                    type="text"
                    {...register("firstBlockSubtitle.en", {
                      required: t("requiredText"),
                    })}
                  />
                </SpaceBetween>
                <TextError
                  message={
                    getLodash(errors, "firstBlockSubtitle.en")
                      ?.message as string
                  }
                />
              </FormRow>
            </FormRow>

            <FormRow>
              <FormLabel>{t("aboutMeTitleLabel")}</FormLabel>
              <FormRow>
                <SpaceBetween>
                  <span>ru</span>
                  <input
                    className={classNames(`${stylesUtils.input}`, {
                      [disabledClass]: isDisabled,
                    })}
                    type="text"
                    {...register("aboutMeTitle.ru", {
                      required: t("requiredText"),
                    })}
                  />
                </SpaceBetween>
                <TextError
                  message={
                    getLodash(errors, "aboutMeTitle.ru")?.message as string
                  }
                />
              </FormRow>

              <FormRow>
                <SpaceBetween>
                  <span>en</span>
                  <input
                    className={classNames(`${stylesUtils.input}`, {
                      [disabledClass]: isDisabled,
                    })}
                    type="text"
                    {...register("aboutMeTitle.en", {
                      required: t("requiredText"),
                    })}
                  />
                </SpaceBetween>
                <TextError
                  message={
                    getLodash(errors, "aboutMeTitle.en")?.message as string
                  }
                />
              </FormRow>
            </FormRow>

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
                name="aboutMeDescription.ru"
                label={t("aboutMeDescriptionLabel")}
                language="ru"
              />
            )}

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
                name="aboutMeDescription.en"
                label={t("aboutMeDescriptionLabel")}
                language="en"
              />
            )}

            <BlockImageInput
              watch={watch}
              setValue={setValue}
              errors={errors}
              isSubmitted={isSubmitted}
              trigger={trigger}
              name="aboutMePhoto"
              label={t("aboutMePhotoLabel")}
              isDisabled={isDisabled}
              disabledClass={disabledClass}
              register={register}
            />

            <FormLabel>{t("descriptionPageLabel")}</FormLabel>
            <FormRow>
              <SpaceBetween>
                <span>ru</span>
                <input
                  className={classNames(`${stylesUtils.input}`, {
                    [disabledClass]: isDisabled,
                  })}
                  type="text"
                  {...register("descriptionPage.ru", {
                    required: t("requiredText"),
                  })}
                />
              </SpaceBetween>
              <TextError
                message={
                  getLodash(errors, "descriptionPage.ru")?.message as string
                }
              />
            </FormRow>

            <FormRow>
              <SpaceBetween>
                <span>en</span>
                <input
                  className={classNames(`${stylesUtils.input}`, {
                    [disabledClass]: isDisabled,
                  })}
                  type="text"
                  {...register("descriptionPage.en", {
                    required: t("requiredText"),
                  })}
                />
              </SpaceBetween>
              <TextError
                message={
                  getLodash(errors, "descriptionPage.en")?.message as string
                }
              />
            </FormRow>

            <FormLabel>{t("keyWordsPageLabel")}</FormLabel>
            <FormRow>
              <SpaceBetween>
                <span>ru</span>
                <input
                  className={classNames(`${stylesUtils.input}`, {
                    [disabledClass]: isDisabled,
                  })}
                  type="text"
                  {...register("keyWordsPage.ru", {
                    required: t("requiredText"),
                  })}
                />
              </SpaceBetween>
              <TextError
                message={
                  getLodash(errors, "keyWordsPage.ru")?.message as string
                }
              />
            </FormRow>

            <FormRow>
              <SpaceBetween>
                <span>en</span>
                <input
                  className={classNames(`${stylesUtils.input}`, {
                    [disabledClass]: isDisabled,
                  })}
                  type="text"
                  {...register("keyWordsPage.en", {
                    required: t("requiredText"),
                  })}
                />
              </SpaceBetween>
              <TextError
                message={
                  getLodash(errors, "keyWordsPage.en")?.message as string
                }
              />
            </FormRow>

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

export default Home;
