import React, {FC} from 'react';
import {InputNumber, Modal, Tag} from "antd";
import styles from "../../styles/Marketing.module.scss";

interface BuyMarketingProps {
	showModal: boolean;
	marketingPack: any;
	onClose?: () => void;
}

const BuyMarketing: FC<BuyMarketingProps> = ({showModal, marketingPack, onClose}) => {
	return (
		<Modal
			title={`Пакет «${marketingPack?.name}»`}
			visible={showModal}
			onCancel={onClose}
			className={`marketing__modal`}
		>

			<div className={styles["marketing__info"]}>
				<div className={styles["marketing__item"]}>
					<div className={styles["marketing__description"]}>
						<span>Количество увеличиваемого трафика</span>
					</div>
					<Tag className={styles["marketing__tag"]} color="blue">{marketingPack?.traffic}</Tag>
				</div>
				{marketingPack?.actions?.map((action, idx) =>
					<div key={idx} className={styles["kpi"]}>
						<div className={styles["kpi__title"]}>
							<span>{action.name}</span>
						</div>
						<div className={styles["kpi__item"]}>
							<span className={styles["kpi__label"]}>Цена</span>
							<InputNumber
								readOnly
								size={'middle'}
								style={{minWidth: 120}}
								defaultValue={action.price}
								formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
								parser={value => value.replace(/\$\s?|(\s*)/g, '')}
							/>
						</div>
						<div className={styles["kpi__item"]}>
							<span className={styles["kpi__label"]}>Количество</span>
							<InputNumber size={'middle'} min={0} max={10} defaultValue={action.quantity} />
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default BuyMarketing;
