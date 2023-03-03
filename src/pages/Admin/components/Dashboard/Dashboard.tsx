import React, { FC, useCallback, useState } from "react";

import classNames from "classnames";
import { set } from "local-storage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { SwitchLanguage } from "./components";
import { urls } from "./constants";
import { getRootParentLink } from "./helpers";
import { LinkI } from "./interface";
import useStyles from "./style";
import Footer from "../../../../commons/Footer";

const Dashboard: FC = ({ children }) => {
  const style = useStyles();
  const router = useRouter();
  const { pathname, push } = router;
  const [activeLink, setActiveLink] = useState<LinkI>(() => {
    const activeLinkAddress = urls.find((item) => item.to === pathname);
    // console.log('activeLinkAddress', activeLinkAddress);
    const link = getRootParentLink({
      activeLink: activeLinkAddress,
    });

    return link;
  });

  const handleExit = useCallback(() => {
    push("/signin");
    set("accessToken", "");
    set("refreshToken", "");
  }, [push]);
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
                    href={item.to}
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
