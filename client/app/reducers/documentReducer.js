import initialState from '../../store/initialState';

const documentsReducer = (state=initialState.documents, action ) => {
  switch(action.type) {
    case "DOCUMENTS_SUCCESSFUL":
    console.log(' action.documents', action.documents)
    console.log('===+]', Object.assign({},  ...state, action.documents));

    return Object.assign({},  ...state, action.documents);
  default:
    return state;
  }
};

export default documentsReducer;