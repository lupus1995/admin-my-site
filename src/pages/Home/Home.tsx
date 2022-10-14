import React, { useEffect, useState } from 'react';

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
        <li key={key}>{item.title}</li>
      ))}
    </ul>
  );
};

export default Home;
