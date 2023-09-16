import React from 'react';
import {Card, Col, Divider, Popover, Row} from 'antd';
import styles from "../../styles/GameDescription.module.scss"
import cardChooseStyles from "../../styles/CardsChoose.module.scss"

const GameDescription = () => {
	const emptyStack = (
		<div>
			<p className="popover">Колода из которой берутся карточки для игры</p>
		</div>
	)
	return (
		<div className={styles["game-description"]}>
			<div className={styles["site-card-wrapper"]}>
				<Row gutter={16}>
					<Col span={18}>
						<Card className={styles["description-page-content"]}  bordered={false} >
							<p className={styles["description-header"]}>Описание игры</p>
							<p className={styles["description-text"]}>Synergistically leverage existing premium best practices for viral expertise. Dynamically myocardinate client-based growth strategies for real-time action items. Credibly disseminate open-source leadership via exceptional vortals. Synergistically leverage existing premium best practices for viral expertise. Dynamically myocardinate client-based growth strategies for real-time action items. Credibly disseminate open-source leadership via exceptional vortals.</p>
							<p className={styles["description-text"]}>Synergistically leverage existing premium best practices for viral expertise. Dynamically myocardinate client-based growth strategies for real-time action items. Credibly disseminate open-source leadership via exceptional vortals.</p>
						</Card>
					</Col>
					<Col  span={6}>
						<Card bordered={false} className={styles["empty-stack-page-content"]}>
							<Popover content={emptyStack} trigger="click">
								<div className={styles["empty-stack"]}>
									<div className={`${styles["empty-stack-card"]} ${cardChooseStyles["image-stack-first"]}`}>
										<p className={styles["empty-stack-text"]}>Used Cards</p>
										<Divider />
										<p className={styles["empty-stack-text"]}>simulator</p>
									</div>
									<div className={`${styles["empty-stack-card"]} ${cardChooseStyles["image-stack-second"]}`}>
										<p className={styles["empty-stack-text"]}>Used Cards</p>
										<Divider />
										<p className={styles["empty-stack-text"]}>simulator</p>
									</div>
									<div className={`${styles["empty-stack-card"]} ${cardChooseStyles["image-stack-third"]}`}>
										<p className={styles["empty-stack-text"]}>Used Cards</p>
										<Divider />
										<p className={styles["empty-stack-text"]}>simulator</p>
									</div>
								</div>
							</Popover>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default React.memo(GameDescription);
