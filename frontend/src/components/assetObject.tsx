import styled from "styled-components";

interface Props {
  object: AssetLocationObject;
}

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

const AssetCore = styled.div`
  width: 350px;
  height: 250px;
  background-color: #08101c;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border-radius: 15px;
`;

export const AssetObject = (props: Props) => {
  const { id, name, cable, location } = props.object;
  return (
    <AssetCore>
      <h2>Name: {name}</h2>
      <p>ID: {id}</p>
      <p>Type: {cable.assetType}</p>
      <p>Speed m/h: {location[0].speedMilesPerHour}</p>
    </AssetCore>
  );
};
