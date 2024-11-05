import { useEffect, useRef, useState } from "react";

export function withAdvertisement(WrappedComponent) {
  return function EnhancedComp(props) {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef();

    function startTimer(duration, callBack) {
      //   setSeconds((prev) => {
      //     if (prev == null) return duration;
      //     if (prev > 1) return prev;
      //     else return duration;
      //   });
      setSeconds(duration);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev < 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            callBack && callBack();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    function stopTimer() {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setSeconds(0);
    }

    useEffect(() => {
      return () => {
        clearInterval(intervalRef.current);
      };
    }, []);

    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secondRem = (seconds % 60).toString().padStart(2, "0");
    const time = `${minutes} : ${secondRem}`;

    return (
      <WrappedComponent
        {...props}
        timer={time}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
    );
  };
}
