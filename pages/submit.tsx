import { NextPage } from "next"
import Layouts from "@/layouts"
import { useGetBasicSiteInfoQuery } from "@/services/api"
import CommentForm from "@components/CommentForm"

const Submit: NextPage = () => {
    const { data: siteConfig, isLoading } = useGetBasicSiteInfoQuery()

    return (
        <Layouts>
            <div className="block p-6 w-full flex flex-col mt-16 sm:mt-24 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col justify-center w-full h-full flex-grow">
                    <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white text-center">
                        {isLoading ? (
                            <div className="text-md text-gray-800 dark:text-white text-center w-full">
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        ) : (
                            siteConfig?.settings.comment_title
                        )}
                    </h5>
                    <hr className={"my-4"} />
                    <CommentForm />
                </div>
            </div>
        </Layouts>
    )
}

export default Submit
