import React from "react"
import { useListCommentsQuery } from "@/services/api"
import dayjs from "dayjs"
import Card from "@components/CommentsList/card"

const CommentsList: React.FC = () => {
    const [before, setBefore] = React.useState<number>(dayjs().unix())
    const { data, isSuccess } = useListCommentsQuery({
        before: before,
        pageSize: 10,
    })

    return (
        <div className={"space-y-6"}>
            {isSuccess &&
                Array.from(data?.comments || [])
                    .sort((a, b) => {
                        return (
                            dayjs(b.created_at).unix() -
                            dayjs(a.created_at).unix()
                        )
                    })
                    .map((item, index) => <Card comment={item} key={index} />)}
        </div>
    )
}

export default CommentsList
