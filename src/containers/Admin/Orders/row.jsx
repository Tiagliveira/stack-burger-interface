import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ChatCircleDotsIcon } from '@phosphor-icons/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { api } from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { formatPrice } from '../../../utils/formatPrice';
import { AdminChat } from './AdminChat';
import { orderStausOptions } from './orderStatus';
import { ChatButtonContainer, NotificationBadge, ProductImage, SelectStatus } from './styles';

export function Row({ row, orders, setOrders }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const messages = row.messages || [];
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  const storageKey = `devburger:order-read-${row.orderId}`;

  const [lastReadDate, setLastReadDate] = useState(() => {
    return localStorage.getItem(storageKey);
  });

  useEffect(() => {
    if (isChatOpen && lastMessage) {
      const msgDate = lastMessage.createdAt;
      localStorage.setItem(storageKey, msgDate);
      setLastReadDate(msgDate);
    }
  }, [messages, isChatOpen]);


  const isLastMessageFromClient = lastMessage && lastMessage.userName !== 'Restaurante';

  const showBadge = isLastMessageFromClient &&
    (!lastReadDate || lastReadDate !== lastMessage.createdAt) &&
    !isChatOpen;

  function handleOpenChat() {
    setIsChatOpen(true);
    if (lastMessage) {
      const msgDate = lastMessage.createdAt;
      localStorage.setItem(storageKey, msgDate);
      setLastReadDate(msgDate);
    }
  }

  const statusFlow = {
    CREATED: ['PREPARING', 'CANCELED'],
    PREPARING: ['READY', 'CANCELED'],
    READY: ['DELIVERING', 'CANCELED'],
    DELIVERING: ['DELIVERED'],
    DELIVERED: [],
    CANCELED: []
  };

  const availableOptions = orderStausOptions.filter(option => {
    if (option.value === row.status) return true;
    const allowedNextSteps = statusFlow[row.status] || [];
    return allowedNextSteps.includes(option.value);
  });

  async function newStatusOrders(id, status) {
    try {
      setLoading(true);
      await api.put(`orders/${id}`, { status });

      const newOrders = orders.map((order) =>
        order._id === id ? { ...order, status } : order,
      );
      setOrders(newOrders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }


  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId.substring(0, 6)}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{formatDate(row.date)}</TableCell>
        <TableCell>{formatPrice(row.total || 0)}</TableCell>
        <TableCell>
          <SelectStatus
            options={availableOptions}
            placeholder="Status"
            defaultValue={
              orderStausOptions.find((status) => status.value === row.status) || null
            }
            onChange={(status) => newStatusOrders(row.orderId, status.value)}
            isLoading={loading}
            menuPortalTarget={document.body}
            isDisabled={availableOptions.length <= 1}
          />
        </TableCell>

        <TableCell>
          <ChatButtonContainer>
            <IconButton aria-label='chat' onClick={handleOpenChat}>
              <ChatCircleDotsIcon size={24} />
            </IconButton>

            {showBadge && <NotificationBadge />}

          </ChatButtonContainer>
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Itens do Pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Observações</TableCell>
                    <TableCell>Categoria</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <ProductImage src={product.url} alt={product.name} />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {product.quantity}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell><span>{product.observation}</span></TableCell>
                      <TableCell>{product.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {isChatOpen && (
        <AdminChat
          orderId={row.orderId}
          clientName={row.name}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </>
  );
}

Row.propTypes = {
  orders: PropTypes.array.isRequired,
  setOrders: PropTypes.func.isRequired,
  row: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    messages: PropTypes.array,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        quantity: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
