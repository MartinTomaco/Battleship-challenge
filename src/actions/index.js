import { SET_PLAYER_NAME } from './types';

// this is an action creator, an action its an object like: {type,payload}
const setPlayerNameAction = (payload) => {
  return {
    type: SET_PLAYER_NAME,
    payload,
  };
};
export default setPlayerNameAction;
