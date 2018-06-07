let initialState = {
  user: null
};

const UPDATE_USER = "UPDATE_USER";
const LOGOUT_USER = "LOGOUT_USER";

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return Object.assign({}, state, {
        user: {
          id: action.payload.id,
          username: action.payload.username
        }
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    default:
      return state;
  }
}

export function updateUser(id, username) {
  return {
    type: UPDATE_USER,
    payload: {
      id,
      username
    }
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null
  };
}
