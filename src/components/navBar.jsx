import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import {logout} from "@/services/logout.js";
import {clearAll} from "@/store/features/userSlice.js";
import {persistor} from "@/store/store.js";

export default function NavBar() {

    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const headerRef = useRef(null);

    {/*
        useEffect(() => {
            const handleScroll = () => {
                const scrollY = window.scrollY;
                const scrollPercentage = Math.ceil(scrollY * 100 / (document.body.scrollHeight - window.innerHeight));

                if (scrollPercentage >= 30) {
                    headerRef.current.classList.add('hidden');
                } else {
                    headerRef.current.classList.remove('hidden');
                }
            }

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, []);
        */
    }

    const handleLogout = async () => {
        const is_error = await logout();

        if (!is_error) {
            dispatch(clearAll());
            await persistor.purge();
        }
    }

    return (
        <header className="w-full" ref={headerRef}>
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
                {/*<div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">TripSplit</span>
                        <img src="/navLogo.png" alt=""
                             className="h-8 w-auto transform scale-[3] sm:scale-[3] md:scale-[4] lg:scale-[5]"/>
                    </Link>
                </div>*/}
                <div className="flex lg:flex-1 flex-row justify-left items-center">
                    <img src="/logo.svg" alt="trip split logo"
                         className=""/>
                    <span className="text-[#1F2937] font-extrabold tracking-wider">TRIP<span className="text-[#2563EB]">SPLIT</span></span>
                </div>
                <div className="flex lg:hidden">
                    <button type="button" command="show-modal" commandfor="mobile-menu"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400">
                        <span className="sr-only">Open main menu</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon"
                             aria-hidden="true" className="size-6">
                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                {/* Appear only if the user is login */}
                <el-popover-group className="hidden lg:flex lg:gap-x-12 text-[#1F2937]">
                    <a href="#Community" className="text-sm/12 font-semibold">Community</a>
                    <a href="#works" className="text-sm/12 font-semibold">How It Works</a>
                    <a href="#joinus" className="text-sm/12 font-semibold">Join Us</a>
                    {
                        user.user === null ? <div className="hidden lg:flex lg:gap-x-12"></div> :
                            <Link to="/user_dashboard" className="text-sm/12 font-semibold">Dashboard</Link>
                    }
                </el-popover-group>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {user.user === null ?
                        <Link to="/login"
                              className="flex w-full sm:w-auto items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-wide transition-colors hover:bg-primary/90 text-sm/6 font-semibold">
                            login <span
                                aria-hidden="true" className="ml-1"> &rarr;</span>
                        </Link> :
                        <button onClick={handleLogout}
                           className="flex w-full sm:w-auto items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-wide transition-colors hover:bg-primary/90 text-sm/6 font-semibold">Log
                            out</button>
                    }
                </div>
            </nav>
            <el-dialog>
                <dialog id="mobile-menu" className="backdrop:bg-transparent lg:hidden">
                    <div tabIndex="0" className="fixed inset-0 focus:outline-none">
                        <el-dialog-panel
                            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <img src="/logo.svg" alt="trip split logo"
                                         className=""/>
                                    <span className="text-[#1F2937] font-extrabold tracking-wider">TRIP<span className="text-[#2563EB]">SPLIT</span></span>
                                </a>
                                <button type="button" command="close" commandfor="mobile-menu"
                                        className="-m-2.5 rounded-md p-2.5 text-gray-400">
                                    <span className="sr-only">Close menu</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                         data-slot="icon" aria-hidden="true" className="size-6">
                                        <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-white/10">

                                    {/* Appear only if the user is login */}
                                    {
                                        user.user === null ? <div className="space-y-2 py-6"></div> : <div className="space-y-2 py-6">
                                            <Link to="/user_dashboard" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">Dashboard</Link>
                                        </div>
                                    }

                                    <div className="py-6">
                                        {user.user === null ?
                                            <Link to="/login" className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5">login</Link> :
                                            <div onClick={handleLogout}
                                                    className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5">Log
                                                out</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </el-dialog-panel>
                    </div>
                </dialog>
            </el-dialog>
        </header>
    )
}