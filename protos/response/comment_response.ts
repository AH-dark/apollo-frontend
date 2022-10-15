export default interface CommentResponse {
    id: string
    author_name: string | null
    author_email: string | null
    content: string
    created_at: Date
    reply: string | null
    replied_at: Date | null
}
