import type { NextPage } from "next"
import Layouts from "@/layouts"
import React, { useEffect } from "react"
import { useDispatch } from "@/store"
import { useGetBasicSiteInfoQuery } from "@/services/api"
import { setTitle } from "@reducers/view"
import { useRouter } from "next/router"
import CommentsList from "@components/CommentsList"

const Home: NextPage = () => {
    const dispatch = useDispatch()
    const { data: siteConfig, isLoading } = useGetBasicSiteInfoQuery()

    useEffect(() => {
        dispatch(setTitle("Home"))
    }, [dispatch])

    const router = useRouter()

    return (
        <div>
            <Layouts>
                <a
                    href={"/submit"}
                    className="block p-8 mt-16 mb-32 sm:mt-24 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-row items-center"
                    style={{
                        minHeight: 160,
                    }}
                    onClick={(e) => {
                        e.preventDefault()
                        router.push("/submit")
                    }}
                >
                    {isLoading ? (
                        <div className="text-md text-gray-800 dark:text-white text-center w-full">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-slate-200 rounded"></div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-md text-gray-800 dark:text-white text-center w-full">
                            <h2>{siteConfig?.settings.comment_title}</h2>
                        </div>
                    )}
                </a>
                <CommentsList />
                <div className={"w-full mt-6"} />
            </Layouts>
        </div>
    )
}

export default Home
