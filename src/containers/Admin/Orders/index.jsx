import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useSocket } from '../../../context/SocketContext';
import { api } from '../../../services/api';
import { orderStausOptions } from './orderStatus';
import { Row } from './row';
import { Filter, FilterOptions, TableContainer } from './styles';

export function Orders() {
	const [orders, setOrders] = useState([]);
	const [filteredOrders, setFilteredOrders] = useState([]);
	const [activeStatus, setActiveStatus] = useState(0);
	const [rows, setRows] = useState([]);

	const { socket } = useSocket();

	useEffect(() => {
		async function loadOrders() {
			const { data } = await api.get('orders');

			const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

			setOrders(sortedOrders);
			setFilteredOrders(sortedOrders);
		}
		loadOrders();
	}, []);

	function createData(order) {
		const totalProdutos = order.products.reduce((acc, prd) => {

			const precoLimpo = typeof prd.price === 'string'
				? Number(prd.price.replace(/\D/g, '')) / 100
				: Number(prd.price);

			return acc + (precoLimpo * Number(prd.quantity));
		}, 0);

		const taxaEntrega = Number(order.deliveryFee || 0);

		const totalCalculado = totalProdutos + taxaEntrega;
		return {
			name: order.user.name,
			orderId: order._id,
			date: order.createdAt,
			status: order.status,
			products: order.products,
			messages: order.messages || [],

			total: (order.total && !Number.isNaN(order.total)) ? order.total : totalCalculado,
		};
	}

	useEffect(() => {
		const newRows = filteredOrders.map((order) => createData(order));
		setRows(newRows);
	}, [filteredOrders]);


	useEffect(() => {
		if (socket) {
			socket.on('new_order', (newOrderData) => {
				setOrders((prevOrders) => [newOrderData, ...prevOrders]);
				setFilteredOrders((prevFiltered) => [newOrderData, ...prevFiltered]);
			});

			socket.on('new_order_message', (data) => {
				const updateMessageInList = (prevList) => {
					return prevList.map(order => {
						if (order._id === data.orderId) {
							return {
								...order,
								messages: [...(order.messages || []), data.message]
							};
						}
						return order;
					});
				};

				setOrders(prevOrders => updateMessageInList(prevOrders));
				setFilteredOrders(prevFiltered => updateMessageInList(prevFiltered));
			});
		}
	}, [socket]);

	function handleStatus(status) {
		if (status.id === 0) {
			setFilteredOrders(orders);
		} else {
			const newOrders = orders.filter((order) => order.status === status.value);
			setFilteredOrders(newOrders);
		}
		setActiveStatus(status.id);
	}

	useEffect(() => {
		if (activeStatus === 0) {
			setFilteredOrders(orders);
		} else {
			const statusIndex = orderStausOptions.findIndex(
				(item) => item.id === activeStatus,
			);
			const newFilteredOrders = orders.filter(
				(order) => order.status === orderStausOptions[statusIndex].value,
			);
			setFilteredOrders(newFilteredOrders);
		}
	}, [orders]);

	return (
		<>
			<Filter>
				{orderStausOptions.map((status) => (
					<FilterOptions
						key={status.id}
						onClick={() => handleStatus(status)}
						$isActiveStatus={activeStatus === status.id}
					>
						{status.label}
					</FilterOptions>
				))}
			</Filter>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Pedido</TableCell>
							<TableCell>Cliente</TableCell>
							<TableCell>Data do Pedido</TableCell>
							<TableCell>Valor do Pedido</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<Row
								key={row.orderId}
								row={row}
								orders={orders}
								setOrders={setOrders}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
