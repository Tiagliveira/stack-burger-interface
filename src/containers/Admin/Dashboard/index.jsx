import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
    MotorcycleIcon,
    ShoppingBagIcon,
    TrendDownIcon,
    WalletIcon,
    XCircleIcon
} from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import {
    Bar,
    BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';
import { api } from '../../../services/api';
import { formatPrice } from '../../../utils/formatPrice';
import { AddExpenseModal } from './AddExpenseModal';

import {
    Box,
    CardContainer,
    Container,
    FilterContainer,
    RankingContainer
} from './styles';

export function Dashboard() {
    const [data, setData] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);

    async function loadDashboard() {
        try {
            const { data } = await api.get('/dashboard', {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                },
            });
            setData(data);
        } catch (_err) {
            toast.error('Erro ao carregar dados do Dashboard');
        }
    }

    useEffect(() => {
        loadDashboard();
    }, [startDate, endDate]);

    if (!data) {
        return <div style={{ color: '#fff', padding: 20 }}>Carregando dados...</div>;
    }

    const chartData = [
        { name: 'Criados', quantidade: data.status?.created || 0, fill: '#0088FE' },
        { name: 'Preparo', quantidade: data.status?.preparing || 0, fill: '#FF8042' },
        { name: 'Entrega', quantidade: data.status?.delivering || 0, fill: '#FFBB28' },
        { name: 'Entregues', quantidade: data.status?.delivered || 0, fill: '#00C49F' },
        { name: 'Cancelados', quantidade: data.status?.canceled || 0, fill: '#EF4444' },
    ];

    return (
        <Container>
            <div className="header-dash">
                <h1>Dashboard Financeiro</h1>
                <button onClick={() => setModalOpen(true)} className="btn-sangria">
                    Lançar Despesa
                </button>
            </div>

            <FilterContainer>
                <div className="input-group">
                    <span>De:</span>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Data Inicial"
                    />
                </div>
                <div className="input-group">
                    <span>Até:</span>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Data Final"
                    />
                </div>
            </FilterContainer>

            <CardContainer>
                <Box color="#00ff7f">
                    <div className="header-box">
                        <p>Venda Produtos</p>
                        <ShoppingBagIcon size={28} />
                    </div>
                    <h2>{formatPrice(data.finance?.productRevenue)}</h2>
                    <span>{data.finance?.validOrdersCount} pedidos realizados</span>
                </Box>

                <Box color="#1E90FF">
                    <div className="header-box">
                        <p>Taxas Entrega</p>
                        <MotorcycleIcon size={28} />
                    </div>
                    <h2>{formatPrice(data.finance?.deliveryRevenue)}</h2>
                    <span>{data.finance?.deliveryCount} entregas feitas</span>
                </Box>

                <Box color="#FF4040">
                    <div className="header-box">
                        <p>Despesas</p>
                        <TrendDownIcon size={28} />
                    </div>
                    <h2>- {formatPrice(data.finance?.totalExpenses || 0)}</h2>
                    <span>Gastos do período</span>
                </Box>

                <Box color="#888">
                    <div className="header-box">
                        <p>Cancelados</p>
                        <XCircleIcon size={28} />
                    </div>
                    <h2>{formatPrice(data.finance?.canceledRevenue || 0)}</h2>
                    <span>{data.status?.canceled || 0} pedidos perdidos</span>
                </Box>

                <Box color="#FFD700" $isProfit>
                    <div className="header-box">
                        <p>Lucro Líquido</p>
                        <WalletIcon size={28} />
                    </div>
                    <h2>{formatPrice(data.finance?.netProfit)}</h2>
                    <span>(Vendas - Despesas)</span>
                </Box>
            </CardContainer>

            <div style={{ width: '100%', height: 300, marginBottom: 30, background: '#222', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#eee', marginBottom: '20px' }}>Status dos Pedidos</h3>

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" stroke="#ccc" tick={{ fill: '#ccc' }} />
                        <YAxis stroke="#ccc" tick={{ fill: '#ccc' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#333', border: '1px solid #555', color: '#fff' }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar dataKey="quantidade" radius={[5, 5, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* --- RANKINGS --- */}
            <div className="bottom-area">
                <RankingContainer>
                    <h3>🏆 Campeões de Venda</h3>
                    <div className="list">
                        {data.ranking?.bestSellers?.map((item, index) => (
                            <div key={index} className="item">
                                <span className="pos">#{index + 1}</span>
                                <span className="name">{item.name}</span>
                                <span className="qtd">{item.quantity} un.</span>
                            </div>
                        ))}
                    </div>
                </RankingContainer>

                <RankingContainer>
                    <h3>📉 Menos Vendidos</h3>
                    <div className="list">
                        {data.ranking?.worstSellers?.map((item, index) => (
                            <div key={index} className="item">
                                <span className="pos">🔻</span>
                                <span className="name">{item.name}</span>
                                <span className="qtd">{item.quantity} un.</span>
                            </div>
                        ))}
                    </div>
                </RankingContainer>
            </div>

            {modalOpen && (
                <AddExpenseModal
                    onClose={() => setModalOpen(false)}
                    onReload={loadDashboard}
                />
            )}
        </Container>
    );
}
