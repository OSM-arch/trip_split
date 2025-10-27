import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {formValidator} from "@/utils/formValidator.js";
import {AlertField} from "@/components/ui/alert.jsx";
import {signUp} from "@/services/signUp.js";
import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import {visibilityToggle} from "@/utils/VisibilityToggle.js";
import LoadingToaster from "@/components/ui/loadingToaster.jsx";
import bcrypt from "bcryptjs";
import {isEmailUsed} from "@/services/isEmailUsed.js";

export default function SignUp() {
    const naviget = useNavigate();

    // ===============================
    // 🔹 Selectors
    // ===============================
    const user = useSelector(userSelector);
    const [isSuccess, setIsSuccess] = useState(false);

    // ===============================
    // 🔹 States
    // ===============================
    const [error, setError] = useState(null);

    // ===============================
    // 🔹 Refs
    // ===============================
    const fullnameRef = useRef(null);
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
    }, [naviget, user.user]);

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
            {fullname: fullnameRef.current.value},
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
          Check if the Email is not already used
        */
        const {data, error: existingEmail} = await isEmailUsed(emailRef.current.value);

        console.log(data, existingEmail);
        if (existingEmail) {
            setError([existingEmail.message].map((err) => {
                return <div key={0} id="0"><AlertField index={0} setState={setError} description={err} /></div>
            }));
            return;
        }

        if (data) {
            setError([""].map(() => {
                return <div key={0} id="0"><AlertField index={0} setState={setError} description='Email already exists' /></div>
            }));
            return;
        }

        /*
          Handle Form Success
          - Auth verification
        */
        const hashedPassword = await bcrypt.hash(passwordRef.current.value, 10);
        const {error: signUpError} = await signUp(emailRef.current.value, passwordRef.current.value, fullnameRef.current.value, hashedPassword);

        if (signUpError) {
            setError([signUpError.message].map(err => {
                return <div key={0} id="0"><AlertField index={0} setState={setError} description={err} /></div>
            }));
            return;
        }

        setIsSuccess(true);
    }

    return (
        <>
            <div
                className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden p-4">

                {isSuccess === true ? <div className='absolute bottom-[1%] right-[1%] w-max bg-gray'><LoadingToaster type='signup' /></div> : ""}

                <div className="absolute bottom-[1%] right-[1%] w-max flex flex-col gap-2">
                    {error !== null ? error.map((err) => err) : ""}
                </div>

                <div className="w-full max-w-md">
                    <h1 className="text-text-light dark:text-text-dark tracking-light text-[32px] font-bold leading-tight text-center pb-3 pt-6">
                        Welcome to Commute Share!
                    </h1>
                    <p className="text-text-light/80 dark:text-text-dark/80 text-center text-lg mb-8">Join your
                        community and start sharing rides.</p>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Full
                                Name</p>
                            <input
                                ref={fullnameRef}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark p-[15px] text-base font-normal leading-normal"
                                placeholder="Enter your full name"/>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Email</p>
                            <input
                                ref={emailRef}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark p-[15px] text-base font-normal leading-normal"
                                placeholder="Enter your email" type="email"/>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Password</p>
                            <div className="flex w-full flex-1 items-stretch rounded-lg">
                                <input
                                    ref={passwordRef}
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                                    placeholder="Enter your password" type="password"/>
                                <div
                                    onClick={(e) => visibilityToggle(e, passwordRef)}
                                    className="text-placeholder-light dark:text-placeholder-dark flex border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark items-center justify-center pr-[15px] rounded-r-lg border-l-0">
                                    <span className="material-symbols-outlined cursor-pointer">visibility</span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <button
                                onClick={handleSubmit}
                                className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
                                <span className="truncate">Create Account</span>
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-text-light/60 dark:text-text-dark/60 mt-8">
                        Already have an account? <Link className="font-medium text-primary hover:underline"
                                                    to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </>
    )
}