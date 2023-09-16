import { store } from '../../app/store';
import conversionSlice, { clearLimit, fetchEvents, setLimitEmployees } from './eventsSlice';

const events = [
	{
		name: 'Град',
		description:
			'Вид ливневых осадков в виде частиц льда преимущественно округлой формы (градин) - прошел по територии вашего диллерского центра',
		price: 15,
		rent: 0,
	},
	{
		name: 'Угон',
		description: 'С вашей стоянки ночью угнали машину. Стоит задуматься об охране',
		price: 100,
		rent: 0,
	},
];

describe('eventsSlice test', () => {

	test('start', () => {
		let state = store.getState().events;
		const events = state.events;
		expect(events.length).toBe(0);
	});

	test('setLimitEmployees', () => {
		store.dispatch(setLimitEmployees({ id: 123, name: 'Универсал', note: true }));
		let state = store.getState().events;
		const limitEmp = state.limitEmp.find(el => el.id === 123);
		expect(limitEmp.name).toBe('Универсал');
	});

	test('clearLimit', () => {
		store.dispatch(clearLimit());
		let state = store.getState().events;
		const limitEmp = state.limitEmp.find(el => el.id === 123);
		expect(limitEmp).toBeUndefined();
	});

	it('should set loading while action is pending', () => {
		const action = { type: fetchEvents.pending };
		let state = store.getState().events;
		const initialState = conversionSlice(
			{
				...state,
			},
			action
		);
		expect(initialState.status).toEqual('loading');
	});

	it('should set idle while action is fulfilled', () => {
		const action = {
			type: fetchEvents.fulfilled,
			payload: events,
		};
		const state = store.getState().events;
		const initialState = conversionSlice(
			{
				...state,
			},
			action
		);
		expect(initialState.status).toEqual('idle');
		expect(initialState.events.length).toEqual(2);
	});
});
