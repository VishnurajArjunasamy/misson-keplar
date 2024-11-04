import { useState } from "react";
import { LOGIN } from "../../constants/app-constants";
import styles from "./login.module.scss";
import LoginForm from "../../components/login-form/login-form";

const Login = () => {
  const [err, setErr] = useState({
    email: undefined,
    password: undefined,
    validCred: undefined,
  });

  return (
    <div className={styles["login"]}>
      <section>
        <h1>{LOGIN.HEADING}</h1>
        <p>{LOGIN.MESSAGE}</p>
        <LoginForm err={err} setErr={setErr} />
      </section>
    </div>
  );
};

export default Login;
