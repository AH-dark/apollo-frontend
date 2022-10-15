import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
import axios from "@/middleware/api"
import { AxiosError } from "axios"
import type AppResponse from "@/protos/response/app_response"
import type ErrorResponse from "@/protos/response/error_response"
import type SiteInfoResponse from "@/protos/response/siteinfo_response"
import CheckLoginResponse from "@/protos/response/check_login_response"
import UserResponse from "@/protos/response/user_response"
import LoginPayload from "@/protos/request/login_payload"
import SubmitCommentPayload from "@/protos/request/submit_comment_payload"
import CommentResponse from "@/protos/response/comment_response"
import CommentsListResponse from "@/protos/response/comments_list_response"

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
    tagTypes: ["CurrentUser", "SiteInfo", "User", "Comment"],
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getBasicSiteInfo: builder.query<SiteInfoResponse, void>({
            query: () => ({ url: "/info/site" }),
            providesTags: (result) => [
                ...(result
                    ? Array.from(Object.keys(result.settings)).map<{
                          type: "SiteInfo"
                          id: string
                      }>((k) => ({
                          type: "SiteInfo",
                          id: k,
                      }))
                    : []),
                {
                    type: "SiteInfo",
                    id: "LIST",
                },
                {
                    type: "SiteInfo",
                    id: "BASIC_LIST",
                },
            ],
        }),
        getCurrentUser: builder.query<CheckLoginResponse, void>({
            query: () => ({ url: "/session/me" }),
            providesTags: (result) => [
                {
                    type: "User",
                    id: result?.id,
                },
                "CurrentUser",
            ],
        }),
        login: builder.mutation<UserResponse, LoginPayload>({
            query: (payload) => ({
                url: "/auth/login",
                method: "POST",
                data: payload,
            }),
            invalidatesTags: ["CurrentUser"],
        }),
        logout: builder.mutation<void, void>({
            query: () => ({ url: "/auth/logout", method: "POST" }),
            invalidatesTags: ["CurrentUser"],
        }),
        postComment: builder.mutation<CommentResponse, SubmitCommentPayload>({
            query: (payload) => ({
                url: "/comment/submit",
                method: "POST",
                data: payload,
            }),
            invalidatesTags: ["Comment", { type: "Comment", id: "LIST" }],
        }),
        listComments: builder.query<
            CommentsListResponse,
            { before: number; pageSize: number }
        >({
            query: ({ before, pageSize }) => ({
                url: "/comment/list",
                params: {
                    before,
                    page_size: pageSize,
                },
            }),
            providesTags: (result) => [
                ...(result?.comments || []).map<{
                    type: "Comment"
                    id: string
                }>((c) => ({
                    type: "Comment",
                    id: c.id,
                })),
                {
                    type: "Comment",
                    id: "LIST",
                },
            ],
        }),
        getComment: builder.query<CommentResponse, string>({
            query: (id) => ({ url: `/comment/${id}` }),
            providesTags: (result) => [
                {
                    type: "Comment",
                    id: result?.id,
                },
            ],
        }),
    }),
})

export const {
    useGetBasicSiteInfoQuery,
    useGetCurrentUserQuery,
    useLoginMutation,
    useLogoutMutation,
    usePostCommentMutation,
    useListCommentsQuery,
    useGetCommentQuery,
} = api
export default api
