import { ChartLineUpIcon, ColumnsPlusRightIcon, ListBulletsIcon, ListPlusIcon, MapPinAreaIcon, MapPinPlusIcon, ReceiptIcon, TagIcon } from '@phosphor-icons/react';
import { BarcodeIcon, } from '@phosphor-icons/react/dist/ssr';

export const navLinks = [
    {
        id: 0,
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <ChartLineUpIcon />,
    },
    {
        id: 1,
        label: 'Relatórios',
        path: '/admin/relatorio',
        icon: <ListBulletsIcon />,
    },
    {
        id: 2,
        label: 'Pedidos',
        path: '/admin/pedidos',
        icon: <ReceiptIcon />,
    },
    {
        id: 3,
        label: 'Produtos',
        path: '/admin/produtos',
        icon: <BarcodeIcon />,
    },
    {
        id: 4,
        label: 'Categorias',
        path: '/admin/categorias',
        icon: <TagIcon />,
    },
    {
        id: 5,
        label: 'Rotas deEntregas',
        path: '/admin/cep-entrega',
        icon: <MapPinAreaIcon />,
    },
    {
        id: 6,
        label: 'Adicionar Produto',
        path: '/admin/novo-produto',
        icon: <ListPlusIcon />,
    },
    {
        id: 7,
        label: 'Adicionar Categoria',
        path: '/admin/nova-categoria',
        icon: <ColumnsPlusRightIcon />,
    },
    {
        id: 8,
        label: 'Adicionar Rota de Entrega',
        path: '/admin/nova-rota-entrega',
        icon: <MapPinPlusIcon />,
    },


];
