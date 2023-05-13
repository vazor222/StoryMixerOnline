import React, { createContext, useCallback, useContext, useReducer } from 'react';

export function AppContextSource() {

  const [{roomCode, playerName}, dispatch] = useReducer((state, action) => {
    switch(action.type){
      case 'setRoomCode':
        return {...state, roomCode: action.payload};
      case 'setPlayerName':
        return {...state, playerName: action.payload};
      default:
        return
    }
  },{
    roomCode: null,
    playerName: ''
  })

  const setRoomCode = useCallback((roomCode) => {
    dispatch({
      type: 'setRoomCode',
      payload: roomCode
    })
  }, []);

  const setPlayerName = useCallback((playerName) => {
    dispatch({
      type: 'setPlayerName',
      payload: playerName
    })
  }, []);

  return {roomCode, setRoomCode, playerName, setPlayerName}
}
export const AppContext = createContext({});

export const useAppCtx = () => useContext(AppContext);