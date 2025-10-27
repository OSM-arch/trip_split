import {Link} from "react-router-dom";

export default function ForgotPassword() {
    return (
        <>
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="flex items-center p-4 pb-2 justify-between bg-background-light dark:bg-background-dark">
                    <div
                        className="text-text-light dark:text-text-dark flex size-12 shrink-0 items-center justify-center">
                        <span className="material-symbols-outlined"><Link to="/login">arrow_back</Link></span>
                    </div>
                    <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Forgot
                        Password</h2>
                    <div className="size-12"></div>
                </div>
                <div className="flex flex-col px-4 pt-6 pb-3">
                    <h1 className="text-text-light dark:text-text-dark tracking-tight text-3xl font-bold leading-tight text-left">Reset
                        Your Password</h1>
                </div>
                <div className="px-4 pb-3">
                    <p className="text-text-light dark:text-text-dark text-base font-normal leading-normal">Enter your
                        email address below, and we'll send you a link to reset your password.</p>
                </div>
                <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Email</p>
                        <div className="flex w-full flex-1 items-stretch rounded-lg">
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark p-[15px] text-base font-normal leading-normal"
                                placeholder="you@example.com" value=""/>
                        </div>
                    </label>
                </div>
                <div className="flex px-4 py-3 justify-center mt-4">
                    <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">Reset Password</span>
                    </button>
                </div>
            </div>
        </>
    )
}