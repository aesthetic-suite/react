import { useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useContextRequirement(context: React.Context<any>, message: string) {
	if (__DEV__) {
		// eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-unsafe-assignment
		const value = useContext(context);

		if (!value) {
			throw new Error(message);
		}
	}
}
