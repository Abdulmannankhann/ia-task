export type SpectrumData = {
  Velocity: number;
  Altitude: number;
  Temperature: number;
  StatusMessage: string;
  IsAscending: boolean;
  IsActionRequired: boolean;
  timestamp: string;
};

export type SpectrumDatas = {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
  time: string;
};

export type SpectrumStatusResponses = {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
};
