import { ICar } from './car';

export interface IClient {
  _id: string;
  name: string;
  source: ISourse;
  myCar: ICar;
  wantCar: ICar;
}

interface ISourse {
  enthernet?: boolean;
  visit?: boolean;
  call?: boolean;
}

export interface ClientState {
  clients: IClient[];
  prepClients: any;
  clientsForUi: any;
  checkClients: any;
  time: number;
  countClients?: number;
  month: number,
  status?: 'idle' | 'loading' | 'failed';
}

interface FetchCarsAction {
  payload: IClient[];
}

export type CarAction = FetchCarsAction;
