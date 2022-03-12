import "../stylesheets/styles.css";

import React, { useEffect } from 'react';
import Lottie from "react-lottie";
import loadSound from "../utils/loadSound"
import loadAnimation from '../utils/loadAnimation';
import {prePathUrl} from "../components/CommonFunctions"

const showSourceList = []
new loadAnimation('welldone/sh44w.json').then(result => {
    showSourceList[0] = result;
}, () => { });
new loadAnimation('welldone/sh44e01.json').then(result => {
    showSourceList[1] = result;
}, () => { });
new loadAnimation('welldone/sh44L01.json').then(result => {
    showSourceList[2] = result;
}, () => { });
new loadAnimation('welldone/sh44L02.json').then(result => {
    showSourceList[3] = result;
}, () => { });
new loadAnimation('welldone/sh44d.json').then(result => {
    showSourceList[4] = result;
}, () => { });
new loadAnimation('welldone/sh44O.json').then(result => {
    showSourceList[5] = result;
}, () => { });
new loadAnimation('welldone/sh44n.json').then(result => {
    showSourceList[6] = result;
}, () => { });
new loadAnimation('welldone/sh44e02.json').then(result => {
    showSourceList[7] = result;
}, () => { });

new loadAnimation('welldone/sh44eee.json').then(result => {
    showSourceList[8] = result;
}, () => { });

let audioWellDone = new loadSound('welldone')
const timerList = [];

export default function Scene18({ nextFunc, _geo, audioList }) {

    useEffect(() => {

        audioList.audioBody.src = audioWellDone.src;
        
        timerList[1] = setTimeout(() => {
            audioList.audioBody.play();
        }, 1000);

        timerList[2] = setTimeout(() => {
            audioList.audioYeah.play();
        }, 1500);

        timerList[0] = setTimeout(() => {
            nextFunc();
        }, 5000);

        return () => {
            audioList.audioBody.pause();
            audioList.audioYeah.pause();

            audioList.audioYeah.currentTime = 0

            for (let i = 0; i < timerList.length; i++)
                clearTimeout(timerList[i])
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
            < div className="excellentText" style={{
                position: "fixed", width: _geo.width * 1.3 + "px",
                left: _geo.left - _geo.width * 0.15 + "px",
                top: _geo.top - _geo.height * 0.15 + "px"
            }}>
                <img width={"100%"}
                    src={prePathUrl() +"images/Welldone/SB08_Well-Done_Particles.svg"}
                />
            </div>

            <div

                style={{
                    position: "fixed",
                    width: _geo.width * 0.14 + "px",
                    left: _geo.left + _geo.width * 0.25 + "px",
                    top: _geo.top + _geo.height * 0.16 + "px"
                }}
            >


                <Lottie autoplay loop options={returnOption(0)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>

            <div

                style={{
                    position: "fixed",
                    width: _geo.width * 0.07 + "px",
                    left: _geo.left + _geo.width * 0.40 + "px",
                    top: _geo.top + _geo.height * 0.23 + "px"
                }}

            >
                <Lottie autoplay loop options={returnOption(1)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div

                style={{
                    position: "fixed",
                    width: _geo.width * 0.09 + "px",
                    left: _geo.left + _geo.width * 0.48 + "px",
                    top: _geo.top + _geo.height * 0.17 + "px"
                }}

            >
                <Lottie autoplay loop options={returnOption(2)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div

                style={{
                    position: "fixed",
                    width: _geo.width * 0.09 + "px",
                    left: _geo.left + _geo.width * 0.58 + "px",
                    top: _geo.top + _geo.height * 0.17 + "px"
                }}

            >
                <Lottie autoplay loop options={returnOption(3)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div

                style={{
                    position: "fixed",
                    width: _geo.width * 0.12 + "px",
                    left: _geo.left + _geo.width * 0.24 + "px",
                    top: _geo.top + _geo.height * 0.5 + "px"
                }}

            >
                <Lottie autoplay loop options={returnOption(4)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div
                style={{
                    position: "fixed",
                    width: _geo.width * 0.11 + "px",
                    left: _geo.left + _geo.width * 0.36 + "px",
                    top: _geo.top + _geo.height * 0.54 + "px"
                }}
            >
                <Lottie autoplay loop options={returnOption(5)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div

                style={{
                    position: "fixed",
                    width: _geo.width * 0.12 + "px",
                    left: _geo.left + _geo.width * 0.47 + "px",
                    top: _geo.top + _geo.height * 0.53 + "px"
                }}
            >
                <Lottie autoplay loop options={returnOption(6)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div


                style={{
                    position: "fixed",
                    width: _geo.width * 0.1 + "px",
                    left: _geo.left + _geo.width * 0.6 + "px",
                    top: _geo.top + _geo.height * 0.53 + "px"
                }}

            >
                <Lottie autoplay loop options={returnOption(7)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div

                style={{
                    position: "fixed",
                    width: _geo.width * 0.08 + "px",
                    left: _geo.left + _geo.width * 0.71 + "px",
                    top: _geo.top + _geo.height * 0.42 + "px"
                }}

            >
                <Lottie autoplay loop options={returnOption(8)}
                    mouseDown={false}
                    isClickToPauseDisabled={true}
                />
            </div>





        </div>
    );
}
