/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import uiReducer from './modules/ui';
import initval from './modules/initForm';
import login from './modules/login';
import treeTable from '../containers/Tables/reducers/treeTbReducer';
import crudTable from '../containers/Tables/reducers/crudTbReducer';
import crudTableForm from '../containers/Tables/reducers/crudTbFrmReducer';
import authReducer from './reducers/authReducer';
import tendersReducer from './reducers/tendersReducer';
import lotsReducer from './reducers/lotsReducer';
import winnersReducer from './reducers/winnersReducers';
import biddersReducer from './reducers/biddersReducer';
import requestHandlerReducer from './reducers/requestHandlerReducer';
import clientsReducer from './reducers/clientsReducer';
import contractsReducer from './reducers/contractsReducer';
import contactsReducer from './reducers/contactsReducer';
import checklistsReducer from './reducers/checklistsReducer';
import CpvCodeReducer from './reducers/CpvCodeReducer';

/**
 * Branching reducers to use one reducer for many components
 */

function branchReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { branch } = action;
    const isInitializationCall = state === undefined;
    if (branch !== reducerName && !isInitializationCall) {
      return state;
    }
    return reducerFunction(state, action);
  };
}

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    auth: authReducer,
    clients: clientsReducer,
    requestHandler: requestHandlerReducer,
    contracts: contractsReducer,
    contacts: contactsReducer,
    checklists: checklistsReducer,
    tenders: tendersReducer,
    lots: lotsReducer,
    bidders: biddersReducer,
    winners: winnersReducer,
    cpvCodes: CpvCodeReducer,
    ui: uiReducer,
    initval,
    login,
    treeTableArrow: branchReducer(treeTable, 'treeTableArrow'),
    treeTablePM: branchReducer(treeTable, 'treeTablePM'),
    crudTableDemo: branchReducer(crudTable, 'crudTableDemo'),
    crudTableForm,
    crudTbFrmDemo: branchReducer(crudTableForm, 'crudTbFrmDemo'),
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
};