import axios from "axios"

const baseURL = "/api/"

const getBaseURL = () => {
    if (process.env.NODE_ENV === "development") {
        return (
            (process.env.NEXT_PUBLIC_DEVELOPMENT_ENDPOINT ||
                "http://localhost:8080") + baseURL
        )
    }

    return process.env.NEXT_PUBLIC_ENDPOINT || baseURL
}

const instance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})
if (process.env.NODE_ENV === "development") {
    instance.interceptors.request.use(
        (request) => {
            console.log("Starting Request:", request)

            return request
        },
        (error) => {
            console.error("Request Error:", error)

            return error
        }
    )
    instance.interceptors.response.use(
        (response) => {
            console.log("Response:", response)

            return response
        },
        (error) => {
            console.error("Response Error:", error)

            return error
        }
    )
}

export default instance
