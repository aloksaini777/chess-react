import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import LogoImg from '../../assets/logo.png';
import AudioController from "../../components/AudioController/AudioController";
import WhitePiece from '../../assets/chess-pieces/wp.png';
import BlackPiece from '../../assets/chess-pieces/bp.png';
import { useSelector, useDispatch } from "react-redux";
import { setNewGameLevel, setNewGamePlayer } from "../../features/newGame/newGameSlice";
import { difficultyLevels } from "../../bots/bots";



const MenuPage = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [slider, setSlider] = useState(false);
    const menuRef = useRef(null);
    const setupRef = useRef(null);
    const dispatch = useDispatch();
    const newGame = useSelector((state) => state.newGame);


    const handleMenuClick = () => {
        setMenuVisible(true);
    
        gsap.timeline()
          .to("#actv-menu", { duration: 0.1, scale: 0.5, opacity: 0, pointerEvents: "none" })
          .to("#main-menu", { duration: 1, width: "100%", ease: "expo.inOut" })
          .to("#main-menu", { duration: 0.2, opacity: 1 }, "-=0.5")
          .to("#menuContent", { duration: 0.5, opacity: 1, pointerEvents: "all" })
          .to("#bottom-bar", { duration: 0.5, opacity: 1 }, "-=0.5");
    };

    useEffect(() => {
        setTimeout(() => {
            gsap.timeline()
                .to("#main-menu", { duration: 1, scale: 1, ease: "expo.inOut" })
                // .to("#menuContent", { duration: 0.1, opacity: 1, pointerEvents: "all" })
        }, 500)
    }, []);

    const handleNewGame = () => {
        const tl = gsap.timeline();
    
        tl.to(menuRef.current, {
            x: "-200%",
            duration: 0.5,
            ease: "power2.inOut",
        }).fromTo(
            setupRef.current,
            { x: "100%" },
            {
                x: "0%",
                duration: 0.5,
                ease: "power2.inOut",
            },
            "<" // run simultaneously with the menu slide out
        );
      };


    return (
        <div className="menu-page">
            <AudioController />
            
            <section 
                ref={menuRef} 
                id="main-menu" 
                className="main-menu"
            >
                <div id="menuContent" className="menu-content">
                    <img 
                        src={LogoImg}
                        alt={'Logo'}
                        className="logo"
                    />

                    <div id="menuButtonsDiv" className="menu-buttons">
                        {/* <button id="open-direc" className="m-button">
                            <p className="button-text">Continue</p>
                        </button> */}
                        <button 
                            id="open-char" 
                            className="m-button"
                            onClick={()=>{handleNewGame();}}
                        >
                            <p className="button-text">New Game</p>
                        </button>
                        <button id="open-sett" className="m-button">
                            <p className="button-text">Options</p>
                        </button>
                        {/* <button 
                            id="open-chang-char" 
                            className="m-button"
                            onClick={() => {window.open('about:blank', '_self');
                                window.close();}}
                        >
                            <p className="button-text">Exit</p>
                        </button> */}
                    </div>

                </div>
            </section>

            <section 
                ref={setupRef}
                className="new-game-menu"
            >
                <div id="menuContent" className="menu-content">
                    <img 
                        src={LogoImg}
                        alt={'Logo'}
                        className="logo"
                    />

                    <div className="new-game-container">
                        <div className="pieces-container">
                            <button 
                                className={newGame.selectedPlayer == 'w'? `active` : ''}
                                onClick={() => {dispatch(setNewGamePlayer('w'));}}
                            >
                                <img alt={'white-piece'} src={WhitePiece} />
                            </button>
                            <button
                                className={newGame.selectedPlayer == 'b'? `active` : ''}
                                onClick={() => {dispatch(setNewGamePlayer('b'));}}
                            >
                                <img alt={'black-piece'} src={BlackPiece} />
                            </button>
                        </div>

                        <div class="level-select-container">
                            <div class="level-select select">
                                <div
                                    class="selected"
                                    data-one="Noob"
                                    data-two="Casual"
                                    data-three="Pro"
                                    data-four="Warrior"
                                    data-five="Grandmaster"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                        class="arrow"
                                    >
                                        <path
                                            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                                        ></path>
                                    </svg>
                                </div>
                                <div class="options">
                                    {Object.entries(difficultyLevels).map(([key, value], index) => {
                                        return(
                                            <div key={`Key-${key}`} title={key}>
                                                <input 
                                                    id={key} 
                                                    name="option" 
                                                    type="radio" 
                                                    checked={index == newGame.level} 
                                                    onChange={(e) => {dispatch(setNewGameLevel(index));}}
                                                />
                                                <label class="option" htmlFor={key} data-txt={key}></label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div id="menuButtonsDiv" className="menu-buttons">
                            <button 
                                id="open-char" 
                                className="m-button"
                                onClick={()=>{handleNewGame();}}
                            >
                                <p className="button-text">Let's Play</p>
                            </button>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default MenuPage;
