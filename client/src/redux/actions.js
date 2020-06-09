const Types = {
    UPDATE_USER: "UPDATE_USER",
    UPDATE_ISAUTHENTICATED: "UPDATE_ISAUTHENTICATED",
    BACKDROP_CLICKED:"BACKDROP_CLICKED",
    SHOW_MODAL:"SHOW_MODAL",
    EDIT_NOTE:"EDIT_NOTE"
  };
  // actions
  const updateUser = user => ({
    type: Types.UPDATE_USER,
    payload: user
  });
  
  const updateIsauthenticated = val => ({
    type: Types.UPDATE_ISAUTHENTICATED,
    payload: val
  });


  const editNote=(editedNote)=>({
    type:Types.EDIT_NOTE,
    payload:editedNote
  })

  
  export default {
    updateUser,
    updateIsauthenticated,
    editNote,
    Types
  };