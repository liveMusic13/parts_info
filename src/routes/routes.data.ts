import Home from '../components/screens/home/Home';
import ProductPage from '../components/screens/product-page/ProductPage';

export const routes = [
	{
		path: '/',
		component: Home,
		isAuth: false,
		// isAuth: true,
	},
	{
		path: '/product/:id',
		component: ProductPage,
		isAuth: false,
	},
];
