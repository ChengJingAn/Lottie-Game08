import {prePathUrl} from "../components/CommonFunctions"

export default async function loadJson(url) {
    const jsonData = await fetch(prePathUrl() + 'lottieFiles/' + url)
        .then((r) => r.json())
        .then((data) => {
            return data;
        })
    return jsonData
}
