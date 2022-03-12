import React, { useEffect, useRef, useState } from 'react';
import BaseProp from '../components/BaseProp';
import BaseImage from '../components/BaseImage';
import loadSound from '../utils/loadSound';
import loadAnimation from "../utils/loadAnimation"
import Lottie from "react-lottie-segments";
import {prePathUrl} from "../components/CommonFunctions"

import "../stylesheets/styles.css";

let timerList = [];

var audioJson = {
    bodyAudio: new loadSound('suprise2'),
    correctAudio: new loadSound('correct2'),
    clickAudio: new loadSound('click', true),
    buzzAudio: new loadSound('buzz', true),
    clapAudio: new loadSound('clap', true)
}

var isSelectedCorrect = false

let animationData;
new loadAnimation('Shot_06/SB08_Character-Interactives_surprised.json').then(result => {
    animationData = result;
}, () => { });

var loadCount = 0;
export default function BaseScene({ nextFunc, _geo, _addSuccesslist, audioList }) {

    useEffect(() => {

        loadCount = 0;
        isSelectedCorrect = false;

        refCorrect.current.addClass('movingTopDown');
        refInCorrect.current.addClass('movingDownTop');

        audioList.audioSubBody1.src = audioJson.correctAudio.src;
        audioList.audioBody.src = prePathUrl() + 'sounds/suprise2.mp3';

        timerList[5] = setTimeout(() => {

            audioList.audioBody.play();
        }, 2000);
        return () => {
            clearTimerList([1, 2, 3, 4, 5])
            audioList.audioBody.pause();
            audioList.audioSubBody1.pause();

            audioList.audioClick.pause();
            audioList.audioBuzz.pause();
            audioList.audioClap.pause();

            audioList.audioClap.currentTime = 0
            audioList.audioBuzz.currentTime = 0
            audioList.audioClick.currentTime = 0

            audioList.audioSubBody1.currentTime = 0;
        }
    }, [])

    setTimeout(() => {
        if (isSelectedCorrect)
            refFaceBase.current.scale({ t: 0.1, s: 1.2, tran: '1.9s' });
    }, 100);

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

    const redGlow = useRef();
    const greenGlow = useRef();
    const refCorrect = useRef();
    const refInCorrect = useRef();
    const refFaceBase = useRef();
    const refFace = useRef();
    const refBaseDiv = useRef();
    const refFaceAni = useRef();


    function clearTimerList(tList) {
        for (let i = 0; i < tList.length; i++)
            clearTimeout(timerList[tList[i]])
    }

    function loading() {
        loadCount++;
        if (loadCount == 6) {
            refBaseDiv.current.className = 'aniObject'
        }
    }

    function setCorrect() {
        clearTimeout(timerList[5])
        if (!isSelectedCorrect) {
            audioList.audioBody.pause();
            isSelectedCorrect = true;

            greenGlow.current.classList.add('show');
            refFace.current.classList.add('show')
            refFaceAni.current.stop();

            _addSuccesslist();
            audioList.audioClick.play()
            audioList.audioBuzz.pause();
            clearTimeout(timerList[4])

            refCorrect.current.removeClass('movingTopDown');
            refInCorrect.current.removeClass('movingDownTop');

            timerList[1] = setTimeout(() => {
                audioList.audioClap.play();
                refFaceBase.current.scale({ t: 0.1, s: 1.2, tran: '1.9s' });
                refCorrect.current.addClass('hide');
                refInCorrect.current.addClass('hide');
                refBaseDiv.current.style.pointerEvents = 'none'
            }, 500);

            timerList[2] = setTimeout(() => {
                audioList.audioSubBody1.play();
            }, 1000);

            timerList[3] = setTimeout(() => {
                nextFunc();
            }, 4500);
        }
    }

    function setError() {
        clearTimeout(timerList[5])
        audioList.audioBody.pause();
        redGlow.current.classList.add('show');
        audioList.audioClick.play();
        clearTimerList([4])
        timerList[4] = setTimeout(() => {
            audioList.audioBuzz.play();
        }, 200);
    }
    return (
        <div
            className='hide'
            ref={refBaseDiv}
        >
            <BaseProp
                posInfo={{ w: 0.45, l: 0.27, t: 0.05, h: 1 }}
                geo={_geo}
                ref={refFaceBase}
                style={{
                    transition: '1.3s'
                }}
            >
                <BaseImage
                    url={"Character/SB08_CI_Pink_Circle.svg"}
                    geo={_geo}
                    onLoad={loading}
                />
                <BaseImage
                    url={"Character/SB08_CI_Empty_Face.svg"}
                    geo={_geo}
                    onLoad={loading}
                />
                <div
                    ref={refFace}
                    className='hide'
                    style={{
                        position: "absolute", width: "26.5%",
                        left: "37%"
                        , top: "35%",
                    }}>

                    <Lottie options={returnOption(0)}
                        ref={refFaceAni}
                        mouseDown={false}
                        speed={1.1}
                        isClickToPauseDisabled={true}
                    />
                </div>
            </BaseProp>

            <BaseProp
                
                posInfo={{ w: 0.18, w1: 0.192, l: 0.07, t: 0.63, h: 1 }}
                geo={_geo}
                style={{
                    cursor: 'pointer'
                }}
                clickFunc={setError}
                ref={refInCorrect}
            >
                <BaseImage
                    url={"Icons/SB08_Empty_Icon.svg"}
                    geo={_geo}
                    onLoad={loading}
                />
                <BaseImage
                    url={"Icons/SB08_Icon_Red_glow.svg"}
                    geo={_geo}
                    ref={redGlow}
                    class='hide'
                />
                < BaseImage
                    url={"Icons/SB08_Angry_Icon.svg"}
                    geo={_geo}
                    onLoad={loading}
                />
            </BaseProp>

            <BaseProp
                posInfo={{ w: 0.18, w1: 0.192, r: 0.07, t: 0.63, h: 1 }}
                geo={_geo}
                
                clickFunc={setCorrect}
                style={{
                    cursor: 'pointer'
                }}
                ref={refCorrect}
            >
                <BaseImage
                    url={"Icons/SB08_Empty_Icon.svg"}
                    geo={_geo}
                    onLoad={loading}
                />
                <BaseImage
                    url={"Icons/SB08_Icon_Green_glow.svg"}
                    geo={_geo}
                    ref={greenGlow}
                    class='hide'
                />
                < BaseImage
                    url={"Icons/SB08_Surprise_Icon.svg"}
                    geo={_geo}
                    onLoad={loading}
                />
            </BaseProp>

        </div >
    );
}
