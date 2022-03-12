
import React, { useState, useEffect, useRef } from 'react';

import { prePathUrl } from "./CommonFunctions"

import Scene1 from "../Scenes/scene1";
import Scene2 from "../Scenes/scene2";
import Scene3 from "../Scenes/scene3";
import Scene4 from "../Scenes/scene4";
import Scene5 from "../Scenes/scene5";
import Scene6 from "../Scenes/scene6";
import Scene7 from "../Scenes/scene7";
import Scene8 from "../Scenes/scene8";
import Scene9 from "../Scenes/scene9";

import Scene10 from "../Scenes/scene10";
import Scene11 from "../Scenes/scene11";
import Scene12 from "../Scenes/scene12";
import Scene13 from "../Scenes/scene13";
import Scene14 from "../Scenes/scene14";

import Scene15 from "../Scenes/scene15";
import Scene16 from "../Scenes/scene16";
import Scene17 from "../Scenes/scene17";
import Scene18 from "../Scenes/scene18";
import Scene19 from "../Scenes/scene19";
import Scene20 from "../Scenes/scene20";
import Scene21 from "../Scenes/scene21";
import Scene22 from "../Scenes/scene22";


const Switch = props => {
  const { test, children } = props
  // filter out only children with a matching prop
  return children.find(child => {
    return child.props.value === test
  })
}

var __geo;
var backgroundImageIndex = 0;

var backgroundImageList = [
  "SB08_Intro-BG", //1
  "SB08_BG_01",//2 
  "SB08_Happy_BG",//3
  "SB08_Sad_BG",//4
  "SB08_Angry_BG", //5
  "SB08_Surprise_BG", //6
  "SB08_Worried_BG", // 7
  "SB08_Scared_BG", // 8
  "SB08_BG_01", //9
  "SB08_BG_01", //10
  "SB08_BG_01", //11
  "SB08_BG_01", //12
  "SB08_BG_01", //13
  "SB08_BG_01", //14
  "SB08_Excellent_BG", //15
  "SB08_BG_01", //16
  "SB08_BG_03",//17
  "SB08_BG_03",//18
  "SB08_BG_03",//19
  "SB08_BG_03",//20
  "SB08_BG_03",//21
  "SB08_Excellent_BG", //22
];

var source;
var gainNode

var audioCtx

var GameisStop = false
var isNextSiganl = false;

