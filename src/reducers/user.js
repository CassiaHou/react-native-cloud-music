import * as types from '../constants/ActionTypes'
const initialState = {
  userInfo: null
}
export default function (state = initialState, action) {
  const {payload, error, meta = {}, type} = action
  const {sequence = {}, mobile, account} = meta
  if (sequence.type === 'start' || error) {
    return state
  }
  switch (type) {
    case types.LOGIN:
      if (payload.publicInfo) {
        return {
          ...state,
          token: payload.token,
          users: {
            ...state.users,
            [mobile]: {
              ...state.users[mobile],
              ...payload.publicInfo
            }
          },
          userName: mobile
        }
      }
      return {
        ...state,
        token: payload.token,
        userName: mobile
      }
    case types.LOGOUT:
      return {
        ...state,
        token: null,
        users: state.users
      }
    default:
      return state
  }
}
