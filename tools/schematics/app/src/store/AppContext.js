import React, { useReducer, createContext, useContext } from 'react'

/** INITIAL STATE **/
const initialState = {
  appState: 'idle',
}

/** ACTIONS  **/
const SET_APP_STATE = 'SET_APP_STATE'

/** REDUCER **/
const reducer = (state, action) => {
  switch (action.type) {
    case SET_APP_STATE:
      return { ...state, appState: action.payload }
    default:
      return { ...initialState }
  }
}

/** React Context **/
const Context = createContext(null)

/** Context Wrapper **/
export function AppProvider(props) {
  const [newContext, dispatch] = useReducer(reducer, initialState)
  const actions = appActions(newContext, dispatch)

  return (
    <Context.Provider value={{ appContext: newContext, actions }}>
      {props.children}
    </Context.Provider>
  )
}

/** React Hook to useContext **/
export const useAppContext = () => useContext(Context)

/** ACTION DISPATCHERS **/
const appActions = (newContext, dispatch) => ({
  setDefault: (type, payload) => {
    dispatch({ type, payload })
  },
  setAppState: (appState) => {
    dispatch({ type: SET_APP_STATE, payload: appState })
  },
})
