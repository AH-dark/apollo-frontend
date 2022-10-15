import { NextPage } from "next"
import Layouts from "@/layouts"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import { useGetCommentQuery } from "@/services/api"
import dayjs from "dayjs"
import MD5 from "@/util/md5"
import CommentsList from "@components/CommentsList"
import { useDispatch } from "@/store"
import { setTitle } from "@reducers/view"

const Comment: NextPage = () => {
    const { slug } = useRouter().query
    const commentId = useMemo(() => {
        if (typeof slug === "string") {
            return slug
        }

        if (Array.isArray(slug)) {
            return slug[0]
        }

        return ""
    }, [slug])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setTitle("Comment " + commentId))
    }, [dispatch])

    const { data, isLoading } = useGetCommentQuery(commentId)

    return (
        <Layouts>
            <div className="block p-6 w-full flex flex-col mt-16 sm:mt-24 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                {isLoading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <>
                        {data?.author_email && data?.author_name && (
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={`https://www.gravatar.com/avatar/${
                                            data?.author_email
                                                ? MD5(data?.author_email)
                                                : ""
                                        }?s=200&d=mp`}
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {data?.author_name}
                                    </p>
                                    <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                        <time dateTime="2020-03-16 01:00:00">
                                            {dayjs(data?.created_at).format(
                                                "YYYY-MM-DD HH:mm:ss"
                                            )}
                                        </time>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div
                            className={
                                "flex flex-col justify-center w-full h-full flex-grow"
                            }
                            style={{ minHeight: 140 }}
                        >
                            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white text-center">
                                {data?.content}
                            </h5>
                        </div>
                    </>
                )}
            </div>

            <div className="block p-6 w-full flex flex-col mt-8 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                {isLoading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <>
                        {data?.reply && (
                            <div
                                className="flex flex-col justify-center w-full h-full flex-grow"
                                style={{ minHeight: 80 }}
                            >
                                <p className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white text-center">
                                    {data?.reply}
                                </p>
                            </div>
                        )}
                        {data?.replied_at && (
                            <div className="flex items-center justify-center">
                                <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                    Replied at{" "}
                                    <time
                                        dateTime="2020-03-16 01:00:00"
                                        className={"ml-1"}
                                    >
                                        {dayjs(data?.replied_at).format(
                                            "YYYY-MM-DD HH:mm:ss"
                                        )}
                                    </time>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className={"my-24"} />
            <CommentsList />
            <div className={"my-8"} />
        </Layouts>
    )
}

export default Comment
