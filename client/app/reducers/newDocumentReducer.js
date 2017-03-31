import initialState from '../../store/initialState';

const newDocumentReducer = (state=initialState.documents, action ) => {
  switch(action.type) {
    case "NEWDOCUMENT_SUCCESSFUL":
    return [...state, Object.assign({}, action.documents)];
  default:
    return state;
  }
};

export default newDocumentReducer;