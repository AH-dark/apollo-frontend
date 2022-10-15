export default interface AppResponse<T = any> {
    code: number
    message: string
    data: T
}
