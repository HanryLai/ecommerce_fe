import { ListOptionType } from './listOption.type'

export interface OptionType {
	id: string
	name: string
	description: string
	product_id: string
	listOptions: ListOptionType[]
}
