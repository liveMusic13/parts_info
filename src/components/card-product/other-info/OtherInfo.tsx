import { FC, useCallback, useState } from 'react';

import { otherInfoButtons } from '../../../data/panel.data';
import { IOtherInfoProps } from '../../../types/props.types';
import PanelTarget from '../../ui/panel-target/PanelTarget';
import Info from '../info/Info';

import styles from './OtherInfo.module.scss';

const OtherInfo: FC<IOtherInfoProps> = ({ data_detail }) => {
	const [activeButton, setActiveButton] = useState<string>('Описание');

	const handleClick = useCallback(
		(but: string) => {
			setActiveButton(but);
		},
		[activeButton],
	);

	return (
		<div className={styles.block__otherInfo}>
			<PanelTarget
				activeButton={activeButton}
				handleClick={handleClick}
				dataButtons={otherInfoButtons}
			/>
			{activeButton === 'Описание' && (
				<div className={styles.block__description}>
					<h2 className={styles.title__description}>Описание: </h2>
					<Info
						title='Артикул в нормальном написании (со спецсимволами): '
						value={data_detail?.article_schema?.DataSupplierArticleNumber || ''}
					/>

					<Info
						title='Статус изделия (нормальный, снят с производства и др.): '
						value={data_detail?.article_schema?.ArticleStateDisplayValue || ''}
					/>
					<Info
						title='Дополнительное описание (примечание): '
						value={data_detail?.article_schema?.Description || 'Нет данных'}
					/>
					<Info
						title='Является сопутствующим товаром?: '
						value={
							typeof data_detail?.article_schema?.FlagAccessory === 'boolean'
								? data_detail?.article_schema?.FlagAccessory || false
								: data_detail?.article_schema?.FlagAccessory || ''
						}
					/>
					<Info
						title='Сертифицированное сырье?: '
						value={
							typeof data_detail?.article_schema?.FlagMaterialCertification ===
							'boolean'
								? data_detail?.article_schema?.FlagMaterialCertification ||
									false
								: data_detail?.article_schema?.FlagMaterialCertification || ''
						}
					/>
					<Info
						title='Восстановленное изделие?: '
						value={
							typeof data_detail?.article_schema?.FlagRemanufactured ===
							'boolean'
								? data_detail?.article_schema?.FlagRemanufactured || false
								: data_detail?.article_schema?.FlagRemanufactured || ''
						}
					/>
					<Info
						title='Поставляется без упаковки?: '
						value={
							typeof data_detail?.article_schema?.FlagSelfServicePacking ===
							'boolean'
								? data_detail?.article_schema?.FlagSelfServicePacking || false
								: data_detail?.article_schema?.FlagSelfServicePacking || ''
						}
					/>
					<Info
						title='Артикул в поисковом написании: '
						value={
							typeof data_detail?.article_schema?.FoundString === 'boolean'
								? data_detail?.article_schema?.FoundString || false
								: data_detail?.article_schema?.FoundString || ''
						}
					/>
					<Info
						title='Имеет применяемость в осях?: '
						value={
							typeof data_detail?.article_schema?.HasAxle === 'boolean'
								? data_detail?.article_schema?.HasAxle || false
								: data_detail?.article_schema?.HasAxle || ''
						}
					/>
					<Info
						title='Имеет применяемость в коммерческих ТС?: '
						value={
							typeof data_detail?.article_schema?.HasCVManuID === 'boolean'
								? data_detail?.article_schema?.HasCVManuID || false
								: data_detail?.article_schema?.HasCVManuID || ''
						}
					/>
					<Info
						title='Связь с серийными номерами автомобилей: '
						value={
							typeof data_detail?.article_schema?.HasCommercialVehicle ===
							'boolean'
								? data_detail?.article_schema?.HasCommercialVehicle || false
								: data_detail?.article_schema?.HasCommercialVehicle || ''
						}
					/>
					<Info
						title='Имеет применяемость в двигателях?:'
						value={
							typeof data_detail?.article_schema?.HasEngine === 'boolean'
								? data_detail?.article_schema?.HasEngine || false
								: data_detail?.article_schema?.HasEngine || ''
						}
					/>
					<Info
						title='Имеет применяемость?:'
						value={
							typeof data_detail?.article_schema?.HasLinkitems === 'boolean'
								? data_detail?.article_schema?.HasLinkitems || false
								: data_detail?.article_schema?.HasLinkitems || ''
						}
					/>
					<Info
						title='Имеет применяемость в мототехнике?: '
						value={
							typeof data_detail?.article_schema?.HasMotorbike === 'boolean'
								? data_detail?.article_schema?.HasMotorbike || false
								: data_detail?.article_schema?.HasMotorbike || ''
						}
					/>
					<Info
						title='Имеет применяемость в легковых ТС?: '
						value={
							typeof data_detail?.article_schema?.HasPassengerCar === 'boolean'
								? data_detail?.article_schema?.HasPassengerCar || false
								: data_detail?.article_schema?.HasPassengerCar || ''
						}
					/>
					<Info
						title='Артикул разрешен к использованию в БД?: '
						value={
							typeof data_detail?.article_schema?.IsValid === 'boolean'
								? data_detail?.article_schema?.IsValid || false
								: data_detail?.article_schema?.IsValid || ''
						}
					/>
					<Info
						title='Основное описание (наименование):'
						value={data_detail?.article_schema?.NormalizedDescription || ''}
					/>
					<Info
						title='Упаковочная единица: '
						value={data_detail?.article_schema?.PackingUnit || ''}
					/>
					<Info
						title='Количество в упаковке:'
						value={data_detail?.article_schema?.QuantityPerPackingUnit || ''}
					/>
				</div>
			)}
		</div>
	);
};

export default OtherInfo;
