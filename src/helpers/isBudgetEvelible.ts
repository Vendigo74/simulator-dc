export const isBudgetEvelible = (budegetPlayer, budget, budgetBorder) => {
	if (budegetPlayer.item?.id === 58) {
		return budget + budegetPlayer.price > budgetBorder;
	}
	return budget - budegetPlayer.price > budgetBorder;
};
