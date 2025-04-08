export const initialState = {
    basket : [],
    total  : 0,
    user : null 
}

const reducer = (state , action ) => {
    // action = {type: 'ADD_TO_BASKET', item: {…}}
    //state = {basket: Array(0)}


    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state ,
                basket : [...state.basket , action.item],
                total : state.total + action.item.price
            }

        case 'REMOVE_FROM_BASKET':
            return {
                ...state ,
                basket : state.basket.filter(item => item.id !== action.id),
                total : state.total - action.price
            }
        case 'EMPTY_BASKET':
            return {
                ...state ,
                basket : [],
                total : 0
            }

        case 'SET_USER':
            return {
                ...state ,
                user : action.user
            }
        case 'UNSET_USER':
            return {
                ...state ,
                user : null
            }
    
        default:
            return state;
    }
}

export  default  reducer ;