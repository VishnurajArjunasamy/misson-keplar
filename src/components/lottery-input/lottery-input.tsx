import { useState } from "react";
import { LOTTERY } from "../../constants/app-constants";
import Button from "../button/button";
import Input from "../input/input";
import styles from "./lottery-input.module.scss";

const LotteryInput = () => {
  const [triggerError, setTriggerError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const mobNum = formData.get("mobNumber");

    if (!LOTTERY.MOBILE_REGEX.test(mobNum)) {
      setErrors("Enter a valid Mobile Number");
      return;
    }
    setErrors(null);
    if (Number(mobNum) % 2 === 0) {
      setIsClicked(true);
    } else {
      setTriggerError(true);
    }
  };

  if (triggerError) {
    throw new Error(LOTTERY.LOST_MDG);
  }

  const fromElement = (
    <form onSubmit={handleSubmit} className={styles["lottery-form"]}>
      <div className={styles["inp-error-box"]}>
        <Input
          placeholder="Enter Mobile Number"
          type="number"
          name="mobNumber"
        />
        {errors && <p className={styles["error"]}>{errors}</p>}
      </div>
      <Button size="sm">{LOTTERY.BTN_TXT}</Button>
    </form>
  );
  return isClicked ? (
    <span className={styles["lottery-msg"]}>{LOTTERY.WIN_MSG}</span>
  ) : (
    <>
      <p>{LOTTERY.MESSAGE}</p>
      {fromElement}
    </>
  );
};

export default LotteryInput;
