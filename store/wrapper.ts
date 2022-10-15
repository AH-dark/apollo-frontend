import { createWrapper } from "next-redux-wrapper"
import store from "@/store/index"

const wrapper = createWrapper(store, {
    debug: process.env.NODE_ENV !== "production",
})

export default wrapper
