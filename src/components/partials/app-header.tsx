import React, { FC } from 'react';
import { Menu, Layout, Button } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { adminRoutes, trainerRoutes } from '../../router/routes';

const { Header } = Layout;

interface INavItem {
	text: string;
	href: string;
}

const navItems: INavItem[] = [
	{ text: 'Dashboard', href: '/' },
	{ text: 'Авто и площадки', href: '/cars' },
	{ text: 'Сотрудники', href: '/employees' },
	{ text: 'Маркетинг', href: '/marketing' },
];

const navItemsTrainer: INavItem[] = [];
trainerRoutes.forEach(({ path, name, excludedNav }) => {
	if (!excludedNav) {
		navItemsTrainer.push({ text: name, href: path });
	}
});

const navItemsAdmin: INavItem[] = [];
adminRoutes.forEach(({ path, name, excludedNav }) => {
	if (!excludedNav) {
		navItemsAdmin.push({ text: name, href: path });
	}
});

interface AppHeaderProps {
	isAuth: () => boolean;
	role: () => string;
}

const AppHeader: FC<AppHeaderProps> = ({ isAuth, role }) => {
	const history = useHistory();
	const router = useLocation();

	return (
		<Header>
			<div className='logo'>
				<Button type='link'onClick={() => history.push('/')} className='logo__btn'>
					Simulator
				</Button>
			</div>
			{!isAuth() && (
				<Menu className='nav' theme='dark' mode='horizontal' selectedKeys={[router.pathname]}>
					<Menu.Item key='/'>
						<Link to='/'>Вход в игру</Link>
					</Menu.Item>
				</Menu>
			)}

			{isAuth() && role() === 'PLAYER' && (
				<Menu className='nav' theme='dark' mode='horizontal' selectedKeys={[router.pathname]}>
					{navItems.map(({ text, href }) => (
						<Menu.Item key={href}>
							<Link to={href}>{text}</Link>
						</Menu.Item>
					))}
				</Menu>
			)}

			{isAuth() && role() === 'TRAINER' && (
				<Menu className='nav' theme='dark' mode='horizontal' selectedKeys={[router.pathname]}>
					{navItemsTrainer.map(({ text, href }) => (
						<Menu.Item key={href}>
							<Link to={href}>{text}</Link>
						</Menu.Item>
					))}
				</Menu>
			)}

			{isAuth() && role() === 'ADMIN' && (
				<Menu className='nav' theme='dark' mode='horizontal' selectedKeys={[router.pathname]}>
					{navItemsAdmin.map(({ text, href }) => (
						<Menu.Item key={href}>
							<Link to={href}>{text}</Link>
						</Menu.Item>
					))}
				</Menu>
			)}
		</Header>
	);
};

export default React.memo(AppHeader);
