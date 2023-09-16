import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import 'swiper/swiper.scss';
import 'swiper/components/effect-flip/effect-flip.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
