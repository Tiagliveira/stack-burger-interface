import { yupResolver } from '@hookform/resolvers/yup';
import { FileImageIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { api } from '../../../services/api.js';
import {
    Container,
    ErroMessage,
    Form,
    Input,
    InputGroup,
    Label,
    LabelUpload,
    SubmitButton,
} from './styles.js';

const schema = yup.object({
    name: yup.string().required('Digite o Nome da Categoria'),
    file: yup
        .mixed()
        .test('required', 'Escolha um arquivo para continuar', (value) => {
            return value && value.length > 0;
        })
        .test('fileSize', 'Carregue um arquivo de até 3mb', (value) => {
            return value && value.length > 0 && value[0].size <= 3000000;
        })
        .test('type', 'carregue imagens apenas pNG ou JPEG', (value) => {
            return (
                value &&
                value.length > 0 &&
                (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
            );
        }),
});

export function NewCategory() {
    const [fileName, setFileName] = useState(null);

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const CategoriFormData = new FormData();

        CategoriFormData.append('name', data.name);
        CategoriFormData.append('file', data.file[0]);

        await toast.promise(api.post('/categories', CategoriFormData), {
            pending: 'Criando o Categoria...',
            success: 'Categoria Criada com Sucesso',
            error: 'Falha ao Criar a Nova Categoria'
        })

        setTimeout(() => {
            navigate('/admin/categorias')
        }, 2000)


    };
    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register('name')} />
                    <ErroMessage>{errors?.name?.message}</ErroMessage>
                </InputGroup>
                <InputGroup>
                    <LabelUpload>
                        <FileImageIcon />
                        <input
                            type="file"
                            {...register('file')}
                            accept="image/png, image/jpeg"
                            onChange={(value) => {
                                setFileName(value?.target?.files[0]?.name);
                                register('file').onChange(value);
                            }}
                        />
                        {fileName || 'Upload do Produto'}
                    </LabelUpload>
                    <ErroMessage>{errors?.file?.message}</ErroMessage>
                </InputGroup>
                <SubmitButton> Adicionar Produto</SubmitButton>
            </Form>
        </Container>
    );
}
