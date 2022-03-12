import React, { useEffect } from 'react';
import "../stylesheets/styles.css";
import Lottie from "react-lottie-segments";
import {prePathUrl} from "../components/CommonFunctions"

import loadAnimation from '../utils/loadAnimation';

const showSourceList = []
new loadAnimation('Shot_39/sh24e.json').then(result => {
    showSourceList[0] = result;
}, () => { });
new loadAnimation('Shot_39/sh24X.json').then(result => {
    showSourceList[1] = result;
}, () => { });
new loadAnimation('Shot_39/sh24c.json').then(result => {
    showSourceList[2] = result;
}, () => { });
new loadAnimation('Shot_39/sh24e2.json').then(result => {
    showSourceList[3] = result;
}, () => { });
new loadAnimation('Shot_39/sh24l.json').then(result => {
    showSourceList[4] = result;
}, () => { });
new loadAnimation('Shot_39/sh24l.json').then(result => {
    showSourceList[5] = result;
}, () => { });
new loadAnimation('Shot_39/sh24E3.json').then(result => {
    showSourceList[6] = result;
}, () => { });

new loadAnimation('Shot_39/sh24n.json').then(result => {
    showSourceList[7] = result;
}, () => { });
new loadAnimation('Shot_39/sh24t.json').then(result => {
    showSourceList[8] = result;
}, () => { });
new loadAnimation('Shot_39/sh24eee.json').then(result => {
    showSourceList[9] = result;
}, () => { });

import loadSound from "../utils/loadSound"


let audioExcellent = new loadSound('excell')

const timerList = []
export default function Scene18({ nextFunc, _geo, audioList, setVolume }) {

    useEffect(() => {
        audioList.audioBody.src = prePathUrl() + 'sounds/effect/replayAudio.mp3'
        audioList.audioSubBody1.src = audioExcellent.src;
        setVolume(1.7)
        timerList[0] = setTimeout(() => {
            audioList.audioSubBody1.play();
        }, 1300);

        timerList[1] = setTimeout(() => {
            audioList.audioYeah.play();
        }, 1800);

        timerList[2] = setTimeout(() => {
            audioList.audioClap.play();
        }, 2300);

        timerList[3] = setTimeout(() => {
            audioList.audioBody.play();
        }, 5000);

        return () => {
            for (let i = 0; i < timerList.length; i++)
                clearTimeout(timerList[i])
            setVolume(1.4)

            audioList.audioBody.pause();
            audioList.audioYeah.pause();
            audioList.audioClap.pause();
            audioList.audioSubBody1.pause();

            audioList.audioYeah.currentTime = 0;
            audioList.audioClap.currentTime = 0;
        }
    }, [])

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
        <div className='aniObjectDelay'>
            <div className='excellentText' style={{
                position: "fixed", width: _geo.width * 1 + "px"
                , left: _geo.left - _geo.width * 0 + "px",
                top: _geo.top - _geo.height * 0 + "px",
                overflow: 'hidden'
            }}>
                <img width={"100%"}
                    src={prePathUrl() +"images/Excellent/SB08_Excellent_Particles.svg"}
                />
            </div>
            <div style={{
                position: "fixed", width: _geo.width * 0.11 + "px"
                , left: _geo.left + _geo.width * 0.09 + "px",
                top: _geo.top + _geo.height * 0.35 + "px",
            }}>
                <Lottie autoplay loop options={returnOption(6)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div style={{
                position: "fixed", width: _geo.width * 0.11 + "px"
                , left: _geo.left + _geo.width * 0.18 + "px",
                top: _geo.top + _geo.height * 0.45 + "px",
            }}>
                <Lottie autoplay loop options={returnOption(1)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div style={{
                position: "fixed", width: _geo.width * 0.11 + "px"
                , left: _geo.left + _geo.width * 0.28 + "px",
                top: _geo.top + _geo.height * 0.45 + "px",
            }}>
                <Lottie autoplay loop options={returnOption(2)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>

            <div style={{
                position: "fixed", width: _geo.width * 0.11 + "px"
                , left: _geo.left + _geo.width * 0.37 + "px",
                top: _geo.top + _geo.height * 0.45 + "px",
            }}>
                <Lottie autoplay loop options={returnOption(3)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div style={{
                position: "fixed", width: _geo.width * 0.09 + "px"
                , left: _geo.left + _geo.width * 0.46 + "px",
                top: _geo.top + _geo.height * 0.32 + "px",
            }}>
                <Lottie autoplay loop options={returnOption(4)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div style={{
                position: "fixed", width: _geo.width * 0.09 + "px"
                , left: _geo.left + _geo.width * 0.51 + "px",
                top: _geo.top + _geo.height * 0.32 + "px",
            }}>
                <Lottie autoplay loop options={returnOption(5)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div style={{
                position: "fixed", width: _geo.width * 0.11 + "px"
                , left: _geo.left + _geo.width * 0.58 + "px",
                top: _geo.top + _geo.height * 0.46 + "px",
            }}>
                <Lottie autoplay loop options={returnOption(0)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div style={{
                position: "fixed", width: _geo.width * 0.11 + "px"
                , left: _geo.left + _geo.width * 0.67 + "px",
                top: _geo.top + _geo.height * 0.45 + "px",
            }}>
                <Lottie autoplay loop options={returnOption(7)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div style={{
                position: "fixed", width: _geo.width * 0.09 + "px"
                , left: _geo.left + _geo.width * 0.78 + "px",
                top: _geo.top + _geo.height * 0.39 + "px",
            }}>
                <Lottie autoplay loop options={returnOption(8)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div style={{
                position: "fixed", width: _geo.width * 0.06 + "px"
                , left: _geo.left + _geo.width * 0.86 + "px",
                top: _geo.top + _geo.height * 0.39 + "px",
            }}>
                <Lottie autoplay loop options={returnOption(9)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>

            <div className='aniObject'>
                <div
                    className='commonButton'
                    onClick={() => {
                        audioList.audioClick.play();
                        setTimeout(nextFunc, 200)
                    }}
                    style={{
                        position: "fixed", width: _geo.width * 0.08 + "px",
                        height: _geo.width * 0.08 + "px",
                        left: _geo.left + _geo.width * 0.45
                        , bottom: '5%'
                        , cursor: "pointer",
                        overflow: 'hidden',
                        userSelect: 'none',
                    }}>
                    <img
                        width={"100%"}
                        draggable={false}
                        src={prePathUrl() +'images/Buttons/Replay_Blue.svg'}
                    />
                </div>
            </div>
        </div>
    );
}
