import { Outlet } from "react-router-dom";
import Appbar from "../../layouts/account/Appbar";
import ProfileContainer from "./ProfileContainer";

const Profile = () => {
  return (
    <>
      {/* <Appbar /> */}
      <ProfileContainer />
      <Outlet />
    </>
  );
};
export default Profile;
