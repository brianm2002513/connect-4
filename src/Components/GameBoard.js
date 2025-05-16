import React, {useEffect, useState} from "react";
import "../Game.css";
import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from "./Footer";
import { 
    GAME_STATE_PLAYING, 
    NO_PLAYER, 
    PLAYER_1, 
    PLAYER_2, 
    NO_CIRCLES, 
    GAME_STATE_WIN, 
    GAME_STATE_DRAW
} from "../Constants";

import { isWinner, isDraw, getComputerMove } from "../helper";

const GameBoard = () => {

    const [gameBoard, setGameBoard] = useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const[gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

    console.log(gameBoard);

    useEffect(() => { 
        initGame();
    }, [])

    const initGame = () => {
        setGameBoard(Array(16).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
        setWinPlayer(NO_PLAYER);
    }

    const initBoard = () => {
        const circles = [];
        for (let i = 0; i < NO_CIRCLES; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }

    const circleClicked = (id) => {
        console.log("Circle Clicked: " + id);

        if(gameBoard[id] !== NO_PLAYER) return;

        if (gameState !== GAME_STATE_PLAYING) return;

        if (isWinner(gameBoard, id, currentPlayer)) {
           setGameState(GAME_STATE_WIN);
           setWinPlayer(currentPlayer);
        }

        if (isDraw(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }
 
        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        })

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1)

        console.log(gameBoard);
    }

    const renderCircle = (id) => {
        return <GameCircle key = {id} id = {id} className = {`player${gameBoard[id]}`} onCircleClicked={circleClicked}/>
    }

    return (
        <>
            <Header gameState = {gameState} currentPlayer = {currentPlayer} winPlayer = {winPlayer}/>
            <div className="gameBoard">
                {initBoard()}
            </div>
            <Footer onNewGameClick = {initGame} onSuggestClick={suggestMove} gameState={gameState}/>
        </>
        
    )
}

export default GameBoard;