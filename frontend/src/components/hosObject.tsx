import { convertMsToHHMMSS, convertIsoToReadableDate } from "../helper";
import styled from "styled-components";

interface Props {
  object: HosObject;
}

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

const HosCore = styled.div`
  width: 350px;
  height: 380px;
  background-color: #08101c;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  border-radius: 15px;
`;

export const HosObject = (props: Props) => {
  const { driver, currentDutyStatus, clocks } = props.object;
  return (
    <HosCore>
      <p>Name: {driver.name}</p>
      <p>Status: {currentDutyStatus.hosStatusType}</p>
      <p>
        Until break: {convertMsToHHMMSS(clocks.break.timeUntilBreakDurationMs)}
      </p>
      <p>
        Drive remaining:{" "}
        {convertMsToHHMMSS(clocks.drive.driveRemainingDurationMs)}
      </p>
      <p>
        Shift remaining:{" "}
        {convertMsToHHMMSS(clocks.shift.shiftRemainingDurationMs)}
      </p>
      <p>
        Cycle remaining:{" "}
        {convertMsToHHMMSS(clocks.cycle.cycleRemainingDurationMs)}
      </p>
      <p>
        Cycle started:{" "}
        {convertIsoToReadableDate(clocks.cycle.cycleStartedAtTime)}
      </p>
    </HosCore>
  );
};
