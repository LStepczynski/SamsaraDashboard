import { convertIsoToReadableDate } from "../helper";
import styled from "styled-components";

interface Props {
  object: FuelObject;
}

interface Dict {
  [key: string]: string;
}

interface FuelObject {
  id: string;
  name: string;
  externalIds: Dict;
  fuelPercent: {
    time: string;
    value: number;
  };
}

const FuelCore = styled.div`
  width: 350px;
  height: 250px;
  background-color: #08101c;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border-radius: 15px;
`;

export const FuelObject = (props: Props) => {
  const { id, name, fuelPercent } = props.object;
  return (
    <FuelCore>
      <h2>Fuel: {fuelPercent.value}%</h2>
      <p>Last Measured: {convertIsoToReadableDate(fuelPercent.time)}</p>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
    </FuelCore>
  );
};
