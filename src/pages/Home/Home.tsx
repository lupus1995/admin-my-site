import React, { useEffect, useState } from 'react';
import style from './Home.module.scss';

const Home = () => {
  const [posts, setPosts] = useState<{ title: string }[]>([]);
  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then(setPosts);
  }, []);

  return (
    <ul>
      {posts.map((item, key) => (
        <li className={style.item} key={key}>{item.title}</li>
      ))}
    </ul>
  );
};

export default Home;
