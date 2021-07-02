import React, { memo } from 'react';

export interface StaticProps {
	children: React.ReactNode;
}

export const Static = memo(
	function Static({ children }) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <>{children}</>;
	},
	() => true,
);
