import { ServiceStatus } from "./Service";

export interface IService {
  start(): Promise<void>;
  stop(): Promise<void>;
  restart(): Promise<void>;
  status(): Promise<ServiceStatus>;
}
