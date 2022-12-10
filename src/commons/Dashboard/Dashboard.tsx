import React, { FC, useCallback, useState } from "react";

import classNames from "classnames";
import { set } from "local-storage";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { urls, urlsDependencies } from "./constants";
import useStyles from "./style";

const Dashboard: FC = ({ children }) => {
  const style = useStyles();
  const location = useLocation();
  const navigation = useNavigate();
  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  const handleExit = useCallback(() => {
    navigation("/signin");
    set("accessToken", "");
    set("refreshToken", "");
  }, [navigation]);

  return (
    <main className={style.pageWrapper}>
      <aside className={style.dashboard}>
        <p
          className={classNames(
            `${style.dashboardLogo} ${style.dashboardLinkWrapper}`
          )}
        >
          Админка
        </p>
        <ul>
          {urls.map((item) => (
            <li
              className={classNames(style.dashboardLinkWrapper, {
                [style.dashboardLinkActive]:
                  activeLink === item.to ||
                  urlsDependencies[item.to]?.find((urlDependence: string) =>
                    urlDependence.search(location.pathname)
                  ),
              })}
              key={item.to}
            >
              <Link
                onClick={() => setActiveLink(item.to)}
                className={classNames({
                  [style.dashboardLink]: true,
                })}
                to={item.to}
              >
                {item.text}
              </Link>
            </li>
          ))}
          <li className={classNames(style.dashboardLinkWrapper)}>
            <button
              onClick={handleExit}
              className={classNames({
                [style.dashboardLink]: true,
                [style.dashboardButton]: true,
              })}
              type="button"
            >
              Выйти
            </button>
          </li>
        </ul>
      </aside>
      {children}
    </main>
  );
};

export default Dashboard;
