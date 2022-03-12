export default async function loadSvg(url) {
    const jsonData = await fetch('./images/' + url)
        .then((data) => {
            return data;
        })
    return jsonData
}
