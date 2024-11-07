import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export type CategoryType = {
	id: string
	name: string
	image: string
}
