

import { useRef, useEffect, useState } from "react";
import { initialAudio } from "./CommonFunctions";

import loadSound from "../utils/loadSound";
import App from "./App";
import { isMobile, isIOS } from "react-device-detect";
import { prePathUrl } from "./CommonFunctions"


var oldBackgroundImage = 'SB08_Intro-BG';

let backAudio = loadSound('bMusic', true);


let titleAudio = loadSound('title');

let audioBody = loadSound('title')
let audioSubBody1 = loadSound('title')
let audioSubBody2 = loadSound('title')

let audioYeah = loadSound('yeah', true)
let audioWoo = loadSound('woo', true)
let audioBuzz = loadSound('buzz', true)
let audioClap = loadSound('clap', true)
let audioClick = loadSound('click', true)

let audioList = [
    backAudio, titleAudio, audioBody, audioSubBody1, audioSubBody2, audioYeah, audioWoo, audioBuzz, audioClap, audioClick
]
var isOff = false;

var _isBackSoundPlaying = true;
let backgroundSize = { width: 0, height: 0 }

var isExpressionShow = true;
var isGameStarted = false;

audioClick.volume = 0.5;
audioBuzz.volume = 0.5;
audioWoo.volume = 0.7;
audioClap.volume = 0.5
audioYeah.volume = 0.7

import "../stylesheets/styles.css";
import Lottie from "react-lottie-segments";
import loadAnimation from "../utils/loadAnimation"

const animationColorList = [
    ['#51c9b5', '#cc55d9', '#f55185'],
    ['#43c9e0', '#15ed76', '#f2e01d'],
    ['#f2e01d', '#0269b8', '#a6074c'],
    ['#a6074c', '#361394', '#eb2f80'],
    ['#1e70eb', '#880a91', '#f0a11a'],
    ['#51c9b5', '#cc55d9', '#dfeb88']
]

const showSourceList = [];
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

let backgroundTimer;

let isGameLoaded = false;

