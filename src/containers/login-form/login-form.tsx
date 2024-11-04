import { FC, memo } from "react";
import styles from "./login-form.module.scss";
import { loginService } from "../../services/loginService";
import { validate } from "../../utils/formUtils";
import Label from "../../components/label/label";
import Input from "../../components/input/input";
import { LOGIN } from "../../constants/app-constants";
import Button from "../../components/button/button";

interface LoginFormProps {
  err: object;
  setErr: React.Dispatch<React.SetStateAction<object>>;
}

const LoginForm: FC<LoginFormProps> = ({ err, setErr }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formCreds = Object.fromEntries(formData.entries());
    const validationErrors = validate(formCreds);

    if (Object.keys(validationErrors).length === 0) {
      setErr({});
      const isValidUser = loginService(formCreds);
      if (isValidUser === true) {
        console.log("Logged in");
      } else {
        console.log("Invalid User");
        setErr((prev) => {
          return { ...prev, validCred: isValidUser };
        });
      }
    } else {
      setErr(validationErrors);
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
