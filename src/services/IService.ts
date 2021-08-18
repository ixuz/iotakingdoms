import { Status } from "./Status";

export interface IService {
  start(): Promise<void>;
  stop(): Promise<void>;
  restart(): Promise<void>;
  status(): Promise<Status>;
}
