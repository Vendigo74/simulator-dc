import IRoute from '../types/router';
import TrainerPage from '../pages/trainer/TrainerPage';
import AdminPage from '../pages/admin/AdminPage';
import AdminTrainers from '../pages/admin/AdminTrainers';
import TrainerPlayers from '../pages/trainer/TrainerPlayers';
import AdminPlayers from '../pages/admin/AdminPlayers';
import StatisticPlayer from '../pages/StatisticPlayer';
import TrainerEditKpi from '../pages/trainer/TrainerEditKpi';
import TrainerEditFirmProg from '../pages/trainer/TrainerEditFirmProg';
import TrainerEditMarketing from '../pages/trainer/TrainerEditMarketing';

export const trainerRoutes: IRoute[] = [
	{
		path: '/',
		name: 'Dashboard',
		component: TrainerPage,
		exact: true,
	},
	{
		path: '/players',
		name: 'Игроки',
		component: TrainerPlayers,
		exact: true,
	},
	{
		path: '/player/stats/:id',
		name: 'Статистика игрока',
		component: StatisticPlayer,
		exact: true,
		excludedNav: true,
	},
	{
		path: '/editkpi',
		name: 'KPI',
		component: TrainerEditKpi,
		exact: true,
	},
	{
		path: '/editfirmprogandcars',
		name: 'Машины и фирменные программы',
		component: TrainerEditFirmProg,
		exact: true,
	},
	{
		path: '/editmarketing',
		name: 'Маркетинг',
		component: TrainerEditMarketing,
		exact: true,
	},
];

export const adminRoutes: IRoute[] = [
	{
		path: '/',
		name: 'Dashboard',
		component: AdminPage,
		exact: true,
	},
	{
		path: '/trainers',
		name: 'Тренеры',
		component: AdminTrainers,
		exact: true,
	},
	{
		path: '/players',
		name: 'Игроки',
		component: AdminPlayers,
		exact: true,
	},
	{
		path: '/player/stats/:id',
		name: 'Статистика игрока',
		component: StatisticPlayer,
		exact: true,
		excludedNav: true,
	},
];
