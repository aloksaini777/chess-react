import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute, faMusic, } from '@fortawesome/free-solid-svg-icons';

const AudioController = () => {
    const controlRef = useRef(null);
    const [volume, setVolume] = useState(false);

    const openVolumeOptions = () => {
        gsap.timeline()
            .to("#controlsContainer", { duration: 0.3, height: '6.5rem' });
    }

    const closeVolumeOptions = () => {
        gsap.timeline()
            .to("#controlsContainer", { duration: 0.3, height: '2rem' })
    }

    useEffect(() => {
        function handleClick(event) {
            if(!controlRef.current || !controlRef.current.contains(event.target)) {
                closeVolumeOptions();
            }
        }
    
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className='audio-control'>
            <button 
                ref={controlRef}
                id={'controlsContainer'}
                className='controls-container'
                onClick={() => {openVolumeOptions();}}
            >
                <div className="main-icon">
                    <FontAwesomeIcon icon={faVolumeUp} />
                </div>

                <div className='volumne-icons-container'>
                    <button onClick={()=> {setVolume(!volume)}} className={!volume? 'toggle-off' : ''}>
                        <FontAwesomeIcon icon={volume? faVolumeUp : faVolumeMute} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faMusic} />
                    </button>

                </div>

            </button>
        </div>
    )
}

export default AudioController;