export default function BaseShot() {

    // const standardRate = 1920 / 969;
    // const backRate = 1600 / 900;
    const standardRate = 1600 / 900;
    const [_sizeState, setSizeState] = useState(true);

    const [stopAni, setStopAni] = useState(false);
    const [isShowTitle, setShowTitle] = useState(false)
    const [isBackloaded, setBackLoaded] = useState(false);

    const myImage = useRef();
    const myImage1 = useRef();
    const refBear1 = useRef();
    const introBear = useRef();
    const appRef = useRef();
    const playGameBtn = useRef();
    const loadingBar = useRef();

    const expressionList = [useRef(), useRef(), useRef(), useRef(), useRef()];
    const aniControllist = [useRef(), useRef(), useRef(), useRef(), useRef()];

    const transitionObject = useRef();
    const coloredObjects = [useRef(), useRef(), useRef()];

    const startPoint = {
        segments: [17, 40],
        forceFlag: true
    };

    function backgroundLoaded() {

        setBackLoaded(true)

        if (!isGameLoaded) {
            isGameLoaded = true
            setTimeout(() => {
                loadingBar.current.className = 'hide'
            }, 300);
        }
    }


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


    const [geometry, setGeometry] = useState({
        width: window.innerWidth, height: window.innerHeight,
        left: 0, top: 0
    });

    function controlBacksound() {
        if (_isBackSoundPlaying) {
            _isBackSoundPlaying = false;
            backAudio.pause();
        }
        else {
            _isBackSoundPlaying = true;
            backAudio.play();
        }
    }


    function onOffSound() {
        if (isOff) {
            audioList.map(audio => {
                audio.muted = false;
            })
        }
        else {
            audioList.map(audio => {
                audio.muted = true;
            })
        }

        isOff = !isOff
        appRef.current.gameStop(isOff)

    }

    function playGame() {
        setTimeout(() => {
            setTimeout(() => {
                for (let i = 0; i < 5; i++)
                    expressionList[i].current.className = 'starBtn' + (i + 1);
            }, 500);
            showTitle();
        }, 500);

    }

    function setLoop(audio) {
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            audio.play()
        },
            false)
    }


    function starGame() {
        if (!isGameStarted)
            initialAudio(audioList)
        audioClick.play();
        setTimeout(() => {
            appRef.current.nextFunc();

            if (!isGameStarted) {
                setLoop(backAudio)

                setTimeout(() => {
                    if (isIOS)
                        backAudio.volume = 0.03;
                    else
                        backAudio.volume = 0.1;


                    backAudio.play().catch(error => {
                    });
                }, 500);
                isGameStarted = true;
            }
        }, 200);

    }

    function showBear() {
        refBear1.current.className = 'show';
    }
    function hideBear() {
        refBear1.current.className = 'hide';
        introBear.current.stop();
    }
    function playBearAni() {
        setStopAni(false)
        // introBear.current.play();
    }
    function pauseBearAni() {
        setStopAni(true)
        // introBear.current.stop();
    }
    function showTitle() {
        setStopAni(false)
        setShowTitle(true)

        setTimeout(() => {
            setStopAni(true)
        }, 3000);

        setTimeout(() => {
            appRef.current.showMusicBtn();
        }, 1100);

        let btnTimer = setTimeout(() => {
            playGameBtn.current.style.display = 'inline-block'
            playGameBtn.current.className = 'introText'
            playGameBtn.current.style.pointerEvents = 'none'
        }, 1500);


        setTimeout(() => {
            playGameBtn.current.className = 'commonButton'
            playGameBtn.current.style.pointerEvents = ''
            clearTimeout(btnTimer)
        }, 3000);
    }

    function hideTitle() {
        setShowTitle(false)
        playGameBtn.current.className = ''
        playGameBtn.current.style.display = 'none'
    }


    useEffect(() => {
        let timeout;
        hideBear();

        setTimeout(() => {
            playGame();
        }, 500);
        transitionObject.current.style.display = 'none'
        // startBtn.current.style.display = 'none'




        var hidden = "hidden";

        if (hidden in document)
            document.addEventListener("visibilitychange", onOffSound);
        else if ((hidden = "mozHidden") in document)
            document.addEventListener("mozvisibilitychange", onOffSound);
        else if ((hidden = "webkitHidden") in document)
            document.addEventListener("webkitvisibilitychange", onOffSound);
        else if ((hidden = "msHidden") in document)
            document.addEventListener("msvisibilitychange", onOffSound);


        setTimeout(() => {
            setWindowResizing();
        }, 10);

        const handleResize = () => {

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setWindowResizing();
            }, 100);
        }
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    function setBackground(imgUrl, optionNum = -1) {

        if (optionNum == 0) {
            isExpressionShow = true;
            for (let i = 0; i < 5; i++) {
                expressionList[i].current.style.display = 'inline-block';
                expressionList[i].current.className = 'hide';
            }
            setTimeout(() => {
                expressionList[0].current.className = 'starBtn1';
                expressionList[1].current.className = 'starBtn2';
                expressionList[2].current.className = 'starBtn3';
                expressionList[3].current.className = 'starBtn4';
                expressionList[4].current.className = 'starBtn5';
            }, 500);
        }
        else if (isExpressionShow) {
            isExpressionShow = false;
            for (let i = 0; i < 5; i++)
                expressionList[i].current.className = 'disapear';
            setTimeout(() => {
                for (let i = 0; i < 5; i++)
                    expressionList[i].current.style.display = 'none';
            }, 1000);
        }
        if (oldBackgroundImage != imgUrl) {
            oldBackgroundImage = imgUrl;


            setBackLoaded(false)
            myImage1.current.src = prePathUrl() + "images/background/" + imgUrl + ".svg";
            if (optionNum != 1)  // transition scenes
                myImage1.current.className = 'background-move'

            clearTimeout(backgroundTimer)
            backgroundTimer = setTimeout(() => {
                myImage.current.src = prePathUrl() + "images/background/" + imgUrl + ".svg";
                if (optionNum != 1)  // transition scenes
                    myImage1.current.className = ''
            }, 1000);

        }
    }

    function startTransition(num = 0) {
        transitionObject.current.style.display = 'inline-block';
        transitionObject.current.className = 'changeTran';
        for (let i = 0; i < 3; i++)
            coloredObjects[i].current.style.backgroundColor = animationColorList[num][i]

        setTimeout(() => {
            transitionObject.current.className = '';
            transitionObject.current.style.display = 'none';
        }, 3000);
    }


    function setWindowResizing() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let suitWidth = width;
        let suitHeight = height;
        let left = 0;
        let top = 0;

        backgroundSize.width = width;
        backgroundSize.height = height;

        if (height * standardRate > width) {
            suitHeight = width / standardRate;
            backgroundSize.width = height * standardRate;

            // suitWidth = height * standardRate;
            top = (height - suitHeight) / 2;

        }
        else if (height * standardRate < width) {
            suitWidth = height * standardRate;
            backgroundSize.height = width / standardRate;;
            // suitHeight = width / standardRate;
            left = (width - suitWidth) / 2;
        }
        if (isMobile && window.innerWidth < window.innerHeight)
            setSizeState(false);
        else
            setSizeState(true);
        setGeometry({ width: suitWidth, height: suitHeight, left: left, top: top, first: false })
    }


    return (
        <div
            style={{
                width: "100%", height: "100%", position: "fixed", left: "0px", top: "0px",
                textAlign: "center"
            }}
        >

            <div style={{
                position: "fixed", width: backgroundSize.width + "px"
                , height: backgroundSize.height + "px", left: 0 + "px",
                top: 0 + "px"
            }} >
                <img height={"100%"}
                    ref={myImage}
                    draggable={false}
                    src={prePathUrl() + "images/background/SB08_Intro-BG.svg"}
                />
            </div>
            <div style={{
                position: "fixed", width: backgroundSize.width + "px"
                , height: backgroundSize.height + "px", left: 0 + "px",
                top: 0 + "px"
            }} >
                <img height={"100%"}
                    ref={myImage1}
                    onLoad={backgroundLoaded}
                    draggable={false}
                    src={prePathUrl() + "images/background/SB08_Intro-BG.svg"}
                />
            </div>
            <div style={{ background: "transparent" }} >
                <App
                    ref={appRef} _startTransition={startTransition}
                    geo={geometry} __controlBacksound={controlBacksound}
                    baseGeo={backgroundSize}
                    _setBackground={setBackground}
                    _playBearAni={playBearAni}
                    _pauseBearAni={pauseBearAni}
                    _showBear={showBear}
                    _hideBear={hideBear}
                    _showTitle={showTitle}
                    _hideTitle={hideTitle}
                    _isBackloaded={isBackloaded}
                    _audioList={{
                        audioBody: audioBody, audioWoo: audioWoo, audioYeah: audioYeah,
                        titleAudio: titleAudio,
                        audioSubBody1: audioSubBody1, audioSubBody2: audioSubBody2,
                        audioBuzz: audioBuzz, audioClap: audioClap, audioClick: audioClick
                    }}
                />
            </div>




            <div>
                <div
                    ref={expressionList[0]}
                    className="hide"
                    style={{
                        position: "fixed", width: geometry.width * 0.22 + "px",
                        left: (geometry.left + 0.06 * geometry.width) + "px"
                        , top: (geometry.height * 0.07 + geometry.top) + "px",
                    }}>

                    <Lottie autoplay loop options={returnOption(0)}
                        ref={aniControllist[0]}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        playSegments={startPoint}
                        isPaused={stopAni}
                    />

                </div>
                <div
                    ref={expressionList[1]}

                    className="hide" style={{
                        position: "fixed", width: geometry.width * 0.22 + "px",
                        left: (geometry.left + 0.18 * geometry.width) + "px"
                        , top: (geometry.height * 0.37 + geometry.top) + "px",
                    }}>


                    <Lottie autoplay loop options={returnOption(3)}
                        ref={aniControllist[1]}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        playSegments={startPoint}
                        isPaused={stopAni}

                    />

                </div>

                <div
                    ref={expressionList[2]}

                    className="hide" style={{
                        position: "fixed", width: geometry.width * 0.22 + "px",
                        left: (geometry.left + 0.55 * geometry.width) + "px"
                        , top: (geometry.height * 0.55 + geometry.top) + "px",
                    }}>

                    <Lottie autoplay loop options={returnOption(1)}
                        ref={aniControllist[2]}
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
                        position: "fixed", width: geometry.width * 0.22 + "px",
                        left: (geometry.left + 0.78 * geometry.width) + "px"
                        , top: (geometry.height * 0.48 + geometry.top) + "px",
                    }}>


                    <Lottie autoplay loop options={returnOption(2)}
                        ref={aniControllist[3]}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        playSegments={startPoint}
                        isPaused={stopAni}
                    />

                </div>

                <div
                    ref={expressionList[4]}

                    className="hide" style={{
                        position: "fixed", width: geometry.width * 0.22 + "px",
                        left: (geometry.left + 0.02 * geometry.width) + "px"
                        , top: (geometry.height * 0.6 + geometry.top) + "px",
                    }}>

                    <Lottie autoplay loop options={returnOption(4)}
                        ref={aniControllist[4]}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        playSegments={startPoint}
                        isPaused={stopAni}
                    />


                </div>

                <div
                    ref={refBear1}
                    style={{
                        position: "fixed", width: geometry.width + "px",
                        left: (geometry.width * -0.2 + geometry.left) + "px"
                        , bottom: (-0.01 * geometry.height) + "px",
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        transition: '0.6s'
                    }}>
                    <Lottie autoplay loop options={returnOption(5)}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        isPaused={stopAni}
                        ref={introBear}
                    // playSegments={startPoint}
                    />
                </div>
            </div>
            {isShowTitle &&
                <div>
                    <div
                        className='sliderRightLeft'
                        style={{
                            position: "fixed", width: geometry.width * 0.7 + "px",
                            right: '0%'
                            , top: (geometry.height * 0.07 + geometry.top) + "px",
                            background: 'transparent',
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            draggable={false}
                            width={"100%"}
                            style={{ marginRight: '-10%' }}
                            src={prePathUrl() + "images/intro/SB08_Intro-text_holder.svg"}

                        />
                    </div>

                    <div
                        className='introText'
                        style={{
                            position: "fixed", width: geometry.width * 0.74 + "px",
                            right: (- 0.07 * geometry.width) + "px"
                            , top: (geometry.height * 0.07 + geometry.top) + "px",
                            background: 'transparent',
                            overflow: 'hidden'

                        }}>

                        <img width={"100%"}
                            draggable={false}
                            src={prePathUrl() + "images/intro/SB08_Intro-text.svg"}
                        />
                    </div>
                </div>
            }

            <div
                ref={playGameBtn}
                className='hide'
                onClick={starGame}
                style={{
                    position: "fixed", width: geometry.width * 0.13 + "px",
                    height: geometry.width * 0.13 + "px",
                    left: geometry.left + geometry.width * 0.42
                    , top: geometry.top + geometry.height * 0.45
                    , cursor: "pointer",
                    userSelect: 'none',
                }}>
                <img
                    width={"100%"}
                    draggable={false}
                    src={prePathUrl() + 'images/Buttons/Play_blue.svg'}
                />
            </div>
            <div ref={transitionObject}
            >
                <div
                    ref={coloredObjects[0]}
                    style={{
                        backgroundColor: '#7372f2', width: '18000%',
                        height: '500%', bottom: '-0%', right: '-200%', position: 'absolute'
                    }}>
                </div>

                <div
                    ref={coloredObjects[1]}
                    style={{
                        backgroundColor: '#1f77ff', width: '18000%',
                        height: '500%', bottom: '500%', right: '-200%', position: 'absolute'
                    }}>
                </div>

                <div
                    ref={coloredObjects[2]}
                    style={{
                        backgroundColor: '#3334f2', width: '18000%',
                        height: '5000%', bottom: '1000%', right: '-200%', position: 'absolute'
                    }}>
                </div>
            </div>

            <div
                ref={loadingBar}
                style={{
                    position: 'fixed',
                    left: '0px',
                    top: '0px',
                    background: 'rgb(241 242 243)',
                    width: window.innerWidth,
                    height: window.innerHeight,
                    pointerEvents: 'none'
                }}
            >
                <img
                    style={{ position: 'absolute', width: '10%', top: '40%', left: '45%' }}
                    src={prePathUrl() + "images/Buttons/Spin-1s-200px.gif"} />
            </div>


            {
                !_sizeState && <div className="block" style={{
                    position: "fixed", left: "0px", top: "0px",
                    width: "100%", height: "100%", backgroundColor: "black", opacity: "0.85",
                    textAlign: "center"
                }}>
                    <h1
                        style={{
                            fontSize: '10vw',
                            color: 'white',
                            position: 'absolute',
                            top: '38%',
                            left: '10%',
                            padding: '0px',
                            fontFamily: 'popin'
                        }}>
                        Rotate your device!
                    </h1>
                </div>
            }


        </div>
    )
}




