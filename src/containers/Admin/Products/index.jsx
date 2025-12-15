import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CheckCircleIcon, PencilIcon, TrashIcon, XCircleIcon } from '@phosphor-icons/react';
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from "../../../services/api";
import { formatPrice } from '../../../utils/formatPrice'
import { ActionIcon, Container, EditButton, ModalContent, ModalOverlay, ProductImage } from "./styles";


export function Products() {
    const [products, setProducts] = useState([])
    const [productToDelete, setProductToDelete] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadProducts() {
            const { data } = await api.get('/products');


            setProducts(data);
        }

        loadProducts();
    }, []);

    async function handleDeleteProduct() {
        try {
            await api.delete(`/products/${productToDelete.id}`);
            setProducts(products.filter(prd => prd.id !== productToDelete.id));

            toast.success('Produto exxluido com sucesso!');
            setProductToDelete(null);
        } catch (_err) {
            toast.error('Erro ao deletar produto')
        }
    }

    function isOffer(offer) {
        if (offer) {
            return <CheckCircleIcon color='#06b314' size="30" />
        } else {
            return <XCircleIcon color='#e70808' size="30" />
        }

    }

    function editProduct(product) {
        navigate('/admin/editar-produto', { state: { product } });
    }



    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">Preço</TableCell>
                            <TableCell align="center">Produto em Oferta</TableCell>
                            <TableCell align="center">Editar Produto</TableCell>
                            <TableCell align="center">Excluir Produto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <ProductImage src={product.url} />
                                </TableCell>
                                <TableCell align="center">{product.name}</TableCell>
                                <TableCell align="center">{formatPrice(product.price)}</TableCell>
                                <TableCell align="center">{isOffer(product.offer)}</TableCell>
                                <TableCell align="center">
                                    <EditButton onClick={() => editProduct(product)}>
                                        <PencilIcon />
                                    </EditButton>
                                </TableCell>
                                <TableCell align="center">
                                    <ActionIcon onClick={() => setProductToDelete(product)}>
                                        <TrashIcon />
                                    </ActionIcon>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {productToDelete && (
                    <ModalOverlay>
                        <ModalContent>
                            <h3>Excluir Produto?</h3>
                            <p>Tem certeza que deseja excluir o item <b>{productToDelete.name}</b>?</p>
                            <p style={{ fontSize: 13 }}>Isso apenas removerá ele do cardápio do cliente.</p>

                            <div className="buttons">
                                <button className="cancel" onClick={() => setProductToDelete(null)}>
                                    Cancelar
                                </button>
                                <button className="confirm" onClick={handleDeleteProduct}>
                                    Sim, Excluir
                                </button>
                            </div>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </TableContainer>
        </Container>
    )
}