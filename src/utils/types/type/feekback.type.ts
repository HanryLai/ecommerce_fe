import { IAccountEntity, IDetailInformationEntity } from '../../../interfaces'

export interface FeedbackType {
	id: string
	product_id: string
	image_url: string
	rating: string
	comment: string
	account: IAccountEntity
}
