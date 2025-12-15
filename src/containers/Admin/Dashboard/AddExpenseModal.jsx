import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { Button } from '../../../components/Button'; // Seu botão padrão
import { api } from './../../../services/api.js';
import { ModalContent, ModalOverlay } from './styles.js'


export function AddExpenseModal({ onClose, onReload }) {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState(new Date());

    async function handleSubmit() {
        if (!description || !value) return toast.warning('Preencha tudo!');

        try {
            await api.post('/expenses', {
                description,
                value: Number(value),
                date,
            });

            toast.success('Despesa lançada!');
            onReload();
            onClose();
        } catch (_errr) {
            toast.error('Erro ao salvar despesa');
        }
    }

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <h2> Nova Despesa (Sangria)</h2>

                <label>
                    Descrição
                    <input
                        placeholder="Ex: Conta de Luz, Motoboy Extra..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Valor (R$)
                    <input
                        type="number"
                        placeholder="0.00"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </label>
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                />
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                    <Button onClick={handleSubmit} style={{ width: '100%' }}>
                        Salvar
                    </Button>
                    <Button
                        onClick={onClose}
                        style={{ background: '#f7030f', width: '100%' }}
                    >
                        Cancelar
                    </Button>
                </div>
            </ModalContent>
        </ModalOverlay>
    );
}
