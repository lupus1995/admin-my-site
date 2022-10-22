import React, { FC } from "react";
import { Link } from "react-router-dom";

const Dashboard: FC = ({ children }) => (
  <main>
    <aside>
      <ul>
        <li>
          <Link to="/">Главная страница</Link>
        </li>
        <li>
          <Link to="/articles">Статьи на сайте</Link>
        </li>
      </ul>
    </aside>
    {children}
  </main>
);

export default Dashboard;
