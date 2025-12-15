import { BasketIcon } from '@phosphor-icons/react';
import { ContainerButton } from './styles';

export function CartButton({ ...props }) {
	return (
		<ContainerButton {...props}>
			<BasketIcon />
		</ContainerButton>
	);
}
