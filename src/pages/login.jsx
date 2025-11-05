import {Link, useNavigate} from "react-router-dom";
import {visibilityToggle} from "@/utils/VisibilityToggle.js";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import {formValidator} from "@/utils/formValidator.js";
import {AlertField} from "@/components/ui/alert.jsx";
import {login} from "@/services/login.js";
import LoadingToaster from "@/components/ui/loadingToaster.jsx";

export default function Login() {
    const naviget = useNavigate();

    // ===============================
    // 🔹 Selectors
    // ===============================
    const user = useSelector(userSelector);

    // ===============================
    // 🔹 States
    // ===============================
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    // ===============================
    // 🔹 Refs
    // ===============================
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // ===============================
    // 🔹 Hooks
    // ===============================
    useEffect(() => {
        setIsSuccess(false);
        if (user.user !== null) {
            naviget('/');
        }
    }, []);

    // ===============================
    // 🔹 Methods
    // ===============================
    const handleSubmit = async () => {
        /*
          Validate form inputs using formValidator(data: Array) this method returns:
            -Case of Error: Error Array
            -Case of Success: Null
        */
        const res = formValidator([
            {email: emailRef.current.value},
            {password: passwordRef.current.value}
        ]);

        setError(null);

        /*
          Handle Form Error
        */
        if (res !== null) {

            let keys = [];
            res.map(item => {
                keys.push(Object.keys(item)[0]);
            });

            let i = -1;
            setError(res.map(obj => {
                i = i+1;
                return <div key={i} id={i}><AlertField index={i} setState={setError} description={obj[keys[i]]} /></div>
            }));
            return;
        }

        /*
          Handle Form Success
          - Auth verification
        */
        const {error: loginError} = await login(emailRef.current.value, passwordRef.current.value);

        if (loginError) {
            setError([loginError.message].map(err => {
                return <div key={0} id="0"><AlertField index={0} setState={setError} description={err} /></div>
            }));
            return;
        }

        setIsSuccess(true);
    }

    return (
        <>
            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">

                {isSuccess === true ? <div className='absolute bottom-[1%] right-[1%] w-max bg-gray'><LoadingToaster type='login' /></div> : ""}

                <div className="absolute bottom-[1%] right-[1%] w-max flex flex-col gap-2">
                    {error !== null ? error.map((err) => err) : ""}
                </div>

                <div className="w-full max-w-md p-6">
                    <div className="flex w-full justify-center mb-6">
                        <div
                            className="flex items-center justify-center w-16 h-16 bg-primary/20 dark:bg-primary/30 rounded-full">
                            <span className="material-symbols-outlined text-primary text-4xl">directions_car</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-center mb-2">Welcome Back!</h1>
                    <p className="text-center text-text-light/80 dark:text-text-dark/80 mb-8">Login to continue your
                        journey.</p>
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-2" htmlFor="email">Email</label>
                            <div className="relative">
                                <span
                                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-light/50 dark:text-text-dark/50">mail</span>
                                <input
                                    ref={emailRef}
                                    className="w-full rounded-lg border-none bg-white dark:bg-background-dark/50 py-4 pl-12 pr-4 placeholder:text-text-light/50 dark:placeholder:text-text-dark/50 focus:ring-2 focus:ring-primary"
                                    id="email" placeholder="Enter your email" type="email"/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-2" htmlFor="password">Password</label>
                            <div className="relative">
                                <span
                                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-light/50 dark:text-text-dark/50">lock</span>
                                <input
                                    autoComplete="off"
                                    ref={passwordRef}
                                    className="w-full rounded-lg border-none bg-white dark:bg-background-dark/50 py-4 pl-12 pr-12 placeholder:text-text-light/50 dark:placeholder:text-text-dark/50 focus:ring-2 focus:ring-primary"
                                    id="password" placeholder="Enter your password" type="password"/>
                                <button
                                    onClick={(e) => visibilityToggle(e, passwordRef)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light/50 dark:text-text-dark/50"
                                    type="button">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </div>
                            <Link className="text-sm text-primary hover:underline self-end mt-2"
                               to="/forgot_password">Forgot Password?</Link>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-primary text-white font-bold py-4 rounded-lg mt-8 hover:bg-primary/90 transition-colors duration-300">
                        <span>Login</span>
                    </button>
                    <p className="text-center text-sm text-text-light/80 dark:text-text-dark/80 mt-8">
                        Don't have an account? <Link className="font-semibold text-primary hover:underline"
                                                  to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    )
}