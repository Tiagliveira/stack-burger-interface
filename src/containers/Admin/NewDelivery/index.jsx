import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { api } from '../../../services/api.js';
import {
    Container,
    ErroMessage,
    Form,
    Input,
    InputGroup,
    Label,
    SubmitButton,
} from './styles.js'

const schema = Yup.object({
    zip_code_start: Yup.string().required('Digite o CEP Inicial'),
    zip_code_end: Yup.string().required('Digite o CEP Final'),
    price: Yup.number().required('Digite a Taxa'),
});

export function NewDelivery() {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),

    });
    const onSubmit = async (data) => {

        try {
            const cleanStart = data.zip_code_start.replace(/\D/g, '')
            const cleanEnd = data.zip_code_end.replace(/\D/g, '')

            const payload = {
                zip_code_start: Number(cleanStart),
                zip_code_end: Number(cleanEnd),
                price: Number(data.price),
            }
            await toast.promise(api.post('/delivery-taxes', payload), {
                pending: 'Criando o Rota de entrega...',
                success: ' Rota de entrega Criada com Sucesso',
                error: 'Falha ao Criar a Nova Rota de entrega, Verifique se ja existe.'
            })
            reset()
            setTimeout(() => {
                navigate('/admin/cep-entrega')
            }, 2000)


        } catch (error) {
            console.log(error)
        }

    };
    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Digite o CEP Inicial</Label>
                    <Input type="text" {...register('zip_code_start')} />
                    <ErroMessage>{errors?.zip_code_start?.message}</ErroMessage>
                </InputGroup>
                <InputGroup>
                    <Label>Digite o CEP Final</Label>
                    <Input type="text" {...register('zip_code_end')} />
                    <ErroMessage>{errors?.zip_code_end?.message}</ErroMessage>
                </InputGroup>
                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" {...register('price')} />
                    <ErroMessage>{errors?.price?.message}</ErroMessage>
                </InputGroup>

                <SubmitButton> Adicionar Rota de Entrega</SubmitButton>
            </Form>
        </Container>
    );
}
