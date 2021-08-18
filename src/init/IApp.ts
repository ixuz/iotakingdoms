import { App, AppStatus } from "./App";

export interface IApp {
  start(): Promise<void>;
  stop(): Promise<void>;
  restart(): Promise<void>;
  status(): Promise<AppStatus>;
}
