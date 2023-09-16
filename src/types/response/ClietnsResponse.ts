import { IClient } from "../client";


export interface ClientsResponse {
    accessToken: string;
    refreshToken: string;
    clients: IClient[];
}
