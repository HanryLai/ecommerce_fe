import React, { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { ProductType } from '../../utils/types/type/product.type'
import { NavigationStackParamList } from '../../utils/types'
import { accountHook, AppDispatch, useAppDispatch, useAppSelector } from '../../utils/redux'
import productSlice from '../../utils/redux/reducers/product.redux'
import api from '../../utils/axios'
import { IAccountEntity } from '../../interfaces'

const ProductComponent = ({ item }: { item: ProductType }) => {
	const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>()
	const dispatch = useAppDispatch<AppDispatch>()
	const accountSelector = useAppSelector(accountHook) as IAccountEntity

	const addToFavorite = async (id: string) => {
		if (Object.keys(accountSelector).length === 0) {
			Alert.alert(
				'Inform',
				'Please Sign In to add favorite, and you can Sign Up if not have account',
				[
					{
						text: 'Home Page',
						onPress: () => navigationHook.navigate('homepage', { screen: 'Home' }),
						style: 'cancel',
					},
					{ text: 'Sign in', onPress: () => navigationHook.navigate('login') },
					{ text: 'Sign up', onPress: () => navigationHook.navigate('register') },
				]
			)
		} else {
			try {
				const response = await api.post(`/favorites/${id}`)
				Alert.alert(response.data.message)
			} catch (error: any) {
				console.error(error)
				Alert.alert('Error', error.response?.data?.message || 'Something went wrong!')
			}
		}
	}

	const handleSelectProduct = async (id: string) => {
		try {
			const response = await api.get(`/products/${id}`)
			const data = response.data.data

			dispatch(productSlice.actions.selectproduct(data))
			navigationHook.navigate('productDetails', { id: id })
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<TouchableOpacity
			style={{
				width: 160,
				padding: 10,
				backgroundColor: '#F8F9FA',
				borderWidth: 1,
				borderColor: '#F3F4F6',
				borderRadius: 10,

				margin: 4,
			}}
			onPress={() => {
				handleSelectProduct(item.id)
			}}
		>
			<Image
				source={{ uri: item.image_url }}
				style={{
					width: 140,
					height: 140,
					marginHorizontal: 4,
					borderRadius: 10,
				}}
			/>
			<View
				style={{
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
					flex: 1,
					alignContent: 'flex-start',
				}}
			>
				<View style={{ height: 35 }}>
					<Text style={{ fontSize: 15, fontWeight: '700', textAlign: 'left' }} numberOfLines={2}>
						{item.name}
					</Text>
				</View>

				{/* <View style={{ flexDirection: 'row', marginVertical: 4, alignItems: 'center' }}>
					<AntDesign name="star" size={12} color="#FFD700" />
					<Text style={{ fontSize: 12, color: '#333' }}>4.8</Text>
				</View> */}
				<View
					style={{
						justifyContent: 'space-between',
						alignItems: 'center',
						flexDirection: 'row',
						width: '100%',
						marginTop: 4,
					}}
				>
					<Text style={{ fontWeight: '600', fontSize: 16 }}>${item.price}</Text>

					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 5,
						}}
						onPress={() => addToFavorite(item.id)}
					>
						<AntDesign name="hearto" size={20} color="#00BDD6" />
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default ProductComponent
