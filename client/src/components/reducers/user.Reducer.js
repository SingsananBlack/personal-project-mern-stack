export function userReducer(state = null, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      localStorage.removeItem('token')
      return action.payload;
    default:
      return state;
  }
}
