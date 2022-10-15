import { NextPage } from "next"
import Layouts from "@/layouts"
import { Formik } from "formik"
import SubmitCommentPayload from "@/protos/request/submit_comment_payload"
import {
    useGetBasicSiteInfoQuery,
    usePostCommentMutation,
} from "@/services/api"
import { useRouter } from "next/router"
import * as Yup from "yup"

const Submit: NextPage = () => {
    const { data: siteConfig, isLoading } = useGetBasicSiteInfoQuery()
    const [postComment, {}] = usePostCommentMutation()

    const router = useRouter()

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
                    <Formik
                        initialValues={
                            {
                                author_name: null,
                                author_email: null,
                                content: "",
                            } as SubmitCommentPayload
                        }
                        validationSchema={Yup.object().shape({
                            author_name: Yup.string()
                                .nullable()
                                .max(32, "Too Long!"),
                            author_email: Yup.string()
                                .nullable()
                                .email("Invalid email")
                                .max(64, "Too Long!"),
                            content: Yup.string()
                                .required("Required")
                                .min(1, "Too Short!")
                                .max(255, "Too Long!"),
                        })}
                        onSubmit={async (
                            values,
                            { setSubmitting, setErrors }
                        ) => {
                            setSubmitting(true)

                            try {
                                const res = await postComment(values).unwrap()
                                console.log(res)

                                await router.push("/comment/" + res.id)
                            } catch (e) {
                                console.error(e)
                                setErrors({
                                    content: "Failed to submit comment",
                                })
                            }

                            setSubmitting(false)
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                className={"space-y-6"}
                            >
                                <div>
                                    <label
                                        htmlFor="author_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Name (optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="author_name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your name or nickname"
                                        value={values.author_name || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p
                                        className={
                                            "text-sm text-gray-500 dark:text-gray-400"
                                        }
                                    >
                                        {errors.author_name &&
                                            touched.author_name && (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    <span className="font-medium">
                                                        Oh, snapp!
                                                    </span>{" "}
                                                    {errors.author_name}
                                                </p>
                                            )}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        htmlFor="author_email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Email (optional)
                                    </label>
                                    <input
                                        type="email"
                                        id="author_email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your email address"
                                        value={values.author_email || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p
                                        className={
                                            "text-sm text-gray-500 dark:text-gray-400"
                                        }
                                    >
                                        {errors.author_email &&
                                            touched.author_email && (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    <span className="font-medium">
                                                        Oh, snapp!
                                                    </span>{" "}
                                                    {errors.author_email}
                                                </p>
                                            )}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        htmlFor="content"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                    >
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your messages..."
                                        required
                                        value={values.content}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <p
                                        className={
                                            "text-sm text-gray-500 dark:text-gray-400"
                                        }
                                    >
                                        {errors.content && touched.content && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                <span className="font-medium">
                                                    Oh, snapp!
                                                </span>{" "}
                                                {errors.content}
                                            </p>
                                        )}
                                    </p>
                                </div>
                                <button
                                    type={"submit"}
                                    id={"submit"}
                                    className={
                                        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                                    }
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                className="inline mr-3 w-4 h-4 text-white animate-spin"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="#E5E7EB"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>Submit</>
                                    )}
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </Layouts>
    )
}

export default Submit
