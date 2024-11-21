import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export type CategoryType = {
	id: string
	title: string
	image: string
}
