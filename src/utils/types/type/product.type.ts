import { FeedbackType } from './feekback.type'
import { ListOptionType } from './listOption.type'
import { OptionType } from './option.type'

export type ProductType = {
	id: string
	name: string
	description: string
	image_url: string
	price: string
	category_id: string
	options: OptionType[]
	feedbacks: FeedbackType[]
}
