import { FC, useState } from 'react';

import { ISliderImageProps } from '../../../types/props.types';

import styles from './SliderImage.module.scss';

const SliderImage: FC<ISliderImageProps> = ({ arrImage }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
	const [isScale, setIsScale] = useState(false);

	const handleScale = () => setIsScale(!isScale);

	const handleThumbnailClick = (index: number) => {
		setCurrentIndex(index);
	};

	const handleNext = () => {
		setCurrentIndex(prev => (prev + 1) % arrImage.length);
	};

	const handlePrev = () => {
		setCurrentIndex(prev => (prev - 1 + arrImage.length) % arrImage.length);
	};

	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	return (
		<>
			{/* Обычный режим */}
			<div className={styles.wrapper_miniSlider}>
				<div className={styles.block__targetImage}>
					<button className={styles.button} onClick={handlePrev}>
						{'<'}
					</button>

					<img
						className={styles.image__target}
						src={arrImage[currentIndex]}
						alt='target-image'
						onClick={toggleFullscreen}
					/>

					<button className={styles.button} onClick={handleNext}>
						{'>'}
					</button>
				</div>

				<p className={styles.num__target}>
					{arrImage.length > 0 ? `${currentIndex + 1}/${arrImage.length}` : ''}
				</p>

				<div className={styles.arr__fullImages}>
					{arrImage.map((img, index) => (
						<img
							key={index}
							className={styles.fullImages__image}
							src={img}
							alt='thumbnail'
							onClick={() => handleThumbnailClick(index)}
							style={{
								border: index === currentIndex ? '1px solid black' : 'none',
							}}
						/>
					))}
				</div>
			</div>

			{/* Полноэкранный режим */}
			{isFullscreen && (
				<div className={styles.wrapper_FullScreen_Slider}>
					<button onClick={toggleFullscreen} className={styles.button_exit}>
						×
					</button>

					<div className={styles.block__targetImage_fullScreen}>
						<button className={styles.button_fullScreen} onClick={handlePrev}>
							{'<'}
						</button>

						<img
							className={styles.image__target_fullScreen}
							src={arrImage[currentIndex]}
							alt='fullscreen'
							style={isScale ? { transform: 'scale(1.8)' } : {}}
							onClick={handleScale}
						/>

						<button className={styles.button_fullScreen} onClick={handleNext}>
							{'>'}
						</button>
					</div>

					<div className={styles.arr__fullImages_fullScreen}>
						{arrImage.map((img, index) => (
							<img
								key={index}
								className={styles.fullImages__image_fullScreen}
								src={img}
								alt='thumbnail'
								onClick={() => handleThumbnailClick(index)}
								style={{
									boxShadow:
										index === currentIndex ? '0px 0px 10px red' : 'none',
								}}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default SliderImage;
