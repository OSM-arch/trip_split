import {supabase} from "@/services/supabaseClient.js";

export default async function uploadImage(image, storage) {
    const originalName = image.name;
    const safeName = sanitizeFileName(originalName);
    const imagePath = `${Date.now()}_${safeName}`;

    const {error: uploadError} = await supabase.storage.from(storage).upload(imagePath, image);
    if (uploadError) {
        console.log("Uploading Error: ", uploadError.message);
        return {data: "", error: uploadError}
    }

    const {data, error: getUrlError} = await supabase.storage.from(storage).getPublicUrl(imagePath);
    if (getUrlError) {
        console.log("Public Url Error: ", getUrlError.message);
        return {data: "", error: getUrlError}
    }

    return {data, error: null}
}

function sanitizeFileName(fileName) {
    return fileName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9-_.]/g, "_");
}