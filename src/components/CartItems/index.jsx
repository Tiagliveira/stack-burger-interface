import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react"; // Verifique os nomes dos ícones
import { useState } from "react";
import { useTheme } from "styled-components";

import { UseCart } from '../../hooks/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { ObservationModal } from './../index';
import { Table } from '../index';

import {
    ButtonGroup, ButtonObsevation,
    DesktopView, EmptyCart, MobileCard,
    MobileView,
    ProductImage,
    TotalPrice,
} from './styles';

export function CartItems() {
    const theme = useTheme();
    const { cartProducts, increaseProduct, decreaseProduct, deleteProduct, updateProductObservation } = UseCart();
    const [editingProduct, setEditingProduct] = useState(null);

    return (
        <>
            <DesktopView>
                <Table.Root>
                    <Table.Header>
                        <Table.Tr>
                            <Table.Th></Table.Th>
                            <Table.Th>Itens</Table.Th>
                            <Table.Th>Preço</Table.Th>
                            <Table.Th>Quantidade</Table.Th>
                            <Table.Th>Total</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Header>
                    <Table.Body>
                        {cartProducts?.length ? (
                            cartProducts.map(product => (
                                <Table.Tr key={product.id}>
                                    <Table.Td>
                                        <ProductImage src={product.url} alt={product.name} />
                                    </Table.Td>
                                    <Table.Td>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <span>{product.name}</span>
                                            <ButtonObsevation
                                                onClick={() => setEditingProduct(product)}
                                                style={{ color: product.observation ? theme.purple : theme.darkGray }}
                                            >
                                                <PencilSimpleIcon size={14} />
                                                <span>{product.observation ? product.observation : 'Adicionar observação'}</span>
                                            </ButtonObsevation>
                                        </div>
                                    </Table.Td>
                                    <Table.Td>{product.currencyValue}</Table.Td>
                                    <Table.Td>
                                        <ButtonGroup>
                                            <button onClick={() => decreaseProduct(product.id)}>-</button>
                                            {product.quantity}
                                            <button onClick={() => increaseProduct(product.id)}>+</button>
                                        </ButtonGroup>
                                    </Table.Td>
                                    <Table.Td>
                                        <TotalPrice>{formatPrice(product.quantity * product.price)}</TotalPrice>
                                    </Table.Td>
                                    <Table.Td>
                                        <TrashIcon
                                            style={{ color: theme.red, cursor: 'pointer' }}
                                            size={25}
                                            onClick={() => deleteProduct(product.id)}
                                        />
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                                    <EmptyCart>Carrinho Vazio</EmptyCart>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Body>
                </Table.Root>
            </DesktopView>

            <MobileView>
                {cartProducts?.length ? (
                    cartProducts.map(product => (
                        <MobileCard key={product.id}>
                            <button className="trash-btn" onClick={() => deleteProduct(product.id)}>
                                <TrashIcon size={22} color={theme.red} />
                            </button>

                            <div className="img-container">
                                <img src={product.url} alt={product.name} />
                            </div>

                            <div className="content">
                                <div>
                                    <h4>{product.name}</h4>
                                    <span className="price">{product.currencyValue}</span>
                                    <ButtonObsevation
                                        onClick={() => setEditingProduct(product)}
                                        style={{ color: product.observation ? theme.purple : theme.darkGray, marginTop: 5, display: 'flex' }}
                                    >
                                        <PencilSimpleIcon size={14} />
                                        <span>{product.observation ? 'Editar Obs.' : 'Add Obs.'}</span>
                                    </ButtonObsevation>
                                </div>

                                <div className="actions">
                                    <ButtonGroup>
                                        <button onClick={() => decreaseProduct(product.id)}>-</button>
                                        {product.quantity}
                                        <button onClick={() => increaseProduct(product.id)}>+</button>
                                    </ButtonGroup>

                                    <span className="total-price">
                                        {formatPrice(product.quantity * product.price)}
                                    </span>
                                </div>
                            </div>
                        </MobileCard>
                    ))
                ) : (
                    <EmptyCart>Carrinho Vazio</EmptyCart>
                )}
            </MobileView>

            {editingProduct && (
                <ObservationModal
                    initialValue={editingProduct.observation || ''}
                    onClose={() => setEditingProduct(null)}
                    onSave={(newText) => {
                        updateProductObservation(editingProduct.id, newText);
                        setEditingProduct(null);
                    }}
                />
            )}
        </>
    );
}
