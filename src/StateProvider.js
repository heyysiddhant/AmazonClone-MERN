import  {createContext, useContext , useReducer} from 'react'

//prepares the data layer
export const StateContext =  createContext ()  ;

//rap  our app and provide the daata layer
export const StateProvider  = ({reducer , initialState , children}) => {
  return (
    <StateContext.Provider value={useReducer(reducer , initialState)} >
        {children}
    </StateContext.Provider>
    )
}

//pull information from the data layer
const useStateValue = () => useContext(StateContext)
export default useStateValue;