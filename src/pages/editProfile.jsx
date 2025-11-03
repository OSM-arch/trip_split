import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import {useEffect, useRef, useState} from "react";
import {AlertField} from "@/components/ui/alert.jsx";
import updateUser from "@/services/updateUser.js";
import insertCar from "@/services/insertCar.js";
import uploadImage from "@/services/uploadImage.js";

export default function EditProfile({setIsOpen}) {
    
    const user = useSelector(userSelector);

    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [profilePreview, setProfilePreview] = useState(null);
    const [preview, setPreview] = useState(null);
    const [carImage, setCarImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const fullnameRef = useRef(null);
    const genderRef = useRef(null);
    const organizationRef = useRef(null);
    const modelRef = useRef(null);
    const carImageRef = useRef(null);
    const profileImageRef = useRef(null);
    const plateRef = useRef(null);
    const seatsRef = useRef(null);

    useEffect(() => {
        if (isSuccess === true) {
            setIsOpen(false);
        }
    }, [isSuccess, setIsOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSuccess(false);

        let inError = null;

        const fullname = fullnameRef.current.value.trim();
        const gender = genderRef.current.value;
        const organization = organizationRef.current.value;
        const model = modelRef.current.value.trim();
        const profile = profileImage;
        const image = carImage;
        let url = "";
        const plate = plateRef.current.value;
        const seats = seatsRef.current.value;

        if (!fullname) {
            setError([""].map(() => {
                return <div key={0} id="0"><AlertField index={0} setState={setError} description="Fullname Required!" /></div>
            }));
            return;
        }

        if (profileImage) {
            const {data: imageUrl, error: uploadError} = await uploadImage(profile, 'profile_photos');
            if (uploadError) {
                setError([""].map(() => {
                    return <div key={0} id="0"><AlertField index={0} setState={setError} description="Failed to upload the profile image. Please try again." /></div>
                }));
                return;
            }

            url = imageUrl.publicUrl;

            if (gender.length > 0 || organization.length > 0 || url.length > 0) {
                inError = await updateUser([{gender: gender, organization: organization, photo_url: url}], user.user.id);

                if (inError?.length > 0) {
                    setError([""].map(() => {
                        return <div key={0} id="0"><AlertField index={0} setState={setError} description="Could not save your changes. Please check your connection and try again." /></div>
                    }));
                    return;
                }
            }
        }



        if (image) {
            const {data: imageUrl, error: uploadError} = await uploadImage(image, 'car_photos');
            if (uploadError) {
                setError([""].map(() => {
                    return <div key={0} id="0"><AlertField index={0} setState={setError} description="Failed to upload the image. Please try again." /></div>
                }));
                return;
            }

            url = imageUrl.publicUrl;

            if (model.length > 0 || plate.length > 0 || seats.length > 0 || url.length > 0) {
                inError = await insertCar([{
                    model: model,
                    license_plate: plate,
                    seats: seats,
                    photo_url: url,
                    user_id: user.user.id
                }], user.user.id);

                if (inError) {
                    setError([""].map(() => {
                        return <div key={0} id="0"><AlertField index={0} setState={setError} description="Could not save your changes. Please check your connection and try again." /></div>
                    }));
                    return;
                }
            }
        }

        setIsSuccess(true);

    }

    const handleProfileImageChange =  () => {
        const image = profileImageRef.current.files[0];

        if (image) {
            const imageUrl = URL.createObjectURL(image);
            setProfilePreview(imageUrl);
            setProfileImage(image);
        }
    }

    const handleCarImageChange = () => {
        const image = carImageRef.current.files[0];

        if (image) {
            const imageUrl = URL.createObjectURL(image);
            setPreview(imageUrl);
            setCarImage(image);
        }
    }

    return (
        <>
            <div
                className="relative flex min-h-screen w-full flex-col items-center justify-start p-4 sm:justify-center sm:p-6">

                <div className="absolute bottom-[1%] right-[1%] w-max flex flex-col gap-2">
                    {error !== null ? error.map((err) => err) : ""}
                </div>

                <div className="w-full max-w-2xl rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-lg sm:p-8">
                    <div className="text-center mb-8">
                        <h1 className="font-heading text-2xl font-bold text-body-text-light dark:text-body-text-dark sm:text-3xl">Edit
                            Profile</h1>
                        <p className="mt-2 text-base text-neutral-text-light dark:text-neutral-text-dark">Update your
                            personal and vehicle information.</p>
                    </div>
                    <form>
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-heading text-lg font-semibold leading-tight tracking-tight text-body-text-light dark:text-body-text-dark">User
                                    Information</h3>
                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block text-sm font-medium text-body-text-light dark:text-body-text-dark"
                                            htmlFor="full-name">Full Name</label>
                                        <div className="mt-2">
                                            <input
                                                ref={fullnameRef}
                                                className="form-input block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-3 px-4 shadow-sm focus:border-primary focus:ring-primary text-sm"
                                                id="full-name" name="full-name" type="text" defaultValue={user.userData?.full_name}/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block text-sm font-medium text-body-text-light dark:text-body-text-dark"
                                            htmlFor="email">Email</label>
                                        <div className="mt-2">
                                            <input
                                                className="form-input block w-full rounded-lg border-border-light dark:border-border-dark bg-gray-100 dark:bg-slate-700/50 py-3 px-4 text-neutral-text-light dark:text-neutral-text-dark shadow-sm cursor-not-allowed text-sm"
                                                disabled={true} id="email" name="email" type="email"
                                                defaultValue={user.userData?.email}/>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-body-text-light dark:text-body-text-dark"
                                            htmlFor="gender">Gender</label>
                                        <div className="mt-2">
                                            <select
                                                ref={genderRef}
                                                defaultValue={user.userData?.gender}
                                                className="form-select block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-3 px-4 shadow-sm focus:border-primary focus:ring-primary text-sm"
                                                id="gender" name="gender">
                                                <option value="">Prefer not to say</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-body-text-light dark:text-body-text-dark"
                                            htmlFor="organization">Organization</label>
                                        <div className="mt-2">
                                            <input
                                                ref={organizationRef}
                                                className="form-input block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-3 px-4 shadow-sm focus:border-primary focus:ring-primary text-sm"
                                                id="organization" name="organization" type="text"
                                                defaultValue={user.userData?.organization}/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block text-sm font-medium text-body-text-light dark:text-body-text-dark"
                                            htmlFor="profile-image">Profile Image</label>
                                        <div className="mt-2 flex items-center gap-x-4">
                                            <div
                                                className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                                                <img
                                                    alt="Profile preview"
                                                    className="h-full w-full object-cover"
                                                    src={
                                                        profilePreview
                                                            ? profilePreview
                                                            : user.userData?.photo_url
                                                                ? user.userData.photo_url
                                                                : "/defaultUser.png"
                                                    }
                                                />
                                            </div>
                                            <label
                                                className="relative cursor-pointer rounded-lg font-semibold text-primary hover:text-primary/90"
                                                htmlFor="profile-image-upload">
                                                <span>Upload Profile Image</span>
                                                <input onChange={handleProfileImageChange} ref={profileImageRef} className="sr-only" id="profile-image-upload" name="profile-image-upload"
                                                       type="file"/>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-border-light dark:border-border-dark"></div>
                            <div>
                                <h3 className="font-heading text-lg font-semibold leading-tight tracking-tight text-body-text-light dark:text-body-text-dark">Car
                                    Information</h3>
                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-body-text-light dark:text-body-text-dark"
                                            htmlFor="car-model">Car Model</label>
                                        <div className="mt-2">
                                            <input
                                                ref={modelRef}
                                                className="form-input block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-3 px-4 shadow-sm focus:border-primary focus:ring-primary text-sm"
                                                id="car-model" name="car-model" type="text" defaultValue={user.car[0]?.model}/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block text-sm font-medium text-body-text-light dark:text-body-text-dark"
                                            htmlFor="car-image">Car Image</label>
                                        <div className="mt-2 flex items-center gap-x-4">
                                            <div
                                                className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                                                <img
                                                    alt="Car preview"
                                                    className="h-full w-full object-cover"
                                                    src={
                                                        preview
                                                            ? preview
                                                            : user.car[0]?.photo_url
                                                                ? user.car[0].photo_url
                                                                : "/defaultCar.jpeg"
                                                    }
                                                />
                                            </div>
                                            <label
                                                className="relative cursor-pointer rounded-lg font-semibold text-primary hover:text-primary/90"
                                                htmlFor="car-image-upload">
                                                <span>Upload Car Image</span>
                                                <input onChange={handleCarImageChange} ref={carImageRef} className="sr-only" id="car-image-upload" name="car-image-upload"
                                                       type="file"/>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-body-text-light dark:text-body-text-dark"
                                            htmlFor="license-plate">License Plate</label>
                                        <div className="mt-2">
                                            <input
                                                ref={plateRef}
                                                className="form-input block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-3 px-4 shadow-sm focus:border-primary focus:ring-primary text-sm"
                                                id="license-plate" name="license-plate" type="text"
                                                defaultValue={user.car[0]?.license_plate}/>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-body-text-light dark:text-body-text-dark"
                                            htmlFor="seats">Number of Seats</label>
                                        <div className="mt-2">
                                            <input
                                                ref={seatsRef}
                                                className="form-input block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-3 px-4 shadow-sm focus:border-primary focus:ring-primary text-sm"
                                                id="seats" name="seats" type="number" defaultValue={user.car[0]?.seats}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="font-semibold text-neutral-text-light dark:text-neutral-text-dark hover:text-body-text-light dark:hover:text-body-text-dark"
                                type="button">Cancel
                            </button>
                            <button
                                onClick={(e) => handleSubmit(e)}
                                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
                                type="submit">Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}