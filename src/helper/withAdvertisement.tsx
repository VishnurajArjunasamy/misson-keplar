import { useEffect, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";

export function withAdvertisement(WrappedComponent) {
  return function EnhancedComp(props: JSX.IntrinsicAttributes) {
    const [seconds, setSeconds] = useState(null);
    const intervalRef = useRef();

    function startTimer(duration: null) {
      setSeconds((prev) => {
        if (prev != null && prev > 1) {
          return prev;
        }
        return duration;
      });

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev != null && prev < 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    function stopTimer() {
      console.log("Stopping timer");

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = null;
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
        seconds={seconds}
        intervalRef={intervalRef}
      />
    );
  };
}
