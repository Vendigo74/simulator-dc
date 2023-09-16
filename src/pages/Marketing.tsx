import React from 'react';
import { Layout, Menu, Button } from 'antd';
import styles from '../styles/Marketing.module.scss';
import { UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '../app/hooks';
import MarketingKpi from '../components/marketing/marketing-kpi';

import CollapseMarketing from '../components/marketing/collapse';
import Info from '../components/marketing/info';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Marketing = () => {
	const { marketing } = useAppSelector(state => state.marketing);
	const { kpi } = useAppSelector(state => state.marketing);

	const [state, setState] = React.useState(null);

	const [visible, setVisible] = React.useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const marketingLeaderAction = marketing
		.map(element => {
			return element.leaderAction;
		})
		.filter((element, id) => {
			return marketing.map(element => element.leaderAction).indexOf(element) === id;
		})
	// .filter(element => element !== "Эффективность");

	return (
		<div className={`${styles['marketing']} marketing`}>
			<Button type='primary' onClick={showDrawer}>
				Текущий KPI;
			</Button>
			<Info />
			<Layout
				className='site-layout-background'
				style={{ padding: '24px 0', background: '#ffffff' }}
			>
				<Sider className='site-layout-background' width={400}>
					<Menu
						mode='inline'
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
						style={{ height: '100%' }}
					>
						{marketingLeaderAction &&
							marketingLeaderAction.map(item1 => {
								return (
									<SubMenu key={item1} icon={<UserOutlined />} title={item1}>
										{marketing.map(item => {
											if (item.leaderAction === item1 && item.id !== 8 && item.id !== 9) {
												return (
													<Menu.Item
														style={{ lineHeight: '20px', whiteSpace: 'normal' }}
														key={`${item.reason}_${item._id}`}
														onClick={() => setState(item)}
													>
														{item.reason}
													</Menu.Item>
												);
											}
										})}
									</SubMenu>
								);
							})}
					</Menu>
				</Sider>

				<Content style={{ padding: '0 24px', minHeight: 280 }}>
					<CollapseMarketing stateItem={state} />
				</Content>
			</Layout>
			<MarketingKpi showModal={visible} kpi={kpi} onClose={onClose} />
		</div>
	);
};

export default React.memo(Marketing);
