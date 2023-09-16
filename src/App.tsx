import React from 'react'
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import AppHeader from './components/partials/app-header';
import Breadcrumbs from './components/partials/breadcrumbs';
import Footer from './components/partials/footer';
import Dashboard from './pages/Dashboard';
import Cars from './pages/Cars';
import Employees from './pages/Employees';
import Marketing from './pages/Marketing';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { checkAuth } from './feature/player/playerSlice';
import Login from './pages/Login';
import {
	fetchCars,
	fetchEmployeeStands,
	fetchPosts,
	fetchStands,
	fetchFirmProg,
} from './feature/stands/carsAndStandsSlice';
import { fetchEffect, fetchKpi, fetchMarketing } from './feature/marketing/marketingSlice';
// import EmployeeEdit from './pages/EmployeeEdit';
import TrainerPage from './pages/trainer/TrainerPage';
import { adminRoutes, trainerRoutes } from './router/routes';
import RegistrationPlayer from './pages/RegistrationPlayer';
import { fetchEvents } from './feature/events/eventsSlice';
import {
	clearPlayerEmployees,
	fetchEmployees,
	fetchEmployeeStudyPack,
} from './feature/employees/employeesSlice';
import LogService from './services/LogService';

const { Content } = Layout;

function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button type='button' onClick={resetErrorBoundary}>
				Try again
			</button>
		</div>
	);
}

function App() {
	const dispatch = useAppDispatch();

	const { isAuth, status, role } = useAppSelector(state => state.player.auth);
	const trainerId = useAppSelector(state => state.player.player.trainerId);
	const id = useAppSelector(state => state.player.player.id);

	React.useEffect(() => {
		if (role === 'PLAYER') {
			dispatch(fetchEmployeeStands());
			dispatch(fetchStands());
			dispatch(fetchMarketing());
			dispatch(fetchEffect());
			dispatch(fetchEmployeeStudyPack(9));
			dispatch(fetchEmployees(8));
			dispatch(fetchPosts(7));
			dispatch(fetchEvents());
			if (trainerId) {
				LogService.clear();
				dispatch(fetchCars(trainerId));
				dispatch(fetchFirmProg(trainerId));
				dispatch(clearPlayerEmployees(id));
				dispatch(fetchKpi({ trainerId, id }));
				// dispatch(fetchStats(trainerId));
			}
		}
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
		}
	}, [isAuth]);

	const onIsAuth = React.useCallback(() => isAuth, [isAuth]);
	const onRole = React.useCallback(() => role, [role]);

	if (!isAuth) {
		return (
			<BrowserRouter>
				<div className='App'>
					<AppHeader isAuth={onIsAuth} role={onRole} />
					<Content style={{ padding: '0 50px' }}>
						<div className='site-layout-content'>
							<Route path='/' exact>
								{(status === 'loading' && (
									<div className='spin'>
										<Spin size='large' />
									</div>
								)) || (
									<ErrorBoundary FallbackComponent={ErrorFallback}>
										<Login />
									</ErrorBoundary>
								)}
							</Route>
							<Route path='/registration/:trainerId' exact>
								<ErrorBoundary FallbackComponent={ErrorFallback}>
									<RegistrationPlayer />
								</ErrorBoundary>
							</Route>
						</div>
					</Content>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}

	if ((isAuth && role === 'TRAINER') || (isAuth && role === 'ADMIN')) {
		return (
			<BrowserRouter>
				<div className='App'>
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<AppHeader isAuth={onIsAuth} role={onRole} />
					</ErrorBoundary>
					<Content style={{ padding: '0 50px' }}>
						<ErrorBoundary FallbackComponent={ErrorFallback}>
							<Breadcrumbs role={onRole} />
						</ErrorBoundary>
						<div className='site-layout-content'>
							{role === 'TRAINER' &&
								trainerRoutes.map(route => (
									<Route
										key={route.path}
										path={route.path}
										exact={route.exact}
										render={(props: RouteComponentProps<any>) => (
											<ErrorBoundary FallbackComponent={ErrorFallback}>
												<route.component name={route.name} {...props} {...route.props} />
											</ErrorBoundary>
										)}
									/>
								))}
							{role === 'ADMIN' &&
								adminRoutes.map(route => (
									<Route
										key={route.path}
										path={route.path}
										exact={route.exact}
										render={(props: RouteComponentProps<any>) => (
											<ErrorBoundary FallbackComponent={ErrorFallback}>
												<route.component name={route.name} {...props} {...route.props} />
											</ErrorBoundary>
										)}
									/>
								))}
							<Route path='/registration/:trainerId' exact>
								<Redirect push to='/' exact />
							</Route>
							<Route path='/registration' exact>
								<Redirect push to='/' exact />
							</Route>
						</div>
					</Content>
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<Footer />
					</ErrorBoundary>
				</div>
			</BrowserRouter>
		);
	}

	return (
		<BrowserRouter>
			<div className='App'>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<AppHeader isAuth={onIsAuth} role={onRole} />
				</ErrorBoundary>
				<Content style={{ padding: '0 50px' }}>
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<Breadcrumbs role={onRole} />
					</ErrorBoundary>
					<div className='site-layout-content'>
						<Route path='/' exact>
							<ErrorBoundary FallbackComponent={ErrorFallback}>
								<Dashboard />
							</ErrorBoundary>
						</Route>
						<Route path='/cars' exact>
							<ErrorBoundary FallbackComponent={ErrorFallback}>
								<Cars />
							</ErrorBoundary>
						</Route>
						<Route path='/employees' exact>
							<ErrorBoundary FallbackComponent={ErrorFallback}>
								<Employees />
							</ErrorBoundary>
						</Route>
						<Route path='/marketing' exact>
							<ErrorBoundary FallbackComponent={ErrorFallback}>
								<Marketing />
							</ErrorBoundary>
						</Route>
						<Route path='/trainer/dashboard' exact>
							<ErrorBoundary FallbackComponent={ErrorFallback}>
								<TrainerPage />
							</ErrorBoundary>
						</Route>
						<Route path='/registration/:trainerId' exact>
							{isAuth ? (
								<Redirect push to='/' exact />
							) : (
								<ErrorBoundary FallbackComponent={ErrorFallback}>
									<RegistrationPlayer />
								</ErrorBoundary>
							)}
						</Route>
					</div>
				</Content>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<Footer />
				</ErrorBoundary>
			</div>
		</BrowserRouter>
	);
}

export default React.memo(App);
