import { FC, memo } from "react";
import styles from "./login-form.module.scss";
import { loginService } from "../../services/loginService";
import { validate } from "../../utils/formUtils";
import Label from "../../components/label/label";
import Input from "../../components/input/input";
import { LOGIN, MENUS } from "../../constants/app-constants";
import Button from "../../components/button/button";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { AuthIF } from "../../modals/authModal";

interface LoginFormProps {
  err: {
    message?: string;
    email?: string;
    password?: string;
    validCred?: string;
  };
  setErr: React.Dispatch<React.SetStateAction<object>>;
}
const HOME_ROUTE = MENUS.HOME.ROUTE;
const LoginForm: FC<LoginFormProps> = ({ err, setErr }) => {
  const auth = useAuth() as AuthIF;
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formCreds = Object.fromEntries(formData.entries());
    const validationErrors = validate(
      formCreds as { email: string; password: string }
    );

    if (Object.keys(validationErrors).length > 0) {
      setErr(validationErrors);
      return;
    }

    /**
     * Clearing the prvious error
     */
    setErr({});

    try {
      const response = loginService(
        formCreds as { email: string; password: string }
      );
      if (response.status == "success") {
        if (response.user) auth.saveUser(response.user);
        navigate(HOME_ROUTE != "" ? HOME_ROUTE : "/");
        return;
      }
      throw new Error("Invalid UserName or Password");
    } catch (err: unknown) {
      if (err instanceof Error) setErr({ validCred: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles["login-form"]}>
      <div className={styles["inpBox"]}>
        <Label htmlFor="email" name={LOGIN.FORM.EMAIL.NAME} />
        <Input id="email" type="email" name="email" variant="styled-inp" />
        {err.email && <span className={styles["err-msg"]}>{err.email}</span>}
      </div>

      <div className={styles["inpBox"]}>
        <Label htmlFor="password" name={LOGIN.FORM.PASSWORD.NAME} />
        <Input
          id="password"
          type="password"
          name="password"
          variant="styled-inp"
        />
        {err.password && (
          <span className={styles["err-msg"]}>{err.password}</span>
        )}
      </div>

      {err.validCred && (
        <span className={styles["err-msg"]}>{err.validCred}</span>
      )}
      <Button size="lg">{LOGIN.HEADING.toUpperCase()}</Button>
    </form>
  );
};

export default memo(LoginForm);
