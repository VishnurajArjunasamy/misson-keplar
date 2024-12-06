import { useEffect, useRef, useState } from "react";
// import { JSX } from "react/jsx-runtime";

export function withAdvertisement<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const EnhancedComp: React.FC<P> = (props) => {
    const [seconds, setSeconds] = useState<null | number>(null);
    const intervalRef = useRef<number | NodeJS.Timeout | null>(null);

    function startTimer(duration: null) {
      setSeconds(duration);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      intervalRef.current = setInterval(() => {
        setSeconds((prev: number | null) => {
          if (prev != null && prev < 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return 0;
          }
          return prev && prev - 1;
        });
      }, 1000);
    }

    function stopTimer() {
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
        setSeconds={setSeconds}
      />
    );
  };
  return EnhancedComp;
}
