import { configureStore } from "@reduxjs/toolkit"
import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from "react-redux"

const store = () =>
    configureStore({
        reducer: {},
        devTools: process.env.NODE_ENV !== "production",
    })

type Store = ReturnType<typeof store>
type Dispatch = Store["dispatch"]
type RootState = ReturnType<Store["getState"]>

export const useDispatch: () => Dispatch = () => useReduxDispatch<Dispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export default store
