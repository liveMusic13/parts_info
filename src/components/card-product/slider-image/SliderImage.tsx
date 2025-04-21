import { FC, useEffect, useState } from 'react';

import { ISliderImageProps } from '../../../types/props.types';

// text-[var(--red)]
const SliderImage: FC<ISliderImageProps> = ({
	data,
	data_partsDetail,
	data_prPart,
}) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
	const [isScale, setIsScale] = useState(false);
	const arrImage = [
		...data?.img_urls,
		...(data_partsDetail[0]?.images || []),
		...data_prPart[0]?.images,
	];
	const [colorImage, setColorImage] = useState<string>('rgba(0,0,0,0.2)');

	const handleScale = () => setIsScale(!isScale);
	const handleColorImage = () => {
		const getImage = arrImage[currentIndex];

		data?.img_urls.forEach(el =>
			el === getImage ? setColorImage('#2b7fff') : null,
		);
		data_partsDetail[0]?.images.forEach(el =>
			el === getImage ? setColorImage('#8ec5ff') : null,
		);
		data_prPart[0]?.images.forEach(el =>
			el === getImage ? setColorImage('purple') : null,
		);
	};
	const handleThumbnailClick = (index: number) => {
		setCurrentIndex(index);
	};
	const handleNext = () => {
		setCurrentIndex(prev => (prev + 1) % arrImage.length);
		// const nextIndex = (currentIndex + 1) % arrImage.length; // Вычисляем следующий индекс
		// setCurrentIndex(nextIndex); // Обновляем состояние
		// handleCallbackImage(arrImage[nextIndex]);
	};
	const handlePrev = () => {
		setCurrentIndex(prev => (prev - 1 + arrImage.length) % arrImage.length);

		// const prevIndex = (currentIndex - 1) % arrImage.length; // Вычисляем следующий индекс
		// setCurrentIndex(prevIndex); // Обновляем состояние
		// handleCallbackImage(arrImage[prevIndex]);
	};
	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	useEffect(() => handleColorImage(), [currentIndex]);

	// shadow-[0px_0px_6px_0px_rgba(0,0,0,0.2)]
	return (
		<>
			{/* Обычный режим */}
			<div
				className={`relative text-center min-w-[21rem] h-[21rem] bg-[var(--white) p-5 rounded-[0.57rem]  flex flex-col justify-between`}
				style={{ boxShadow: `0px 0px 6px 0px ${colorImage}` }}
			>
				<div className='w-full h-36 flex items-center justify-between group'>
					<button
						className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hover:cursor-pointer bg-transparent'
						onClick={handlePrev}
					>
						{'<'}
					</button>

					<img
						className='object-cover w-fit h-full hover:cursor-pointer'
						src={
							arrImage.length > 0
								? arrImage[currentIndex]
								: '/images/no_image.jpg'
						}
						alt='target-image'
						onClick={toggleFullscreen}
					/>

					<button
						className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hover:cursor-pointer bg-transparent'
						onClick={handleNext}
					>
						{'>'}
					</button>
				</div>

				<p className='font-bold text-[0.71rem]'>
					{arrImage.length > 0 ? `${currentIndex + 1}/${arrImage.length}` : ''}
				</p>

				<div className='flex gap-1.5 h-12 overflow-y-auto overflow-x-hidden w-full justify-center'>
					{arrImage.map((img, index) => {
						const border =
							index === currentIndex ? `1px solid ${colorImage}` : '';
						return (
							<img
								key={index}
								className={`w-12 h-12 rounded-[4px] object-cover hover:cursor-pointer`}
								src={img}
								alt='thumbnail'
								onClick={() => handleThumbnailClick(index)}
								style={{
									border: border,
								}}
							/>
						);
					})}
				</div>
			</div>

			{/* Полноэкранный режим */}
			{isFullscreen && (
				<div className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.9)] flex justify-center items-center z-[1000]'>
					<button
						onClick={toggleFullscreen}
						className='absolute top-20 right-20 text-2xl text-[var(--white)] bg-transparent hover:cursor-pointer'
					>
						×
					</button>

					<div className='flex items-center justify-between gap-3.5 group'>
						<button
							className='opacity-0 group-hover:opacity-100 text-xl transition-opacity duration-300 ease-in-out bg-transparent text-[var(--white)] hover:cursor-pointer'
							onClick={handlePrev}
						>
							{'<'}
						</button>

						<img
							className='max-w-[90vw] max-h-[80vh] object-contain'
							src={
								arrImage.length > 0
									? arrImage[currentIndex]
									: '/images/no_image.jpg'
							}
							alt='fullscreen'
							style={isScale ? { transform: 'scale(1.8)' } : {}}
							onClick={handleScale}
						/>

						<button
							className='opacity-0 group-hover:opacity-100 text-xl transition-opacity duration-300 ease-in-out bg-transparent text-[var(--white)] hover:cursor-pointer'
							onClick={handleNext}
						>
							{'>'}
						</button>
					</div>

					<div className='absolute bottom-7 flex gap-3.5 '>
						{arrImage.map((img, index) => {
							const boxShadow =
								index === currentIndex ? `0px 0px 20px 0px ${colorImage}` : '';

							return (
								<img
									key={index}
									className={`w-36 h-24 rounded-[0.42rem] object-cover hover:cursor-pointer ${boxShadow}`}
									src={img}
									alt='thumbnail'
									onClick={() => handleThumbnailClick(index)}
									style={{
										boxShadow: boxShadow,
									}}
								/>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default SliderImage;
