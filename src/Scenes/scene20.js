import React, { useEffect, useRef } from 'react';
import BaseProp from '../components/BaseProp';
import BaseImage from '../components/BaseImage';
import loadSound from '../utils/loadSound';
import {prePathUrl} from "../components/CommonFunctions"

import "../stylesheets/styles.css";

let timerList = [];

var audioJson = {
    bodyAudio: new loadSound('suprise3'),
    correctAudio: new loadSound('suprise3_true'),
    clickAudio: new loadSound('click', true),
    buzzAudio: new loadSound('buzz', true),
    clapAudio: new loadSound('clap', true)
}

var isSelectedCorrect = false
var loadCount = 0;
export default function BaseScene({ nextFunc, _geo, _addSuccesslist, audioList }) {

    useEffect(() => {
        audioList.audioBody.src = audioJson.bodyAudio.src;
        audioList.audioSubBody1.src = audioJson.correctAudio.src;

        audioList.audioBuzz.src = prePathUrl() + 'sounds/effect/buzz.mp3';
        audioList.audioClap.src = prePathUrl() + 'sounds/effect/clap.mp3';

        isSelectedCorrect = false;
        loadCount = 0;

        timerList[5] = setTimeout(() => {
            audioList.audioBody.play();
        }, 2000);

        timerList[8] = setTimeout(() => {
            refBaseDiv.current.className = 'aniObject'
        }, 3000);

        refCorrect.current.addClass('movingTopDown1');

        return () => {
            clearTimerList([1, 2, 3, 4, 5, 6, 7, 8])
            audioList.audioBody.pause();
            audioList.audioSubBody1.pause();
            audioList.audioBuzz.pause();
            audioList.audioClap.pause();

            audioList.audioClick.pause();
            audioList.audioClap.currentTime = 0;
            audioList.audioBuzz.currentTime = 0;
            isSelectedCorrect = false;
        }
    }, [])

    const redGlow = useRef();
    const greenGlow = useRef();
    const refCorrect = useRef();
    const refInCorrect = useRef();

    const refBaseDiv = useRef();

    function clearTimerList(tList) {
        for (let i = 0; i < tList.length; i++)
            clearTimeout(timerList[tList[i]])
    }

    function loading() {
        loadCount++;
        if (loadCount == 2) {
            refBaseDiv.current.className = 'aniObject'
        }
    }

    setTimeout(() => {
        if (isSelectedCorrect)
            refCorrect.current.scale({ s: 1.2, r: 0.32, t: 0.15, tran: '2.2s' });
    }, 100);

    function setCorrect() {
        clearTimeout(timerList[5] )
        if (!isSelectedCorrect) {
            audioList.audioBody.pause();
            greenGlow.current.classList.add('show');
            isSelectedCorrect = true;

            _addSuccesslist();
            audioList.audioClick.play()

            audioList.audioBuzz.pause();
            clearTimeout(timerList[4])

            timerList[7] = setTimeout(() => {
                refInCorrect.current.addClass('hide');
            }, 100);

            refCorrect.current.removeClass('movingTopDown1');

            timerList[1] = setTimeout(() => {
                audioList.audioClap.play();
                // refInCorrect.current.setMouseEnterLeave(false)
                refCorrect.current.removeClass('movingTopDown1');
                refCorrect.current.scale({ s: 1.2, r: 0.32, t: 0.15, tran: '2.2s' });
                refBaseDiv.current.style.pointerEvents = 'none';

                timerList[6] = setTimeout(() => {
                    greenGlow.current.classList.remove('show')
                    greenGlow.current.classList.add('hide')
                }, 1800);
            }, 500);

            timerList[2] = setTimeout(() => {
                audioList.audioSubBody1.play();
            }, 1000);

            timerList[3] = setTimeout(() => {
                nextFunc();
            }, 6000);
        }
    }

    function setError() {
        clearTimeout(timerList[5] )
        audioList.audioBody.pause();
        redGlow.current.classList.add('show');
        audioList.audioClick.play();
        clearTimerList([4])
        timerList[4] = setTimeout(() => {
            audioList.audioBuzz.play();
        }, 300);
    }

    return (
        <div class='hide'
            ref={refBaseDiv}
        >

            <BaseProp
                posInfo={{ w: 0.37, w1: 0.38, r: 0.07, t: 0.2, h: 1 }}
                geo={_geo}
                style={{
                    cursor: 'pointer',
                }}
                clickFunc={setCorrect}
                ref={refCorrect}

            >

                <BaseImage
                    url={"Icons/SB08_CI_Empty_Icon_Green-glow.svg"}
                    geo={_geo}
                    ref={greenGlow}
                    class='hide'
                />

                < BaseImage
                    url={"Character/SB08_CI_Girl_with_gift_Icon.svg"}
                    geo={_geo}
                    onLoad={loading}
                />
            </BaseProp>

            <BaseProp
                posInfo={{ w: 0.37, w1: 0.38, l: 0.07, t: 0.2, h: 1 }}
                geo={_geo}
                class='movingDownTop1'
                clickFunc={setError}
                style={{
                    cursor: 'pointer'
                }}
                ref={refInCorrect}
            >

                <BaseImage
                    url={"Icons/SB08_CI_Empty_Icon_Red-glow.svg"}
                    geo={_geo}
                    ref={redGlow}
                    class='hide'
                />

                < BaseImage
                    url={"Character/SB08_CI_Sad_girl_Icon.svg"}
                    geo={_geo}
                    onLoad={loading}
                />
            </BaseProp>

        </div >
    );
}
