import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
import axios from "@/middleware/api"
import { AxiosError } from "axios"
import type AppResponse from "@/protos/response/app_response"
import type ErrorResponse from "@/protos/response/error_response"
import type SiteInfoResponse from "@/protos/response/siteinfo_response"

const axiosBaseQuery: () => BaseQueryFn =
    () =>
    async ({ url, method, data, headers, params }) => {
        try {
            const response = await axios.request<AppResponse | ErrorResponse>({
                url,
                method,
                data,
                headers,
                params,
            })

            if (response.data.code !== 0) {
                return {
                    error: response.data,
                }
            }

            return {
                data: (response.data as AppResponse).data,
            }
        } catch (error) {
            const err = error as AxiosError

            return {
                error: {
                    status: err.response?.status || err.status || 500,
                    data: err.response?.data || err.message || {},
                },
            }
        }
    }

const api = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery(),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getBasicSiteInfo: builder.query<SiteInfoResponse, void>({
            query: () => ({ url: "/info/site" }),
        }),
    }),
})

export const { useGetBasicSiteInfoQuery } = api
export default api
