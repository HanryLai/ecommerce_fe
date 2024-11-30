import { Product } from '../../../interfaces'
import { ProductType } from './product.type'

export interface OrderItem {
	id: string
	order_id: string
	feedback_id: string
	quantity: number
	single_price: number
	product_description: string
	products: ProductType
}
