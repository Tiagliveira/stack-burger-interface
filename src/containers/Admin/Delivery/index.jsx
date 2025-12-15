

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react"
import { api } from '../../../services/api';
import { formatPrice } from '../../../utils/formatPrice'
import { Container } from "./styles";


export function Delivery() {
    const [DeliveryTax, setDeliveryTax] = useState([])

    useEffect(() => {
        async function loadDeliveries() {
            const { data } = await api.get('/delivery-taxes');

            setDeliveryTax(data);
        }

        loadDeliveries(DeliveryTax);
    }, []);

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>CEP Inicial</TableCell>
                            <TableCell>CEP Final</TableCell>
                            <TableCell>Taxas</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DeliveryTax.map((delivery) => (
                            <TableRow
                                key={delivery.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {delivery.zip_code_start}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {delivery.zip_code_end}
                                </TableCell>
                                <TableCell align="center">{formatPrice(delivery.price)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}