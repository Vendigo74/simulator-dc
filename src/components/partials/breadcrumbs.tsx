import React, { FC } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link, matchPath } from 'react-router-dom';
import { adminRoutes, trainerRoutes } from '../../router/routes';

interface BreadcrumbsProps {
	role: () => string;
}

interface IBreadcrumb {
	text: string;
	href: string;
}

const playerBreadcrumbs: IBreadcrumb[] = [
	{ text: 'Мой ДЦ (Dashboard)', href: '/' },
	{ text: 'Авто', href: '/cars' },
	{ text: 'Площадки', href: '/stands' },
	{ text: 'Сотрудники', href: '/employees' },
	{ text: 'Маркетинг', href: '/marketing' },
	{ text: 'Маркетинг', href: '/registration' },
	{ text: 'Управление продавцами', href: '/employees/sellers' },
	{ text: 'Управление универсалами', href: '/employees/stationSellers' },
	{ text: 'Управление оценщикамии', href: '/employees/appraisers' },
];

const Breadcrumbs: FC<BreadcrumbsProps> = ({ role }) => {
	const router = useLocation();

	let breadcrumbs: IBreadcrumb[] = [];

	if (role() === 'TRAINER') {
		breadcrumbs = trainerRoutes.map(({ path, name }) => ({
			text: name,
			href: path,
		}));
	} else if (role() === 'ADMIN') {
		breadcrumbs = adminRoutes.map(({ path, name }) => ({
			text: name,
			href: path,
		}));
	} else {
		breadcrumbs = playerBreadcrumbs;
	}

	const PathName = () => {
		const path = breadcrumbs.find(item => item.href === router.pathname);
		const pathName = path ? path.text : getNameFromRouteProps();
		return <span>{pathName}</span>;
	};

	const getNameFromRouteProps = () => {
		const currentRoute = [...adminRoutes, ...trainerRoutes].find(route =>
			matchPath(router.pathname, route)
		);
		return currentRoute?.name || 'Неизвестно';
	};

	return (
		<Breadcrumb style={{ margin: '16px 0' }}>
			<Breadcrumb.Item>
				<Link to='/'>Главная</Link>
			</Breadcrumb.Item>
			<Breadcrumb.Item>{PathName()}</Breadcrumb.Item>
		</Breadcrumb>
	);
};

export default React.memo(Breadcrumbs);
