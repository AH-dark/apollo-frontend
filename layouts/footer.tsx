import React, { useMemo } from "react"
import dayjs from "dayjs"
import config from "@/config"
import { useRouter } from "next/router"

const startYear = 2021

const Footer: React.FC = () => {
    const year = useMemo<string>(() => {
        const now = dayjs()
        if (startYear === now.year()) {
            return startYear.toString()
        }

        return `${startYear} - ${now.year()}`
    }, [])

    const router = useRouter()
    const handleGo = (url: string) => (e: React.MouseEvent) => {
        if (url.startsWith("/") || url.startsWith("#") || url.startsWith("?")) {
            e.preventDefault()
            router.push(url)
            return
        }

        window.open(url, "_blank")
    }

    return (
        <footer className="m-2 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <ul className="flex flex-wrap items-center justify-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 text-center">
                {config.menu.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.url}
                            className="mx-1.5 hover:underline"
                            onClick={handleGo(item.url)}
                            rel={"noopener"}
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
            <span className="text-sm block text-gray-500 dark:text-gray-400 text-center">
                © {year}{" "}
                <a
                    href="https://www.ahdark.com/"
                    className="hover:underline"
                    rel={"noopener"}
                    target={"_blank"}
                >
                    AHdark
                </a>{" "}
                All Rights Reserved.
            </span>
        </footer>
    )
}

export default Footer
