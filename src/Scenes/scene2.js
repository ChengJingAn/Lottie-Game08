import React, { useState, useRef, useEffect } from 'react';

import "../stylesheets/styles.css";
import Lottie from "react-lottie-segments";
import loadAnimation from '../utils/loadAnimation';
import {prePathUrl} from "../components/CommonFunctions"

const showSourceList = []
new loadAnimation('Shot_01/Angry.json').then(result => {
    showSourceList[0] = result;
}, () => { });
new loadAnimation('Shot_01/happy.json').then(result => {
    showSourceList[1] = result;
}, () => { });
new loadAnimation('Shot_01/sad.json').then(result => {
    showSourceList[2] = result;
}, () => { });
new loadAnimation('Shot_01/shocked .json').then(result => {
    showSourceList[3] = result;
}, () => { });
new loadAnimation('Shot_01/worried.json').then(result => {
    showSourceList[4] = result;
}, () => { });
new loadAnimation('Shot_02/SB08_Comp_V3_shot_02_bear.json').then(result => {
    showSourceList[5] = result;
}, () => { });



const timerList = [];
export default function Scene2({ nextFunc, _geo, startTransition, audioList }) {


    const [stopAni, setStopAni] = useState(false);

    useEffect(

        () => {

            audioList.audioBody.src = prePathUrl() + 'sounds/intro.mp3'

            // audioList.audioWoo.play();
            timerList[0] = setTimeout(() => {
                setStopAni(true);
            }, 10);

            timerList[1] = setTimeout(() => {
                setStopAni(false);
                audioList.audioBody.play();
            }, 1500);

            timerList[2] = setTimeout(() => {
                expressionList[2].current.className = 'aniObject';
            }, 2800);
            timerList[3] = setTimeout(() => {
                expressionList[3].current.className = 'aniObject';
            }, 4800);
            timerList[4] = setTimeout(() => {
                expressionList[0].current.className = 'aniObject';
            }, 6800);
            timerList[5] = setTimeout(() => {
                expressionList[1].current.className = 'aniObject';
            }, 7800);
            timerList[6] = setTimeout(() => {
                expressionList[4].current.className = 'aniObject';
            }, 8800);


            timerList[7] = setTimeout(() => {
                setStopAni(true);
            }, 10300);

            timerList[8] = setTimeout(() => {
                startTransition(2)
                setTimeout(() => {
                    audioList.audioWoo.play();
                }, 100);

            }, 10800);

            timerList[9] = setTimeout(() => {
                nextFunc()
            }, 11400);

            return () => {
                clearTimerList();

                audioList.audioBody.pause();
                audioList.audioWoo.pause();

                audioList.audioWoo.currentTime = 0;

            }
        }, []
    )


    function clearTimerList() {
        for (let i = 0; i < timerList.length; i++)
            clearTimeout(timerList[i])
    }


    const expressionList = [useRef(), useRef(), useRef(), useRef(), useRef()];


    const startPoint = {
        segments: [16, 40],
        forceFlag: true
    };

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

    return (
        <div className="aniObject">
            <div>
                <div
                    ref={expressionList[0]}
                    className="hide"
                    style={{
                        position: "fixed", width: _geo.width * 0.15 + "px",
                        left: (_geo.left + 0.12 * _geo.width) + "px"
                        , top: (_geo.height * 0.07 + _geo.top) + "px",
                    }}>

                    <Lottie autoplay loop options={returnOption(0)}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        playSegments={startPoint}
                        isPaused={stopAni}
                    />
                </div>
                <div
                    ref={expressionList[4]}
                    className="hide" style={{
                        position: "fixed", width: _geo.width * 0.15 + "px",
                        left: (_geo.left + 0.02 * _geo.width) + "px"
                        , top: (_geo.height * 0.66 + _geo.top) + "px",
                    }}>

                    <Lottie autoplay loop options={returnOption(3)}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        playSegments={startPoint}
                        isPaused={stopAni}

                    />
                </div>

                <div
                    ref={expressionList[2]}

                    className="hide" style={{
                        position: "fixed", width: _geo.width * 0.17 + "px",
                        left: (_geo.left + 0.75 * _geo.width) + "px"
                        , top: (_geo.height * 0.25 + _geo.top) + "px",
                    }}>

                    <Lottie autoplay loop options={returnOption(1)}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        playSegments={startPoint}
                        isPaused={stopAni}
                    />

                </div>
                <div
                    ref={expressionList[3]}

                    className="hide"
                    style={{
                        position: "fixed", width: _geo.width * 0.17 + "px",
                        left: (_geo.left + 0.72 * _geo.width) + "px"
                        , top: (_geo.height * 0.57 + _geo.top) + "px",
                    }}>


                    <Lottie autoplay loop options={returnOption(2)}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        playSegments={startPoint}
                        isPaused={stopAni}
                    />
                </div>

                <div
                    ref={expressionList[1]}

                    className="hide" style={{
                        position: "fixed", width: _geo.width * 0.16 + "px",
                        left: (_geo.left + 0.1 * _geo.width) + "px"
                        , top: (_geo.height * 0.37 + _geo.top) + "px",
                    }}>

                    <Lottie autoplay loop options={returnOption(4)}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        playSegments={startPoint}
                        isPaused={stopAni}
                    />

                    {/* <img width={"100%"}
                    src={prePathUrl() +"images/intro/SB08_Intro_Emoji_05.svg"}
                /> */}
                </div>
            </div>

            <div style={{
                position: "fixed", width: _geo.width + "px",
                left: (_geo.width * 0 + _geo.left) + "px"
                , bottom: (-0.01 * _geo.height) + "px",
                overflow: 'hidden'
            }}>
                {/* <img width={"100%"} style={{ marginBottom: '-25%' }}
                    src={prePathUrl() +"images/Character/SB08_CI_Bear.svg"}
                /> */}

                <Lottie autoplay loop options={returnOption(5)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                    isPaused={stopAni}
                    speed={1.1}

                // playSegments={startPoint}
                />
            </div>

        </div>
    );
}
