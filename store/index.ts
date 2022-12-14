import { configureStore } from "@reduxjs/toolkit"
import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from "react-redux"
import thunk from "redux-thunk"

import view from "@reducers/view"
import api from "@/services/api"

const store = () =>
    configureStore({
        reducer: {
            view,
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware).concat(thunk),
        devTools: process.env.NODE_ENV !== "production",
    })

type Store = ReturnType<typeof store>
type Dispatch = Store["dispatch"]
type RootState = ReturnType<Store["getState"]>

export const useDispatch: () => Dispatch = () => useReduxDispatch<Dispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export default store
