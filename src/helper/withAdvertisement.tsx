import { useEffect, useState } from "react";

export function withAdvertisement(WrappedComponent, initialValue) {
  return function EnhancedComp(props) {
    const [seconds, setSeconds] = useState(initialValue);
    useEffect(() => {
      const counterInterval = setInterval(() => {
        setSeconds((prev) => {
          if (prev - 1 < 0) {
            clearInterval(counterInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(counterInterval);
    }, []);
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secondRem = (seconds % 60).toString().padStart(2, "0");
    const time = `${minutes}:${secondRem}`;

    return <WrappedComponent {...props} timer={time} />;
  };
}
