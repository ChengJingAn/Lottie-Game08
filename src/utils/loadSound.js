import {prePathUrl} from "../components/CommonFunctions"

const loadSound = (name, isEffectSound = false) => {
    // let prePath = prePathUrl()
    console.log(prePathUrl)
    return new Audio(  prePathUrl() + "sounds/" + (isEffectSound ? "effect/" :"") + name + ".mp3")
}

export default loadSound