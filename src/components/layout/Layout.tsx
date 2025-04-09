import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex flex-col items-center h-full px-7.5'>{children}</div>
	);
};

export default Layout;
