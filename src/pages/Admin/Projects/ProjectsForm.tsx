import React from "react";

import classNames from "classnames";
// eslint-disable-next-line import/named
import { get } from "lodash";
import { useForm } from "react-hook-form";

import SpaceBetween from "commons/SpaceBetween";
import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import { useInitFormProjects, useSaveProject } from "./hooks";
import useStyles from "./styles";
import {
  ButtonSubmit,
  Form,
  FormLabel,
  FormRow,
  LinkToUrl,
  TextError,
  Title,
} from "../commons";
import { AdminDatePicker, BlockImageInput, Dashboard } from "../components";
import { useDisabled, useSession, useUpdateTextError } from "../hooks";
import { HidePublished } from "../widget";

const ProjectsForm = () => {
  useSession();
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    setValue,
    trigger,
  } = useForm();

  const { disabledClass, setIsDisabled, isDisabled } = useDisabled();

  const styles = useStyles();
  const utilsStyles = useUtilsStyles();

  const isInitForm = useInitFormProjects({
    register,
    setValue,
  });

  const onSubmit = useSaveProject({ setIsDisabled });

  useUpdateTextError({ trigger, isSubmitted });

  return (
    <Dashboard>
      <div>
        <Title title={t("editedProject")} />

        {isInitForm && (
          <Form
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            formPosition="baceline"
            className={`${styles.projectsForm}`}
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
                  <FormLabel>{t("descriptionLabelProject")}</FormLabel>
                  <FormRow>
                    <SpaceBetween>
                      <span>ru</span>
                      <textarea
                        className={classNames(`${utilsStyles.input}`, {
                          [disabledClass]: isDisabled,
                        })}
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
                      <textarea
                        className={classNames(`${utilsStyles.input}`, {
                          [disabledClass]: isDisabled,
                        })}
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
              label={t("thumbnailLabelProject")}
              isDisabled={isDisabled}
              disabledClass={disabledClass}
              register={register}
            />

            <FormRow>
              <div
                className={classNames(
                  `${utilsStyles.dFlex} ${utilsStyles.spaceBetween}`
                )}
              >
                <div className={classNames(`${styles.colForm}`)}>
                  <FormLabel>{t("keyWordsLabelProject")}</FormLabel>
                  <FormRow>
                    <SpaceBetween>
                      <span>ru</span>
                      <input
                        className={classNames(`${utilsStyles.input}`, {
                          [disabledClass]: isDisabled,
                        })}
                        type="text"
                        {...register("keyWords.ru", {
                          required: t("requiredText"),
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
                          required: t("requiredText"),
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

                  <FormRow>
                    <FormLabel>{t("linkToProjectOnUiLink")}</FormLabel>
                    <input
                      className={classNames(`${utilsStyles.input}`, {
                        [disabledClass]: isDisabled,
                      })}
                      type="text"
                      {...register("linkToProjectOnUi", {
                        required: t("requiredText"),
                      })}
                    />

                    <TextError
                      message={
                        get(errors, "linkToProjectOnUi")?.message as string
                      }
                    />
                  </FormRow>
                </div>
              </div>
            </FormRow>
            <HidePublished
              watch={watch}
              isInitForm={isInitForm}
              disabledClass={disabledClass}
              setValue={setValue}
              isDisabled={isDisabled}
              name="hidePublished"
              label={t("hidePublishedProjectLabel")}
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
                url="/admin/projects"
              />
            </FormRow>
          </Form>
        )}
      </div>
    </Dashboard>
  );
};

export default ProjectsForm;
