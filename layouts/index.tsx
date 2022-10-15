import React from "react"
import Footer from "@/layouts/footer"

const Layouts: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div className={"max-w-lg container m-auto min-h-screen flex flex-col"}>
            <main className={"py-2 px-4 sm:px-2 flex-grow"}>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default Layouts
