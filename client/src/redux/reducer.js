import ACTIONS from "./actions";
import _ from "lodash";



const defaultState = {
  user:'',
  isAuthenticated:'',
  modalShow:false,
  editedNote:{
    note:'',
    index:''
  }
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.UPDATE_USER: {
      console.log(action);

      let user = action.payload;
      
      let newState = _.cloneDeep(state);
      newState.user= user;
      console.log(newState);
      return newState;
    }

    case ACTIONS.Types.UPDATE_ISAUTHENTICATED: {
      let newState = _.cloneDeep(state);
      let val = action.payload;
      newState.isAuthenticated=val;
     console.log(newState);
      return newState;
    }

    case ACTIONS.Types.EDIT_NOTE:{
      console.log(action);
      let newState=_.cloneDeep(state);
      newState.editedNote= {
        note:action.payload.note,
        index:action.payload.index
      };
      return newState
    }

    default:
      return state;
  }
};

export default todoReducer;