const App = ({ geo, _setBackground, baseGeo, __controlBacksound, _startTransition, _showBear,
  _hideBear, _playBearAni, _pauseBearAni, _showTitle, _hideTitle, _isBackloaded, _audioList }, ref) => {

  const [index, setIndex] = useState(0);
  const [successList, setsuccessList] = useState(0);
  const [_isBackSoundPlaying, _setBackgroundPlaying] = useState(true);

  const musicRef = useRef();
  // const screenRef = useRef();


  __geo = geo;

  useEffect(
    () => {
      // screenRef.current.className = 'hide'
      return () => {
      }
    }, []
  )


  function skipFunc() {
    setFomart(9)
    _hideBear();
  }



  function controlBacksound() {

    __controlBacksound();
    if (_isBackSoundPlaying) {
      _setBackgroundPlaying(false);
    }
    else {
      _setBackgroundPlaying(true);
    }
  }

  const transitionSceneList = [2, 9, 16]
  function changeBackgroundImage(judgeNum, isQuickNext) {
    let sendNum = -1;
    if (judgeNum == 0)
      sendNum = 0;

    if (transitionSceneList.includes(judgeNum) && !isQuickNext)
      sendNum = 1;    //mean - transition
    if (judgeNum != backgroundImageIndex) {
      backgroundImageIndex = judgeNum;
      _setBackground(backgroundImageList[judgeNum], sendNum);
    }
  }

  function setFomart(judgeNum, isQuickNext) {

    if (judgeNum == 1) {
      musicRef.current.style.display = 'inline-block'
      musicRef.current.className = 'introText'
      // screenRef.current.style.display = 'inline-block'
      // screenRef.current.className = 'introText'

      setTimeout(() => {
        musicRef.current.className = 'commonButton'
        // screenRef.current.className = 'commonButton'
      }, 1400);
    }
    setIndex(judgeNum);
    changeBackgroundImage(judgeNum, isQuickNext);
    if (judgeNum < 14)
      setsuccessList(judgeNum - 9)
    else if (judgeNum < 21)
      setsuccessList(judgeNum - 16)
  }

  React.useImperativeHandle(ref, () => ({
    nextFunc: () => {

      if (audioCtx == null) {
        audioCtx = new AudioContext();
        source = audioCtx.createMediaElementSource(_audioList.audioBody);
        gainNode = audioCtx.createGain();
        source.connect(gainNode);

        // connect the gain node to an output destination
        gainNode.connect(audioCtx.destination);
        setVolume(1.4)
      }

      setFomart(1);
      _hideTitle()
    },

    gameStop: (val) => {
      console.log('isStop', val)

      GameisStop = val
      if (!GameisStop && isNextSiganl) {
        setTimeout(() => {
          setFomart(index + 1, true);
          isNextSiganl = false;
        }, 1000);

      }


    },

    showMusicBtn: () => {

    }
  }))

  function addSuccesslist() {
    setsuccessList(successList + 1)
  }

  function nextFunc(isQuickNext = false) {
    isNextSiganl = true;
    if (!GameisStop) {
      if (index == 0)
        _hideTitle();
      isNextSiganl = false;
      setFomart(index + 1, isQuickNext);
    }

  }

  function setVolume(num) {

    gainNode.gain.value = num; // double the volume

  }

  function goHome() {
    musicRef.current.style.display = 'none'
    setsuccessList(0)
    setTimeout(() => {
      _showTitle();
    }, 400);

    _hideBear();
    backgroundImageIndex = 0;
    setIndex(0);
    _setBackground(backgroundImageList[0], 0)
  }

  return (<div>
    <div className={_isBackloaded ? 'aniObject' : 'hideObject'}>
      <Switch test={index}>
        <Scene1 nextFunc={nextFunc} _baseGeo={baseGeo} _geo={__geo} value={0} />
        <Scene2 audioList={_audioList} nextFunc={nextFunc} startTransition={_startTransition} _baseGeo={baseGeo} _geo={__geo} value={1} />
        <Scene3 audioList={_audioList} nextFunc={nextFunc}
          playBearAni={_playBearAni}
          pauseBearAni={_pauseBearAni}
          showBear={_showBear}
          hideBear={_hideBear}
          bearShow startTransition={_startTransition}
          _baseGeo={baseGeo}
          _geo={__geo}
          value={2} />

        <Scene4 audioList={_audioList} playBearAni={_playBearAni} pauseBearAni={_pauseBearAni} showBear={_showBear} nextFunc={nextFunc} startTransition={_startTransition} _geo={__geo} value={3} />
        <Scene5 audioList={_audioList} playBearAni={_playBearAni} pauseBearAni={_pauseBearAni} showBear={_showBear} nextFunc={nextFunc} startTransition={_startTransition} _geo={__geo} value={4} />
        <Scene6 audioList={_audioList} playBearAni={_playBearAni} pauseBearAni={_pauseBearAni} showBear={_showBear} nextFunc={nextFunc} startTransition={_startTransition} _geo={__geo} value={5} />
        <Scene7 audioList={_audioList} playBearAni={_playBearAni} pauseBearAni={_pauseBearAni} showBear={_showBear} nextFunc={nextFunc} startTransition={_startTransition} _geo={__geo} value={6} />
        <Scene8 audioList={_audioList} playBearAni={_playBearAni} pauseBearAni={_pauseBearAni} showBear={_showBear} hideBear={_hideBear} nextFunc={nextFunc} startTransition={_startTransition} _geo={__geo} value={7} />

        <Scene9 audioList={_audioList} nextFunc={nextFunc} startTransition={_startTransition} _geo={__geo} value={8} />
        <Scene10 audioList={_audioList} nextFunc={nextFunc} _addSuccesslist={addSuccesslist} _geo={__geo} value={9} />
        <Scene11 audioList={_audioList} nextFunc={nextFunc} setVolume={setVolume} _addSuccesslist={addSuccesslist} _geo={__geo} value={10} />
        <Scene12 audioList={_audioList} nextFunc={nextFunc} setVolume={setVolume} _addSuccesslist={addSuccesslist} _geo={__geo} value={11} />
        <Scene13 audioList={_audioList} nextFunc={nextFunc} _addSuccesslist={addSuccesslist} _geo={__geo} value={12} />
        <Scene14 audioList={_audioList} nextFunc={nextFunc} _addSuccesslist={addSuccesslist} _geo={__geo} value={13} />

        <Scene15 audioList={_audioList} nextFunc={nextFunc} startTransition={_startTransition} _geo={__geo} value={14} />
        <Scene16 audioList={_audioList} nextFunc={nextFunc} startTransition={_startTransition} _geo={__geo} value={15} />

        <Scene17 audioList={_audioList} nextFunc={nextFunc} _addSuccesslist={addSuccesslist} _geo={__geo} value={16} />
        <Scene18 audioList={_audioList} nextFunc={nextFunc} _addSuccesslist={addSuccesslist} _geo={__geo} value={17} />
        <Scene19 audioList={_audioList} nextFunc={nextFunc} _addSuccesslist={addSuccesslist} _geo={__geo} value={18} />
        <Scene20 audioList={_audioList} nextFunc={nextFunc} _addSuccesslist={addSuccesslist} _geo={__geo} value={19} />
        <Scene21 audioList={_audioList} nextFunc={nextFunc} _addSuccesslist={addSuccesslist} _geo={__geo} value={20} />
        <Scene22 audioList={_audioList} nextFunc={goHome} setVolume={setVolume} _geo={__geo} value={21} />
      </Switch>
    </div>
    {index > 8 && index != 14 && index != 15 && index != 21 &&
      <div className='aniObject'>
        <div style={{
          position: "fixed", width: baseGeo.width * 0.25 + "px",
          right: (baseGeo.width * 0.013) + "px"
          , top: (baseGeo.height * 0.035) + "px"
        }}  >
          <img width={"100%"} draggable={false} src={prePathUrl() + 'images/Icons/SB08_Progress-bar.svg'} />
        </div>

        <div style={{
          position: "fixed", width: baseGeo.width * 0.04 + "px",
          right: (baseGeo.width * 0.035) + "px"
          , top: (baseGeo.height * 0.05) + "px"
        }}  >
          <img width={"100%"} draggable={false} src={successList > 4 ? prePathUrl() + 'images/Icons/SB08_PB_Yellow_star.svg' : prePathUrl() + 'images/Icons/SB08_PB_Gray_star.svg'} />
        </div>
        <div style={{
          position: "fixed", width: baseGeo.width * 0.04 + "px",
          right: (baseGeo.width * 0.075) + "px"
          , top: (baseGeo.height * 0.05) + "px"
        }} >
          <img width={"100%"} draggable={false} src={successList > 3 ? prePathUrl() + 'images/Icons/SB08_PB_Yellow_star.svg' : prePathUrl() + 'images/Icons/SB08_PB_Gray_star.svg'} />
        </div>
        <div style={{
          position: "fixed", width: baseGeo.width * 0.04 + "px",
          right: (baseGeo.width * 0.115) + "px"
          , top: (baseGeo.height * 0.05) + "px"
        }} >
          <img width={"100%"} draggable={false} src={successList > 2 ? prePathUrl() + 'images/Icons/SB08_PB_Yellow_star.svg' : prePathUrl() + 'images/Icons/SB08_PB_Gray_star.svg'} />
        </div>
        <div style={{
          position: "fixed", width: baseGeo.width * 0.04 + "px",
          right: (baseGeo.width * 0.155) + "px"
          , top: (baseGeo.height * 0.05) + "px"
        }} >
          <img width={"100%"} draggable={false} src={successList > 1 ? prePathUrl() + 'images/Icons/SB08_PB_Yellow_star.svg' : prePathUrl() + 'images/Icons/SB08_PB_Gray_star.svg'} />
        </div>
        <div style={{
          position: "fixed", width: baseGeo.width * 0.04 + "px",
          right: (baseGeo.width * 0.195) + "px"
          , top: (baseGeo.height * 0.05) + "px"
        }} >
          <img width={"100%"} draggable={false} src={successList > 0 ? prePathUrl() + 'images/Icons/SB08_PB_Yellow_star.svg' : prePathUrl() + 'images/Icons/SB08_PB_Gray_star.svg'} />
        </div>
      </div>
    }

    {/* {!unArrowSceneNumList.includes(index) &&
        <div className='aniObject'>

          <div
            className='commonButton'
            onClick={() => { nextFunc(); _audioList.audioClick.play(); }}
            style={{
              position: "fixed", width: __geo.width * 0.055 + "px",
              height: __geo.width * 0.055 + "px",
              right: '2%'
              , bottom: '2%'
              , cursor: "pointer",
              overflow: 'hidden',
              userSelect: 'none',
            }}>
            <img
              width={"100%"}
              draggable={false}
              src={prePathUrl() +'images/Buttons/Next_blue.svg'}
            />
          </div>

          <div
            className='commonButton'
            onClick={previousFunc}
            style={{
              position: "fixed", width: __geo.width * 0.055 + "px",
              height: __geo.width * 0.055 + "px",
              left: '2%'
              , bottom: '2%'
              , cursor: "pointer",
              overflow: 'hidden',
              userSelect: 'none',
            }}>
            <img
              width={"100%"}
              draggable={false}
              src={prePathUrl() +'images/Buttons/Previous_blue.svg'}
            />
          </div>

        </div>
      } */}

    {(index > 0 && index < 9) &&
      <div className='aniObject'>
        < div
          className='commonButton'
          onClick={() => { setTimeout(skipFunc, 200); _audioList.audioClick.play(); }}
          style={{
            position: "fixed", width: __geo.width * 0.06 + "px",
            height: __geo.width * 0.06 + "px",
            right: '2%'
            , bottom: '2%'
            , cursor: "pointer",
            overflow: 'hidden',
            userSelect: 'none',
          }}>
          <img
            width={"100%"}
            draggable={false}
            src={prePathUrl() + 'images/Buttons/Skip_blue.svg'}
          />
        </div>
      </div>
    }

    {/* <FullScreenBtn ref={screenRef} _geo={__geo} /> */}
    <div
      ref={musicRef}
      className='commonButton'
      style={{
        position: "fixed", width: __geo.width * 0.055 + "px",
        height: __geo.width * 0.055 + "px",
        left: 2 + "%",
        top: "46%",
        cursor: 'pointer',
        display: 'none'
      }}>
      <img
        onClick={controlBacksound}
        width={"100%"}
        draggable={false}
        src={prePathUrl() + "images/Buttons/" + (!_isBackSoundPlaying ? "Audio_mute" : "Audio_unmute") + ".svg"}
      />
    </div>
  </div >
  );
}

export default React.forwardRef(App);