import { yupResolver } from '@hookform/resolvers/yup';
import { FileImageIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { api } from '../../../services/api.js';
import {
    Container,
    ContainerCheckbox,
    ErroMessage,
    Form,
    Input,
    InputGroup,
    Label,
    LabelUpload,
    Select,
    SubmitButton,
} from './styles.js';

const schema = Yup.object({
    name: Yup.string(),
    description: Yup.string(),
    price: Yup
        .number()
        .positive()
        .typeError('Digite o Preço do  Produto'),
    category: Yup.object().required('Escolha uma Categoria'),
    offer: Yup.bool(),
});

export function EditProducts() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const { state: { product } } = useLocation();


    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');

            setCategories(data);
        }
        loadCategories();
    }, []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const productFormData = new FormData();

        productFormData.append('name', data.name);
        productFormData.append('description', data.description);
        productFormData.append('price', data.price);
        productFormData.append('category_id', data.category.id);
        productFormData.append('file', data.file[0]);
        productFormData.append('offer', data.offer);


        await toast.promise(api.put(`/products/${product.id}`, productFormData), {
            pending: 'Editando o Produto...',
            success: 'Produto Editado com Sucesso',
            error: 'Falha ao Editar o Novo Produto'
        })

        setTimeout(() => {
            navigate('/admin/produtos')
        }, 2000)

    };
    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register('name')} defaultValue={product.name} />
                    <ErroMessage>{errors?.name?.message}</ErroMessage>
                </InputGroup>
                <InputGroup>
                    <Label>Descrição do Produto</Label>
                    <Input type="text" {...register('description')} defaultValue={product.description} />
                    <ErroMessage>{errors?.description?.message}</ErroMessage>
                </InputGroup>
                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" step="0.01" {...register('price')} defaultValue={product.price / 100} />
                    <ErroMessage>{errors?.price?.message}</ErroMessage>
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
                <InputGroup>
                    <Label>Categoria</Label>
                    <Controller
                        name="category"
                        control={control}
                        defaultValue={product.category}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="categorias"
                                menuPortalTarget={document.body}
                                defaultValue={product.category}

                            />

                        )}

                    />
                    <ErroMessage>{errors?.category?.message}</ErroMessage>
                </InputGroup>
                <InputGroup>
                    <ContainerCheckbox>
                        <input type='checkbox' defaultChecked={product.offer} {...register('offer')} />
                        <Label>Produto em Oferta?</Label>

                    </ContainerCheckbox>
                </InputGroup>

                <SubmitButton> Editar Produto</SubmitButton>
            </Form>
        </Container>
    );
}
