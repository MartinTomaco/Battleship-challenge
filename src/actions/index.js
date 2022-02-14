import { SET_PLAYER_NAME } from "./types"

//this is an action creator, an action its an object like: {type,payload}
export const setPlayerNameAction = (payload) => ({
    type: SET_PLAYER_NAME,
    payload: payload
})

