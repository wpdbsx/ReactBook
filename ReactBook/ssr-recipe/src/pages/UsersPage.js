import { Route } from "react-router";
import UserContainer from "../containers/UserContainer";
import UsersContainer from "../containers/UsersContainer";

const UserPage = () => {
  return (
    <>
      <UsersContainer />
      <Route
        path="/users/:id"
        render={({ match }) => <UserContainer id={match.params.id} />}
      />
    </>
  );
};
export default UserPage;
