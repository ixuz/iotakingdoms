import { IService } from "./IService";
import { Status } from "./Status";

export class Service implements IService {
  _status: Status;

  constructor() {
    this._status = Status.STOPPED;
  }

  async start(): Promise<void> {
    this._status = Status.STARTED;
  }

  async stop(): Promise<void> {
    this._status = Status.STOPPED;
  }

  async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  async status(): Promise<Status> {
    return this._status;
  }
}
