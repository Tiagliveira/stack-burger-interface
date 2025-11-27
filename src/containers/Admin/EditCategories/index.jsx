import { yupResolver } from '@hookform/resolvers/yup';
import { FileImageIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
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
});

export function EditCategories() {
    const [fileName, setFileName] = useState(null);

    const navigate = useNavigate();

    const { state: { category } } = useLocation();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const categoryFormData = new FormData();

        categoryFormData.append('name', data.name);
        categoryFormData.append('file', data.file[0]);


        await toast.promise(api.put(`/categories/${category.id}`, categoryFormData), {
            pending: 'Editando a Categoria...',
            success: 'Categoria Editada com Sucesso',
            error: 'Falha ao Editar a Categoria'
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
                    <Input type="text" {...register('name')} defaultValue={category.name} />
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
                <SubmitButton> Editar Categoria</SubmitButton>
            </Form>
        </Container>
    );
}
