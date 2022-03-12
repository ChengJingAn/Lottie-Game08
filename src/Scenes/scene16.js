import React, { useState, useEffect } from 'react';

import "../stylesheets/styles.css";
import Lottie from "react-lottie-segments";
import loadSound from '../utils/loadSound';
import {prePathUrl} from "../components/CommonFunctions"

let audioIntro = new loadSound('intro3')

import loadAnimation from '../utils/loadAnimation';

const showSourceList = []
new loadAnimation('Shot_02/SB08_Comp_V3_shot_02_bear.json').then(result => {
    showSourceList[0] = result;
}, () => { });

const timerList = []
export default function Scene22({ nextFunc, _geo, startTransition, audioList }) {


    const [stopAni, setStopAni] = useState(false);

    useEffect(

        () => {
            audioList.audioBody.src = audioIntro.src;
            // audioList.audioWoo.play();

            timerList[0] = setTimeout(() => {
                setStopAni(true);
            }, 10);

            timerList[1] = setTimeout(() => {
                setStopAni(false);
                
                audioList.audioBody.play();
            }, 1500);


            timerList[2] = setTimeout(() => {
                setStopAni(true);
            }, 3400);

            timerList[3] = setTimeout(() => {
                startTransition(2)
                setTimeout(() => {
                    audioList.audioWoo.play();
                }, 300);
            }, 4400);

            timerList[4] = setTimeout(() => {
                nextFunc()
            }, 5000);

            return () => {
                for (let i = 0; i < timerList.length; i++)
                    clearTimeout(timerList[i])

                audioList.audioBody.pause();
                audioList.audioWoo.pause();

                audioList.audioWoo.currentTime = 0;
            }
        }, []
    )


    // const startPoint = {
    //     segments: [8, 40],
    //     forceFlag: true
    // };

    function returnOption(index) {
        return {
            loop: true,
            autoplay: true,
            animationData: showSourceList[index],
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
    }

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         nextFunc();
    //     }, 3000);

    //     return () => {
    //         clearTimeout(timer);
    //     }
    // }, [])

    return (
        <div className='aniObject'
        >

            <div style={{
                position: "fixed", width: _geo.width + "px",
                left: (_geo.width * 0 + _geo.left) + "px"
                , bottom: (-0.01 * _geo.height) + "px",
                overflow: 'hidden'
            }}>
                {/* <img width={"100%"} style={{ marginBottom: '-25%' }}
                    src={prePathUrl() +"images/Character/SB08_CI_Bear.svg"}
                /> */}

                <Lottie autoplay loop options={returnOption(0)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                    isPaused={stopAni}

                // playSegments={startPoint}
                />
            </div>

        </div>
    );
}
