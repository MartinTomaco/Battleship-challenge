import { SET_PLAYER_NAME } from '../actions/types';

const INITIAL_STATE = {
  isPlayer: true,
  value: '',
  boardMatrix: Array(100).fill(0),
  playerName: '',
};

// eslint-disable-next-line default-param-last
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return {
        ...state,
        // update stuff
        playerName: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
