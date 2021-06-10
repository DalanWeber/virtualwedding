// initial state

const initialState = {
  guest: null,
};



//action types
const SET_GUEST = "SET_GUEST";
const LOGOUT = 'LOGOUT'
const TOGGLE = 'TOGGLE'
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

export function toggle(){
  return {
    type: TOGGLE,
    payload: null,
  }
}

//the actual reducer
export default function authReducer(state = initialState, action){
    switch(action.type){
        case SET_GUEST:
          return {...state, guest: action.payload}
        case TOGGLE:
          return {...state,  guest: {...state.guest, is_admin: !state.guest.is_admin}}
        case LOGOUT:
          return {...state, guest: action.payload}
        default:
          return {...state}    
    }
}