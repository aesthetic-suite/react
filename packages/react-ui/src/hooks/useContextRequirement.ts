import { useContext } from 'react';

export function useContextRequirement<T>(context: React.Context<T>, message: string) {
	if (__DEV__) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const value = useContext(context);

		if (!value) {
			throw new Error(message);
		}
	}
}
