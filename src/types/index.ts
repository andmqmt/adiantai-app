export enum AnimalStatus {
  Grazing = 0,
  Resting = 1,
  Moving = 2,
  Alert = 3,
}

export interface Animal {
  id: string;
  name: string;
  tag: string;
  breed: string;
  farmId: string;
  latitude: number;
  longitude: number;
  status: AnimalStatus;
  lastUpdated: string;
}

export interface Farm {
  id: string;
  name: string;
  owner: string;
  southWestLat: number;
  southWestLon: number;
  northEastLat: number;
  northEastLon: number;
  centerLat: number;
  centerLon: number;
}
