import { OrderItem } from './orderItem.type'

export interface Order {
	id: string
	isActive: boolean
	orderDate: string
	total_price: number
	full_name: string
	phone: string
	address: string
	account_id: string
	orderItems: OrderItem[]
}
