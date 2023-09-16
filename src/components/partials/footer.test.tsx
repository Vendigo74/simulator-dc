import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import FooterComponent from './footer';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import '@testing-library/jest-dom/extend-expect';

const footer = (): RenderResult =>
	render(
		<Provider store={store}>
			<FooterComponent />
		</Provider>
	);

test('renders learn react link', () => {
	/* footer();
	expect(screen.getByText('Участников:')).toHaveTextContent('Участников:'); */
	const { getByText } = footer();

	const linkElement = getByText(/Участников:/i);
	expect(linkElement).toBeInTheDocument();
});
