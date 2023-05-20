import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { ProjectI } from "pages/interface";
import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import { getProjects } from "./api";
import { useProjectModal } from "./hooks";
import ProjectItem from "./ProjectItem";
import { FormRow, MessageForEmptyList, Title } from "../commons";
import { AdminModal, Dashboard } from "../components";
import { useSession } from "../hooks";
import { ItemWrapper } from "../widget";

const Projects = () => {
  useSession();
  const utilsStyles = useUtilsStyles();
  const { t } = useLanguage();
  const { push } = useRouter();
  const [projects, setProjects] = useState<ProjectI[]>([]);
  const {
    toggleModal,
    handleOpenModal,
    handleCloseModal,
    handleDeletedProject,
    deletedProject,
  } = useProjectModal({ projects, setProjects });

  const handleClick = () => push("/admin/projects/create");
  useEffect(() => {
    getProjects().then((result) => {
      if (!result.status) {
        toast(t(result.message as string), {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });
      }

      if (result.responseBody) {
        setProjects(result.responseBody);
      }
    });
  }, [t]);
  return (
    <Dashboard>
      <div className={`${utilsStyles.dFlex} ${utilsStyles.flexColumn}`}>
        <FormRow>
          <Title title={t("projectsTitlePage")} />
        </FormRow>

        <FormRow>
          <button
            onClick={handleClick}
            className={classNames(`${utilsStyles.button}`)}
            type="button"
          >
            {t("createProject")}
          </button>
        </FormRow>

        {projects.length === 0 && (
          <MessageForEmptyList message={t("emptyProjects")} />
        )}

        {projects.length > 0 && (
          <div>
            {projects.map((project) => (
              <ItemWrapper
                handleClick={() => handleOpenModal(project)}
                key={project._id}
                href={`/admin/projects/edit/${project._id}`}
              >
                <ProjectItem project={project} />
              </ItemWrapper>
            ))}
          </div>
        )}
      </div>

      <AdminModal
        open={toggleModal}
        handleClose={handleCloseModal}
        handleCallback={handleDeletedProject}
      >
        <p>
          {t("deleteProjectText", {
            /* @ts-ignore */
            title: deletedProject?.title[language],
          })}
        </p>
      </AdminModal>
    </Dashboard>
  );
};

export default Projects;
