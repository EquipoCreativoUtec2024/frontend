import React from "react";
import { gameStates } from "../page";

interface playerWaitingProps {
  setReady: (ready: boolean) => void;
  ready: boolean;
  topPlayer: boolean;
  currentGameState: gameStates;
}

function PlayerWaiting({
  currentGameState,
  setReady,
  ready,
  topPlayer,
}: playerWaitingProps) {
  if (ready) {
    return (
      <div
        className={
          "flex h-[50vh] w-[100%] justify-evenly items-center" +
          " " +
          (topPlayer ? "flex-col-reverse" : "flex-col")
        }
      >
        {currentGameState === gameStates.starting ? (
          <h1
            className={
              "text-red-500" + " " + (topPlayer ? "transform rotate-180" : "")
            }
          >
            ¡El juego comenzara en cualquier momento!
          </h1>
        ) : (
          <>
            {" "}
            <h1 className={topPlayer === true ? "transform rotate-180" : ""}>
              Esperando a su oponente...
            </h1>
            <button
              className={
                "animate-pulse bg-orange-700 px-8 p-4 border-1 rounded-md" +
                " " +
                (topPlayer === true ? "transform rotate-180" : "")
              }
              onClick={() => setReady(false)}
            >
              ¡Espera!
            </button>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={
          "flex h-[50vh] w-[100%] justify-evenly items-center" +
          " " +
          (topPlayer ? "flex-col-reverse" : "flex-col")
        }
      >
        {currentGameState === gameStates.starting ? (
          <h1
            className={
              "text-red-500" + " " + (topPlayer ? "transform rotate-180" : "")
            }
          >
            ¡El juego comenzara en cualquier momento!
          </h1>
        ) : (
          <>
            <h1 className={topPlayer === true ? "transform rotate-180" : ""}>
              Presione cuando este listo
            </h1>
            <button
              className={
                "animate-pulse bg-orange-700 px-8 p-4 border-1 rounded-md" +
                " " +
                (topPlayer === true ? "transform rotate-180" : "")
              }
              onClick={() => setReady(true)}
            >
              Preparado
            </button>
          </>
        )}
      </div>
    );
  }
}

export default PlayerWaiting;
