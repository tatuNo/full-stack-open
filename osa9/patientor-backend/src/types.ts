export enum Gender  {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

interface BaseEntry {
  id: string;
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge : {
    date: string;
    criteria: string;
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare
  employerName: string;
  sickLeave? : {
    startDate: string;
    endDate: string;
  }
}

export type Entry = 
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry; 


export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}


type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewEntry = UnionOmit<Entry, 'id'>;
export type NewBaseEntry = Omit<BaseEntry, "id">;