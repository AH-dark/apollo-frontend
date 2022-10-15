import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ViewState {
    isMobile: boolean
    title: string | null
}

const initialState: ViewState = {
    isMobile: false,
    title: null,
}

const View = createSlice({
    name: "view",
    initialState,
    reducers: {
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload
        },
        setTitle: (state, action: PayloadAction<string | null>) => {
            state.title = action.payload
        },
    },
})

export const { setIsMobile, setTitle } = View.actions
export default View.reducer
