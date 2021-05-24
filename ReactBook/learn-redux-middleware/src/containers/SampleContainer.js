import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Sample from "../components/Sample";
import {} from "../modules/sample";
import useActions from "../lib/useAction";
import { getPost, getUsers } from "../modules/sample";
const { userEffect } = React;
const SampleContainer = () => {
  const { post, users, loadingPost, loadingUsers } = useSelector(
    ({ sample, loading }) => ({
      post: sample.post,
      users: sample.users,
      loadingPost: loading.GET_POST,
      loadingUsers: loading.GET_USERS,
    })
  );
  const [getPost1, getUsers1] = useActions([getPost, getUsers], []);

  //클래스 형태 컴포넌트라면 componentDidMount
  useEffect(() => {
    const fn = async () => {
      try {
        getPost1(1);
        getUsers1(1);
      } catch (e) {
        console.log(e); //에러조회
      }
    };
    fn();
  }, [getPost, getUsers]);

  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    ></Sample>
  );
};

export default SampleContainer;
