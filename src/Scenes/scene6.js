import "../stylesheets/styles.css";

import { useEffect, useState, useRef } from "react";
import Lottie from "react-lottie-segments";

import loadAnimation from '../utils/loadAnimation';
let animationData;
new loadAnimation('Shot_06/SB08_Character-Interactives_surprised.json').then(result => {
    animationData = result;
}, () => { });

import BaseImage from "../components/BaseImage";
import loadSound from "../utils/loadSound";
import {prePathUrl} from "../components/CommonFunctions"

var audioJson = {
    bodyAudio: new loadSound('suprise1')
}

const timerlist = []

export default function IntroScene({ nextFunc, _geo, playBearAni, pauseBearAni, showBear, audioList }) {

    const [stopAni, setStopAni] = useState(false);
    const refText = useRef();
    const refAni = useRef();
    // const baseBack = useRef();

    function clearTimerList(tList, isTotal = false) {
        if (!isTotal)
            for (let i = 0; i < tList.length; i++)
                clearTimeout(timerlist[tList[i]])
        else
            for (let i = 0; i < timerlist.length; i++)
                clearTimeout(timerlist[i])
    }

    useEffect(() => {
        audioList.audioBody.src = prePathUrl() + 'sounds/suprise1.mp3'

        showBear();
        // audioList.audioWoo.play();
        refText.current.style.opacity = '0.0'
        refText.current.style.left = '100%'

        timerlist[0] = setTimeout(() => {
            refText.current.style.transition = '0.4s'
            refText.current.style.opacity = '0.0'
            refText.current.style.transform = 'scale(0.7) translateY(' + _geo.height * -0.08 + 'px)'

            refAni.current.style.transition = '0.4s'
            refAni.current.style.opacity = '0.0'
            refAni.current.style.transform = 'scale(0.7)'
        }, audioJson.bodyAudio.duration * 1000 + 3500);

        timerlist[1] = setTimeout(() => {
            nextFunc();
        }, audioJson.bodyAudio.duration * 1000 + 4000);

        timerlist[2] = setTimeout(() => {
            pauseBearAni();
        }, audioJson.bodyAudio.duration * 1000 + 2000);

        timerlist[3] = setTimeout(() => {
            setStopAni(true)
        }, 1);
        timerlist[4] = setTimeout(() => {
            audioList.audioBody.play();
            playBearAni();

            // baseBack.current.style.opacity = 0;
            // baseBack.current.style.transition = '1.4s';

        }, 2000);

        timerlist[5] = setTimeout(() => {
            setStopAni(false)

            refText.current.style.transition = '1.4s'
            refText.current.style.opacity = '1'
            refText.current.style.left = (_geo.left + _geo.width * 0.65) + "px"
        }, 1300);
        timerlist[6] = setTimeout(() => {
            setStopAni(true)
        }, 2500);

        return () => {
            clearTimerList([], true)

            audioList.audioWoo.pause();
            audioList.audioBody.pause();

            audioList.audioWoo.currentTime = 0;

            pauseBearAni();
        }
    }, [])

    function returnOption(index) {
        return {
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
    }

    return (
        <div className="aniObject">
            <div
                ref={refAni}
                className="scaleIncrease"
                style={{
                    position: "fixed", width: _geo.width * 0.23 + "px",
                    height: _geo.width * 0.23 + "px",
                    left: (_geo.left + _geo.width * 0.65) + "px"
                    , bottom: (_geo.top + _geo.height * 0.3) + "px"
                }}>

                <img
                    style={{
                        position: "absolute",
                        left: "0%",
                        top: "0%"
                    }}
                    width={"100%"}
                    src={prePathUrl() +"images/Icons/skinBase.svg"}
                />
                <div
                    style={{
                        position: 'absolute',
                        left: "15%",
                        top: "15%",
                        width: "70%",
                        height: "70%",
                        backgroundColor: "#f9d1c6",
                        borderRadius: "20%"
                    }}
                >
                </div>
                <div
                    style={{
                        position: "absolute", width: "75%",
                        left: "13%"
                        , top: "15%",
                    }}>
                    <Lottie options={returnOption(0)}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        isPaused={stopAni}
                        speed={0.6}
                    />
                </div>
            </div>
            <div
                ref={refText}
                style={{
                    position: "fixed", width: _geo.width * 0.23 + "px",
                    left: (_geo.left + _geo.width * 0.65) + "px"
                    , bottom: (_geo.top + _geo.height * 0.33) + "px"
                }}>
                <BaseImage width={"100%"}
                    url={"Text/SB08_TI_Surprised.svg"}
                />
            </div>
        </div>
    );
}