// initial state

const initialState = {
  guest: null,
};



//action types
const SET_GUEST = "SET_GUEST";
const LOGOUT = 'LOGOUT'
//action builders
export function setGuest(guest) {
  return {
    type: SET_GUEST,
    payload: guest,
  };
}

export function logout(){
  return {
    type: LOGOUT,
    payload: null
  }
}

//the actual reducer
export default function authReducer(state = initialState, action){
    switch(action.type){
        case SET_GUEST:
          return {...state, guest: action.payload}
        case LOGOUT:
          return {...state, guest: action.payload}
        default:
          return {...state}    
    }
}