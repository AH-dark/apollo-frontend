import React from "react"
import type CommentResponse from "@/protos/response/comment_response"
import dayjs from "dayjs"
import styles from "./card.module.scss"

export interface CardProps {
    comment: CommentResponse
}

const Card: React.FC<CardProps> = ({ comment }) => {
    return (
        <a href={`/comment/${comment.id}`} className={styles.card}>
            <div className={styles.part}>
                <div className={styles.col}>
                    <div className={styles.content}>{comment.content}</div>
                    <div className={styles.footer}>
                        Asked on{" "}
                        {dayjs(comment.created_at).format(
                            "YYYY-MM-DD HH:mm:ss"
                        )}
                    </div>
                </div>
            </div>
        </a>
    )
}

export default Card
