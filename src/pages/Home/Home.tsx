import React from "react";
import Dashboard from "commons/Dashboard";
// import style from './Home.module.scss';
import useStyles from "./style";

const Home = () => {
  const styles = useStyles();
  return (
    <Dashboard>
      <div>
        <h3 className={styles.pageTitle}>Главная страница</h3>
        <form className={styles.homeForm} action="#"></form>
      </div>
    </Dashboard>
  );
};

export default Home;
