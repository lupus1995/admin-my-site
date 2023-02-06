import React, { FC, useCallback, useState } from "react";

import classNames from "classnames";
import { set } from "local-storage";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Footer from "../Footer";
import { SwitchLanguage } from "./components";
import { urls } from "./constants";
import { getRootParentLink } from "./helpers";
import { LinkI } from "./interface";
import useStyles from "./style";

const Dashboard: FC = ({ children }) => {
  const style = useStyles();
  const location = useLocation();
  const params = useParams<Record<string, string>>();
  const navigation = useNavigate();
  const [activeLink, setActiveLink] = useState<LinkI>(() => {
    const pathWithoutParam = Object.values(params).reduce(
      (path, param) => path.replace("/" + param, ""),
      location.pathname
    );
    const activeLinkAddress = urls.find((item) => item.to === pathWithoutParam);
    const link = getRootParentLink({
      activeLink: activeLinkAddress,
    });

    return link;
  });

  const handleExit = useCallback(() => {
    navigation("/signin");
    set("accessToken", "");
    set("refreshToken", "");
  }, [navigation]);
  const { t } = useTranslation();

  return (
    <main className={style.pageWrapper}>
      <aside className={style.dashboard}>
        <p
          className={classNames(
            `${style.dashboardLogo} ${style.dashboardLinkWrapper}`
          )}
        >
          {t("adminPanel")}
        </p>
        <ul>
          {urls
            .filter((item) => item.parent === null)
            .map((item) => {
              return (
                <li
                  className={classNames(style.dashboardLinkWrapper, {
                    [style.dashboardLinkActive]:
                      getRootParentLink({
                        activeLink,
                      }).to === item.to,
                  })}
                  key={item.to}
                >
                  <Link
                    onClick={() => setActiveLink(item)}
                    className={classNames({
                      [style.dashboardLink]: true,
                    })}
                    to={item.to}
                  >
                    {t(item.text)}
                  </Link>
                </li>
              );
            })}
          <SwitchLanguage />
          <li className={classNames(style.dashboardLinkWrapper)}>
            <button
              onClick={handleExit}
              className={classNames({
                [style.dashboardLink]: true,
                [style.dashboardButton]: true,
              })}
              type="button"
            >
              {t("exit")}
            </button>
          </li>
        </ul>
      </aside>
      <div>
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default Dashboard;
