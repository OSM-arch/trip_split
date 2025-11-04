import NavBar from "@/components/navBar.jsx";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";

export default function HomePage() {

    const user = useSelector(userSelector);

    return (
        <>
            <NavBar />
            <div className="relative flex h-auto min-h-screen w-full lg:px-14 lg:mt-2 flex-col group/design-root overflow-x-hidden">
                {/* !--Hero Section -- */}
                <div className="bg-cover bg-center min-h-screen w-full h-96 rounded flex flex-col justify-center items-start lg:px-5"
                     style={{ backgroundImage: `url('/homePage.jpg')` }}>
                    <div
                        className="flex flex-col gap-8 px-4 @[480px]:gap-12 @[864px]:flex-row @[864px]:items-center @[864px]:py-24">
                        <div className="flex flex-col gap-6 @[480px]:gap-8 @[864px]:w-1/2 @[864px]:justify-center">
                            <div className="flex flex-col gap-4 text-center lg:text-left">
                                <h1 className="text-text-light dark:text-text-dark text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight @[480px]:text-5xl @[864px]:text-6xl">
                                    Share the Ride, Split <span className="lg:block lg:pt-2">the Cost</span>
                                </h1>
                                <h2 className="text-text-light/80 dark:text-text-dark/80 text-lg font-normal leading-normal @[480px]:text-xl lg:text-xl/6">
                                    Connect with members of your community to share rides, save money, reduce your
                                    <span className="lg:block"> carbon footprint, and build a stronger community.</span>
                                </h2>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to={`${user.user === null ? "/signup" : "/find_ride"}`}>
                                    <button
                                        className="flex w-full sm:w-auto items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-wide transition-colors hover:bg-primary/90">
                                        <span>Find a Ride</span>
                                    </button>
                                </Link>

                                <Link to={`${user.user === null ? "/signup" : "/offer_ride"}`}>
                                    <button
                                        className="flex w-full sm:w-auto items-center justify-center rounded-lg h-12 px-6 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark text-base font-bold leading-normal tracking-wide transition-colors hover:bg-gray-300 dark:hover:bg-gray-600">
                                        <span>Offer a Ride</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Project Description Section --> */}
                <div id="Community" className="bg-white dark:bg-background-dark/50 py-16 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-text-light dark:text-text-dark sm:text-4xl">
                            Your Community Carpooling Solution
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-text-light/80 dark:text-text-dark/80">
                            Our platform makes it easy to connect with verified members of your local community. Share
                            rides to work, school, or events. Save money on gas, reduce traffic congestion, and
                            contribute to a greener planet, one ride at a time.
                        </p>
                    </div>
                </div>
                {/* <!-- How It Works Section --> */}
                <div id="works" className="flex flex-col gap-10 px-4 py-16 @container sm:py-24">
                    <div className="flex flex-col gap-4 text-center">
                        <h1 className="text-text-light dark:text-text-dark tracking-tight text-3xl font-bold leading-tight @[480px]:text-4xl @[480px]:font-extrabold max-w-2xl mx-auto">
                            How It Works
                        </h1>
                        <p className="text-text-light/80 dark:text-text-dark/80 text-lg font-normal leading-normal max-w-2xl mx-auto">
                            Getting started is simple. Follow these three easy steps to begin your carpooling journey.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <div
                            className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark/50 p-6 text-center items-center">
                            <div
                                className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined !text-3xl">search</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight">Search</h2>
                                <p className="text-text-light/70 dark:text-text-dark/70 text-base font-normal leading-normal">Find
                                    rides that match your schedule and destination with our powerful search tools.</p>
                            </div>
                        </div>
                        <div
                            className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark/50 p-6 text-center items-center">
                            <div
                                className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined !text-3xl">group</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight">Connect</h2>
                                <p className="text-text-light/70 dark:text-text-dark/70 text-base font-normal leading-normal">Connect
                                    with verified drivers and passengers from your local community safely.</p>
                            </div>
                        </div>
                        <div
                            className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark/50 p-6 text-center items-center">
                            <div
                                className="flex items-center justify-center h-12 w-12 rounded-full bg-highlight/10 text-highlight">
                                <span className="material-symbols-outlined !text-3xl">directions_car</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight">Ride</h2>
                                <p className="text-text-light/70 dark:text-text-dark/70 text-base font-normal leading-normal">Share
                                    the journey, split the costs, and enjoy a more sustainable commute.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- CTA Section --> */}
                <div id="joinus" className="@container bg-primary/5 dark:bg-primary/10">
                    <div
                        className="flex flex-col items-center gap-6 px-4 py-16 text-center @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-text-light dark:text-text-dark tracking-tight text-3xl font-extrabold leading-tight @[480px]:text-4xl max-w-2xl">
                                Ready to Join the Community?
                            </h1>
                            <p className="text-text-light/80 dark:text-text-dark/80 text-lg font-normal leading-normal max-w-2xl">
                                Sign up today and start making a difference. It's free, easy, and good for the planet.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <Link to="/signup">
                                <button
                                    className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-wide transition-colors hover:bg-primary/90">
                                <span className="truncate">Get Started Now</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <footer
                    className="flex flex-col gap-8 px-5 py-12 text-center @container bg-white dark:bg-background-dark/50">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 @[480px]:justify-center">
                        <a className="text-text-light/70 dark:text-text-dark/70 text-base font-medium leading-normal hover:text-primary dark:hover:text-primary"
                           href="#">About</a>
                        <a className="text-text-light/70 dark:text-text-dark/70 text-base font-medium leading-normal hover:text-primary dark:hover:text-primary"
                           href="#">Contact</a>
                        <a className="text-text-light/70 dark:text-text-dark/70 text-base font-medium leading-normal hover:text-primary dark:hover:text-primary"
                           href="#">Privacy Policy</a>
                        <a className="text-text-light/70 dark:text-text-dark/70 text-base font-medium leading-normal hover:text-primary dark:hover:text-primary"
                           href="#">Terms of Service</a>
                    </div>
                    <div className="flex justify-center gap-6">
                        <a className="text-text-light/60 dark:text-text-dark/60 hover:text-primary dark:hover:text-primary"
                           href="#">
                            <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path clipRule="evenodd"
                                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                      fillRule="evenodd"></path>
                            </svg>
                        </a>
                        <a className="text-text-light/60 dark:text-text-dark/60 hover:text-primary dark:hover:text-primary"
                           href="#">
                            <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                        </a>
                        <a className="text-text-light/60 dark:text-text-dark/60 hover:text-primary dark:hover:text-primary"
                           href="#">
                            <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path clipRule="evenodd"
                                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.465c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7.167a4.833 4.833 0 100 9.666 4.833 4.833 0 000-9.666zM12 15a3 3 0 110-6 3 3 0 010 6zm4.833-8.25a1.167 1.167 0 100-2.333 1.167 1.167 0 000 2.333z"
                                      fillRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                    <p className="text-text-light/60 dark:text-text-dark/60 text-base font-normal leading-normal">© 2024
                        Carpool Inc. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}