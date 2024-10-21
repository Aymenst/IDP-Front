import { all } from 'redux-saga/effects';
import watchClients from './clients';
import watchAuth from './auth';
import watchLots from './lots';
import watchTenders from './tenders';
import watchWinners from './winners';
import watchBidders from './bidders';
import watchContracts from './contracts';
import watchCpvCodes from './CpvCodes';

export default function* rootSaga() {
  yield all([
    watchClients(),
    watchContracts(),
    watchAuth(),
    watchLots(),
    watchTenders(),
    watchWinners(),
    watchBidders(),
    watchCpvCodes(),
  ]);
}
