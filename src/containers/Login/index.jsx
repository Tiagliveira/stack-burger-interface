import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Logo from './../../assets/LogodevBurg.webp';
import { Button } from '../../components/Button/index';
import { UseUser } from '../../hooks/UserContext.jsx';
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

export function Login() {
	const navegate = useNavigate();
	const { putUserData } = UseUser();

	const schema = yup
		.object({
			email: yup
				.string()
				.email('Digite um e-mail válido.')
				.required('O e-mail é obrigatório'),
			password: yup
				.string()
				.min(6, 'A senha deve ter no minimo de 6 caracteres')
				.required('Digite uma senha'),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		try {
			const { data: userData } = await toast.promise(
				api.post('/sessions', {
					email: data.email,
					password: data.password,
				}),
				{
					pending: 'Verificando seus dados',
					success: {
						render() {
							setTimeout(() => {
								if (userData?.admin) {
									navegate('/admin/pedidos');
								} else {
									navegate('/');
								}
							}, 2000);
							return 'Seja Bem-vindo(a) 👌';
						},
					},
				},
			);

			putUserData(userData);
		} catch (err) {
			if (err.response?.status === 500) {
				toast.error('😵 Falha no Sistema! Tente Novamente em breve');
			} else if (err.response?.status === 400) {
				toast.error('Email ou Senha Incorretos 🤯');
			} else {
				toast.error('😵 Falha no Sistema! Tente Novamente em breve');
			}
			throw new Error('Erro na requisição');
		}
	};

	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-dev-burg" />
			</LeftContainer>
			<RightContainer>
				<Title>
					Olá seja bem vindo ao{' '}
					<span>
						Dev Burg!
						<br />
					</span>{' '}
					Acesse com seu <span> Login e Senha.</span>{' '}
				</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
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
					<Button type="submit">Entrar</Button>
				</Form>
				<p>
					Não possui conta? <Link to="/users"> Click aqui.</Link>
				</p>
			</RightContainer>
		</Container>
	);
}

export default Login;
