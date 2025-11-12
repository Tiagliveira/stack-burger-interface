import { yupResolver } from '@hookform/resolvers/yup';
import { FileImageIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
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

const schema = yup.object({
    name: yup.string().required('Digite o Nome do Produto'),
    price: yup
        .number()
        .positive()
        .required('Digite o Preço do  Produto')
        .typeError('Digite o Preço do  Produto'),
    category: yup.object().required('Escolha uma Categoria'),
    offer: yup.bool(),
    file: yup
        .mixed()
        .test('required', 'Escolha um arquivo para continuar', (value) => {
            return value && value.length > 0;
        })
        .test('fileSize', 'Carregue um arquivo de até 3mb', (value) => {
            return value && value.length > 0 && value[0].size <= 300000;
        })
        .test('type', 'carregue imagens apenas pNG ou JPEG', (value) => {
            return (
                value &&
                value.length > 0 &&
                (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
            );
        }),
});

export function NewProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate()

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
        productFormData.append('price', data.price * 100);
        productFormData.append('category_id', data.category.id);
        productFormData.append('file', data.file[0]);
        productFormData.append('offer', data.offer);


        await toast.promise(api.post('/products', productFormData), {
            pending: 'Adicionando o Produto...',
            success: 'Produto Cadastrado com Sucesso',
            error: 'Falha ao Cadastrar o Novo Produto'
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
                    <Input type="text" {...register('name')} />
                    <ErroMessage>{errors?.name?.message}</ErroMessage>
                </InputGroup>
                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" {...register('price')} />
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
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="categorias"
                                menuPortalTarget={document.body}

                            />

                        )}

                    />
                    <ErroMessage>{errors?.category?.message}</ErroMessage>
                </InputGroup>
                <InputGroup>
                    <ContainerCheckbox>
                        <input type='checkbox'  {...register('offer')} />
                        <Label>Produto em Oferta?</Label>

                    </ContainerCheckbox>
                </InputGroup>

                <SubmitButton> Adicionar Produto</SubmitButton>
            </Form>
        </Container>
    );
}
