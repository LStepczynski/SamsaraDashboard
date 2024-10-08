import React from "react";

import { HosObject } from "../components/hosObject";

interface HosObject {
  driver: {
    id: string;
    name: string;
  };
  currentDutyStatus: {
    hosStatusType: string;
  };
  violations: {
    shiftDrivingViolationDurationMs: number;
    cycleViolationDurationMs: number;
  };
  clocks: {
    break: {
      timeUntilBreakDurationMs: number;
    };
    drive: {
      driveRemainingDurationMs: number;
    };
    shift: {
      shiftRemainingDurationMs: number;
    };
    cycle: {
      cycleStartedAtTime: string;
      cycleRemainingDurationMs: number;
      cycleTomorrowDurationMs: number;
    };
  };
}

const dateOptions: any = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

export const Hos = () => {
  const [elements, setElements] = React.useState<null | any>(null);
  const [cooldown, setCooldown] = React.useState(5);
  const [lastFetch, setLastFetch] = React.useState(new Date());
  const [options, setOptions] = React.useState({
    rest: -1,
    drive: -1,
    shift: -1,
    cycle: -1,
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleIntervalChange = (event: any) => {
    setCooldown(Number(event.target.value));
  };

  const handleOptionsChange = (event: any) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [event.target.name]: Number(event.target.value) * 60 * 60 * 1000,
    }));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${backendUrl}/hos?rest=${options.rest}&drive=${options.drive}&shift=${options.shift}&cycle=${options.cycle}`
        );
        const data = await res.json();
        setElements(data);
        setLastFetch(new Date());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Initial fetch
    const int = setInterval(fetchData, cooldown * 60 * 1000);

    // Cleanup function to clear the interval
    return () => {
      clearInterval(int);
    };
  }, [cooldown, options]);

  return (
    <div
      style={{
        margin: "120px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <p>Fetch objects below:</p>
        <p>Break:</p>
        <select name="rest" onChange={handleOptionsChange}>
          <option value="-1">Off</option>
          <option value="1">1 hour</option>
          <option value="2">2 hours</option>
          <option value="3">3 hours</option>
          <option value="4">4 hours</option>
          <option value="5">5 hours</option>
        </select>
        <p>Drive:</p>
        <select name="drive" onChange={handleOptionsChange}>
          <option value="-1">Off</option>
          <option value="1">1 hour</option>
          <option value="2">2 hours</option>
          <option value="3">3 hours</option>
          <option value="4">4 hours</option>
          <option value="5">5 hours</option>
        </select>
        <p>Shift:</p>
        <select name="shift" onChange={handleOptionsChange}>
          <option value="-1">Off</option>
          <option value="1">1 hour</option>
          <option value="2">2 hours</option>
          <option value="3">3 hours</option>
          <option value="4">4 hours</option>
          <option value="5">5 hours</option>
        </select>
        <p>Cycle:</p>
        <select name="cycle" onChange={handleOptionsChange}>
          <option value="-1">Off</option>
          <option value="1">1 hour</option>
          <option value="3">3 hours</option>
          <option value="5">5 hours</option>
          <option value="7">7 hours</option>
          <option value="10">10 hours</option>
          <option value="20">20 hours</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <p>Fetch every:</p>
        <select onChange={handleIntervalChange}>
          <option value="5">5 minutes</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
        </select>
        <p>
          Last Fetched:{" "}
          {new Intl.DateTimeFormat("en-US", dateOptions).format(lastFetch)}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "100px",
        }}
      >
        {elements &&
          elements.map((element: HosObject) => {
            return <HosObject key={element.driver.id} object={element} />;
          })}
      </div>
    </div>
  );
};
