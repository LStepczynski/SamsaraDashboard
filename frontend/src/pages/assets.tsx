import React from "react";

import { AssetObject } from "../components/assetObject";

interface AssetLocationObject {
  id: number;
  name: string;
  engineHours: number;
  cable: {
    assetType: string;
  };
  location: LocationObject[];
}

interface LocationObject {
  location: string;
  latitude: number;
  longtitude: number;
  speedMilesPerHour: number;
  timeMs: number;
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

export const Assets = () => {
  const [elements, setElements] = React.useState<null | any>(null);
  const [cooldown, setCooldown] = React.useState(5);
  const [lastFetch, setLastFetch] = React.useState(new Date());

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleIntervalChange = (event: any) => {
    setCooldown(Number(event.target.value));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendUrl}/asset-location`);
        const data = await res.json();
        console.log(data);
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
  }, [cooldown]);

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
        <p>
          Last Fetched:{" "}
          {new Intl.DateTimeFormat("en-US", dateOptions).format(lastFetch)}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "100px",
        }}
      >
        {elements &&
          Object.keys(elements).map((innerElement: any) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={innerElement}
              >
                <h1>{innerElement}</h1>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "50px",
                  }}
                >
                  {elements[innerElement].map(
                    (element: AssetLocationObject) => (
                      <AssetObject key={element.id} object={element} />
                    )
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
