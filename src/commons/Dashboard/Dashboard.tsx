import React, { FC, useState } from "react";

import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

import { urls } from "./constants";
import useStyles from "./style";

const Dashboard: FC = ({ children }) => {
  const style = useStyles();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>(location.pathname);

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
                [style.dashboardLinkActive]: activeLink === item.to,
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
        </ul>
      </aside>
      {children}
    </main>
  );
};

export default Dashboard;
