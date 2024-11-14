// reducers/feedback.redux.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

// Tạo slice cho feedback
const feedbackSlice = createSlice({
	name: 'feedback',
	initialState: {
		value: [] as FeedbackType[], // Danh sách feedback
		selectedfeedback: null as FeedbackType | null, // feedback đã chọn
	},
	reducers: {
		selectfeedback: (state, action) => {
			state.selectedfeedback = action.payload
		},
		storefeedback: (state, action) => {
			state.value = action.payload
		},
	},
})

// Xuất reducer của slice này
export const { selectfeedback } = feedbackSlice.actions

export default feedbackSlice // Đây chính là feedbackReducer mà bạn cần
