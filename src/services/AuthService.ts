import { AxiosResponse } from 'axios';
import $api, { API_URL } from '../http';
import { AuthResponse } from '../types/response/AuthResponse';
import { LoginPlayer, RegPlayer } from '../types/player';
import { LoginAdmin, RegAdmin } from '../types/admin';

export default class AuthService {
	static async loginPlayer(payload: LoginPlayer): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/login', payload);
	}

	static async loginAdminOrTrainer(payload: LoginAdmin): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/login', payload);
	}

	static async registration(
		name: string,
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/registration', { name, email, password });
	}

	static async registrationPlayer(player: RegPlayer): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/registration/player', player);
	}

	static async registrationTrainer(trainer: RegAdmin): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/registration/trainer', trainer);
	}

	static async logout(): Promise<void> {
		return $api.post('/logout');
	}

	static async checkAuth(): Promise<AxiosResponse> {
		return $api.get<AuthResponse>(`${API_URL}/refresh`, {
			withCredentials: true,
		});
	}
}
