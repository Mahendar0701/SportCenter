import { Outlet } from "react-router-dom";
import PasswordForm from "./PasswordForm";

const ChangePassword = () => {
  return (
    <>
      <PasswordForm />
      <Outlet />
    </>
  );
};
export default ChangePassword;
