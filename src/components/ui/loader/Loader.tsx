import { FC } from 'react';

const Loader: FC = () => {
	return (
		<div className=' top-1/2 left-1/2 transform-[translate(-50%, -50%)] w-11 h-11 rounded-[50%] animate-spin z-[9999] border-5 border-[#f3f3f3] border-t-5 border-t-[#3498db]'></div>
	);
};

export default Loader;
