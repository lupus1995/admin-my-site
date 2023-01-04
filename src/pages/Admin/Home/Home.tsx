import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AdminEditor from "commons/AdminEditor";
import BlockImageInput from "commons/BlockImageInput";
import ButtonSubmit from "commons/ButtonSubmit";
import Dashboard from "commons/Dashboard";
import Form from "commons/Form";
import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
import Title from "commons/Title";
import { hasWindow } from "utils/helpers";
import { ResponseI } from "utils/interfaces";
import useStylesUtil from "utils/styles";

import { useDisabled } from "../hooks";
import { get, save } from "./api";
import { HomeFormI } from "./interfaces";
import useStyles from "./style";

const Home = () => {
  const navigate = useNavigate();
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
  const { t } = useTranslation();

  const [isInitForm, setIsInitForm] = useState<boolean>(false);
  const [isEditForm, setIsEditForm] = useState<boolean>(false);
  const { disabledClass, setIsDisabled, isDisabled } = useDisabled();
  const [id, setId] = useState<string>("");

  const onSubmit = (data: HomeFormI) => {
    setIsDisabled(true);
    save({ data, isEditForm, id })
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
      register("firstBlockBackgroundImage", { required: t("selectedFile") });
      register("firstBlockTitle", { required: t("requiredText") });
      register("firstBlockSubtitle", { required: t("requiredText") });
      register("aboutMeTitle", { required: t("requiredText") });
      register("aboutMeDescription", { required: t("requiredText") });
      register("aboutMePhoto", { required: t("selectedFile") });

      get()
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
            setId(result.responseBody._id);
            setIsEditForm(true);
          }
        })
        .finally(() => setIsInitForm(!isInitForm));
    }
  }, [isInitForm, navigate, register, setValue, t]);

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
            />

            <FormRow>
              <FormLabel>{t("firstBlockTitleLabel")}</FormLabel>
              <input
                className={classNames(`${stylesUtils.input}`, {
                  [disabledClass]: isDisabled,
                })}
                type="text"
                {...register("firstBlockTitle", {
                  required: t("requiredText"),
                })}
              />
              <TextError message={errors.firstBlockTitle?.message as string} />
            </FormRow>

            <FormRow>
              <FormLabel>{t("firstBlockSubtitleLabel")}</FormLabel>
              <input
                className={classNames(`${stylesUtils.input}`, {
                  [disabledClass]: isDisabled,
                })}
                type="text"
                {...register("firstBlockSubtitle", {
                  required: t("requiredText"),
                })}
              />
              <TextError
                message={errors.firstBlockSubtitle?.message as string}
              />
            </FormRow>

            <FormRow>
              <FormLabel>{t("aboutMeTitleLabel")}</FormLabel>
              <input
                className={classNames(`${stylesUtils.input}`, {
                  [disabledClass]: isDisabled,
                })}
                type="text"
                {...register("aboutMeTitle", { required: t("requiredText") })}
              />
              <TextError message={errors.aboutMeTitle?.message as string} />
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
                name="aboutMeDescription"
                label={t("aboutMeDescriptionLabel")}
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

export default Home;
