import { Route, Routes } from 'react-router-dom';

import { Cart, Categories, Checkout, CompletePayment, Dashboard, Delivery, EditCategories, EditProducts, Home, Login, Menu, NewCategory, NewDelivery, NewProduct, OrderDetails, Orders, Products, Register, Reports, UserOrders } from '../containers';
import { AdminLayout } from '../layouts/AdminLayout';
import { UserLayout } from '../layouts/UserLayout';



export function Router() {
	return (
		<Routes>
			<Route path="/" element={<UserLayout />}>
				<Route index element={<Home />} />
				<Route path='cardapio' element={<Menu />} />
				<Route path='carrinho' element={<Cart />} />
				<Route path='checkout' element={<Checkout />} />
				<Route path='complete' element={<CompletePayment />} />
				<Route path='orders' element={<UserOrders />} />
				<Route path='order/:id' element={<OrderDetails />} />

			</Route>

			<Route path='/admin' element={<AdminLayout />}>
				<Route path='/admin/pedidos' element={<Orders />} />
				<Route path='/admin/novo-produto' element={<NewProduct />} />
				<Route path='/admin/editar-produto' element={<EditProducts />} />
				<Route path='/admin/produtos' element={<Products />} />
				<Route path='/admin/categorias' element={<Categories />} />
				<Route path='/admin/nova-categoria' element={<NewCategory />} />
				<Route path='/admin/editar-categoria' element={<EditCategories />} />
				<Route path='/admin/cep-entrega' element={<Delivery />} />
				<Route path='/admin/nova-rota-entrega' element={<NewDelivery />} />
				<Route path='/admin/dashboard' element={<Dashboard />} />
				<Route path='/admin/relatorio' element={<Reports />} />
			</Route>


			<Route path='/login' element={<Login />} />
			<Route path='/users' element={<Register />} />
		</Routes >
	)
}
