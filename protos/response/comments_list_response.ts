import CommentResponse from "@/protos/response/comment_response"

export default interface CommentsListResponse {
    comments: CommentResponse[]
    total: number
    before: Date
}
