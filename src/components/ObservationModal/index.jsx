import { useState } from 'react';
import { Button } from '../Button';
import { Content, Overlay } from './styles';



export function ObservationModal({ onClose, onSave, initialValue = '' }) {
    const [value, setValue] = useState(initialValue);

    return (
        <Overlay onClick={onClose}>
            <Content onClick={e => e.stopPropagation()}>
                <h3>Alguma observação?</h3>
                <textarea
                    placeholder="Ex: Tirar a cebola, maionese à parte..."
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <div className="buttons">
                    <Button onClick={() => onSave(value)} style={{ width: '100%' }}>Salvar</Button>
                    <Button onClick={onClose} style={{ width: '100%', background: '#625e5e' }}>Cancelar</Button>
                </div>
            </Content>
        </Overlay>
    );
}
