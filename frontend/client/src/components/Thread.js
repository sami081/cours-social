import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.action";
import Card from "../components/Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(2);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
const loadMore = () => {
  if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
    setLoadPost(true)
  }
}
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 2)
    }

    window.addEventListener('scroll', loadMore);
    return ()=> window.removeEventListener('scroll', loadMore);
  }, [loadPost, dispatch, count]);
  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
