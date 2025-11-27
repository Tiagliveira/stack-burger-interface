import { ColumnsPlusRightIcon, ListPlusIcon, ReceiptIcon, TagIcon } from '@phosphor-icons/react';
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
        label: 'categorias',
        path: '/admin/categorias',
        icon: <TagIcon />,
    },
    {
        id: 4,
        label: 'Adicionar Produto',
        path: '/admin/novo-produto',
        icon: <ListPlusIcon />,
    },
    {
        id: 5,
        label: 'Adicionar Categoria',
        path: '/admin/nova-categoria',
        icon: <ColumnsPlusRightIcon />,
    },


];
