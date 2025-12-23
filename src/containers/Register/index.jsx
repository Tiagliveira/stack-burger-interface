import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Logo from './../../assets/LogodevBurg.webp';
import { Button } from '../../components/Button/index';
import { api } from './../../services/api.js';
import {
	Container,
	Form,
	InpuntContainer,
	LeftContainer,
	Link,
	RightContainer,
	Title,
} from './styles';

export function Register() {
	const schema = yup
		.object({
			name: yup.string().required('O nome é Obrigatório'),
			email: yup
				.string()
				.email('Digite um e-mail válido.')
				.required('O e-mail é obrigatório'),
			password: yup
				.string()
				.min(6, 'A senha deve ter no minimo de 6 caracteres')
				.required('Digite uma senha'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'As senhas devem ser iguais '),
		})
		.required();

	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		try {
			const { status } = await api.post(
				'/users',
				{
					name: data.name,
					email: data.email,
					password: data.password,
				},
				{
					validateStatus: () => true,
				},
			);

			if ((status === 200) | (status === 201)) {
				setTimeout(() => {
					navigate('/login');
				}, 2000);
				toast.success('🎉 Conta Criada com Sucesso ');
			} else if (status === 409) {
				toast.error('Email já Cadastrado! Faça o login para continuar');
			} else {
				throw new Error();
			}
		} catch (_error) {
			toast.error('😵 Falha no Sistema! Tente Novamente em breve');
		}
	};

	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-dev-burg" />
			</LeftContainer>
			<RightContainer>
				<Title>Criar conta</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<InpuntContainer>
						<label>
							Nome
							<input type="text" {...register('name')} />
							<p>{errors?.name?.message}</p>
						</label>
					</InpuntContainer>
					<InpuntContainer>
						<label>
							Email
							<input type="email" {...register('email')} />
							<p>{errors?.email?.message}</p>
						</label>
					</InpuntContainer>
					<InpuntContainer>
						<label>
							Senha
							<input type="password" {...register('password')} />
							<p>{errors?.password?.message}</p>
						</label>
					</InpuntContainer>
					<InpuntContainer>
						<label>
							Confimar senha
							<input type="password" {...register('confirmPassword')} />
							<p>{errors?.confirmPassword?.message}</p>
						</label>
					</InpuntContainer>
					<Button type="submit">Criar</Button>
				</Form>
				<p>
					Já possui conta? <Link to="/login"> Click aqui.</Link>
				</p>
			</RightContainer>
		</Container>
	);
}

export default Register;
