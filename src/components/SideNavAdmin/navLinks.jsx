import { ListPlusIcon, ReceiptIcon } from '@phosphor-icons/react';
import { BarcodeIcon } from '@phosphor-icons/react/dist/ssr';

export const navLinks = [
    {
        id: 1,
        label: 'Pedidos',
        path: '/admin/pedidos',
        icon: <ReceiptIcon />,
    },
    {
        id: 2,
        label: 'Produtos',
        path: '/admin/produtos',
        icon: <BarcodeIcon />,
    },
    {
        id: 3,
        label: 'Adicionar Produto',
        path: '/admin/novo-produto',
        icon: <ListPlusIcon />,
    },
];
