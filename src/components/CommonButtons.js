
import React, { useState } from "react";
import "../stylesheets/styles.css";

var isFullScreen = false;
var elem = document.documentElement;

import {prePathUrl} from "./BaseShot"

const FullScreenBtn = React.forwardRef((prop, ref) => {

    if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {

        isFullScreen = true;
    }
    else
        isFullScreen = false;


    function screenControlFunc(prop) {
        if (!isFullScreen) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem = window.top.document.body; //To break out of frame in IE
                elem.msRequestFullscreen();
            }
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                window.top.document.msExitFullscreen();
            }
        }
        isFullScreen = !isFullScreen
    }

    return (
        <div
            ref={ref}
            style={{
                position: "fixed", width: prop._geo.width * 0.035 + "px",
                left: 2.5 + "%",
                top: "2%",
                cursor: 'pointer',
            }}>
            <img
                onClick={() => { setTimeout(screenControlFunc, 200) }}
                width={"100%"}
                draggable={false}
                className = 'playBtn'
                src={prePathUrl + "images/Buttons/" + (!isFullScreen ? "fullscreen-svgrepo-com" : "exit-full-screen-svgrepo-com") + ".svg"}
            />
        </div>
    )
});

const MusicButton = React.forwardRef((prop, ref) => {

    const [_isBackSoundPlaying, _setBackgroundPlaying] = useState(true);
    function controlBacksound() {
        if (_isBackSoundPlaying) {
            _setBackgroundPlaying(false);
            prop.backAudio.pause();
        }
        else {
            _setBackgroundPlaying(true);
            prop.backAudio.play();
        }
    }

    return (
        <div
            ref={ref}
            className='commonButton'
            style={{
                position: "fixed", width: prop._geo.width * 0.055 + "px",
                height: prop._geo.width * 0.055 + "px",
                left: 2 + "%",
                top: "46%",
                cursor: 'pointer',
                display: 'none'
            }}>
            {!_isBackSoundPlaying &&
                <img
                    className="aniObject"
                    onClick={controlBacksound}
                    width={"100%"}
                    draggable={false}
                    src={prePathUrl + "images/Buttons/Audio_mute.svg"}
                />
            }
            {_isBackSoundPlaying &&
                <img
                    className="aniObject"
                    onClick={controlBacksound}
                    width={"100%"}
                    draggable={false}
                    src={prePathUrl + "images/Buttons/Audio_unmute.svg"}
                />
            }
        </div>
    )
});


export { FullScreenBtn, MusicButton }