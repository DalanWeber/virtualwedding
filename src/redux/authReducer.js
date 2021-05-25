// initial state

const initialState = {
  guest: null,
};

//action types
const SET_GUEST = "SET_GUEST";
//action builders
export function setGuest(guest) {
  return {
    type: SET_GUEST,
    payload: guest,
  };
}

//the actual reducer
export default function authReducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return {...state, guest: action.payload}
        default:
            return {...state}    
    }
}