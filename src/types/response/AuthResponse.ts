import { IPlayer } from "../player";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IPlayer;
}
