import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { api } from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { formatPrice } from '../../../utils/formatPrice';
import { Container, Header, TabButton, TabButtonCancel, Table, Tabs } from './styles';

export function Reports() {
    const [data, setData] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('sales');

    useEffect(() => {
        async function loadReports() {
            try {
                const { data } = await api.get('/dashboard/reports', {
                    params: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString()
                    }
                });
                setData(data);
            } catch (err) {
                console.error(err);
            }
        }
        loadReports();
    }, [startDate, endDate]);

    if (!data) return <div style={{ color: '#fff', padding: 20 }}>Carregando Relatórios...</div>;

    return (
        <Container>
            <Header>
                <h1>Relatórios Detalhados</h1>
                <div style={{ display: 'flex', gap: 10 }}>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="dd/MM/yyyy" customInput={<button style={{ padding: 10 }}>📅 Data Início</button>} />
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat="dd/MM/yyyy" customInput={<button style={{ padding: 10 }}>📅 Data Fim</button>} />
                </div>
            </Header>

            <Tabs>
                <TabButton $active={activeTab === 'sales'} onClick={() => setActiveTab('sales')}>Vendas</TabButton>
                <TabButton $active={activeTab === 'products'} onClick={() => setActiveTab('products')}>Produtos</TabButton>
                <TabButton $active={activeTab === 'delivery'} onClick={() => setActiveTab('delivery')}>Entregas</TabButton>
                <TabButton $active={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')}>Despesas</TabButton>
                <TabButtonCancel $active={activeTab === 'canceled'} onClick={() => setActiveTab('canceled')}>Cancelados</TabButtonCancel>
            </Tabs>

            {activeTab === 'sales' && (
                <Table>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Data</th>
                            <th>Cliente</th>
                            <th>Pagamento</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.salesList.map(item => (
                            <tr key={item.id}>
                                <td>#{item.id.substring(0, 6)}</td>
                                <td>{formatDate(item.date)}</td>
                                <td>{item.user}</td>
                                <td>{item.payment}</td>
                                <td>{formatPrice(item.total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {activeTab === 'products' && (
                <Table>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Qtd. Vendida</th>
                            <th>Valor Total Gerado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.productsList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{formatPrice(item.totalValue)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {activeTab === 'delivery' && (
                <Table>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Data</th>
                            <th>CEP Entregue</th>
                            <th>Taxa Cobrada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.deliveryList.map(item => (
                            <tr key={item.id}>
                                <td>#{item.id.substring(0, 6)}</td>
                                <td>{formatDate(item.date)}</td>
                                <td>{item.cep}</td>
                                <td>{formatPrice(item.fee)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {activeTab === 'expenses' && (
                <Table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.expensesList.map(item => (
                            <tr key={item.id}>
                                <td>{formatDate(item.date)}</td>
                                <td>{item.description}</td>
                                <td style={{ color: '#ff4040' }}>- {formatPrice(item.value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {activeTab === 'canceled' && (
                <Table>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Data</th>
                            <th>Motivo</th>
                            <th>Valor Perdido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.canceledList.map(item => (
                            <tr key={item.id}>
                                <td>#{item.id.substring(0, 6)}</td>
                                <td>{formatDate(item.date)}</td>
                                <td>{item.reason}</td>
                                <td style={{ color: '#ff4040' }}>{formatPrice(item.total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

        </Container>
    );
}
