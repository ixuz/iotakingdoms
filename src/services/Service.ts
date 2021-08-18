import { IService } from "./IService";

export enum ServiceStatus {
  STOPPED,
  STARTED,
}

export class Service implements IService {
  _status: ServiceStatus;

  constructor() {
    this._status = ServiceStatus.STOPPED;
  }

  async start(): Promise<void> {
    this._status = ServiceStatus.STARTED;
  }

  async stop(): Promise<void> {
    this._status = ServiceStatus.STOPPED;
  }

  async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  async status(): Promise<ServiceStatus> {
    return this._status;
  }
}
