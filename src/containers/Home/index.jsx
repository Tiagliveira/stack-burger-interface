import { CategoriesCarousel, OffersCarousel } from '../../components';
import { Banner, Container, Content, Main } from './styles';

export function Home() {
	return (
		<Main>
			<Banner>
				<h1>Bem-vindo(a)</h1>
			</Banner>
			<Container>
				<Content>
					<CategoriesCarousel />
					<OffersCarousel />
				</Content>
			</Container>
		</Main>
	);
}
