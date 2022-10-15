import React, { useEffect } from "react"
import styles from "./loadbar.module.scss"
import api from "@/middleware/api"

const LoadBar: React.FC = () => {
    const [hidden, setHidden] = React.useState(true)

    useEffect(() => {
        api.interceptors.request.use((request) => {
            setHidden(false)
            return request
        })

        api.interceptors.response.use((response) => {
            setHidden(true)
            return response
        })
    })

    return (
        <div className={styles.loadBar} data-hidden={hidden}>
            <div className={styles.line}>
                <div className={styles.subline} data-num={"1"} />
                <div className={styles.subline} data-num={"2"} />
            </div>
        </div>
    )
}

export default LoadBar
