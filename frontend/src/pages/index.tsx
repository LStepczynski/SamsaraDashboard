import React from "react";
import { FuelObject } from "../components/fuelObject";

interface Dict {
  [key: string]: string;
}

interface FuelObjectType {
  id: string;
  name: string;
  externalIds: Dict;
  fuelPercent: {
    time: string;
    value: number;
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

export const Index = () => {
  const [elements, setElements] = React.useState<null | any>(null);
  const [cooldown, setCooldown] = React.useState(5);
  const [lastFetch, setLastFetch] = React.useState(new Date());
  const [level, setLevel] = React.useState(10);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleIntervalChange = (event: any) => {
    setCooldown(Number(event.target.value));
  };

  const handleLevelChange = (event: any) => {
    setLevel(Number(event.target.value));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendUrl}/fuel/${level}`);
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
  }, [cooldown, level]);

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
        <p>Fetch every:</p>
        <select onChange={handleIntervalChange}>
          <option value="5">5 minutes</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
        </select>
        <p>Fetch Below:</p>
        <select onChange={handleLevelChange}>
          <option value="10">10%</option>
          <option value="30">30%</option>
          <option value="50">50%</option>
          <option value="70">70%</option>
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
          gap: "50px",
        }}
      >
        {elements &&
          elements.map((element: FuelObjectType) => (
            <FuelObject key={element.id} object={element} />
          ))}
      </div>
    </div>
  );
};
