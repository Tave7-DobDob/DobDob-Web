import { combineReducers } from 'redux';
import user from './user'
import postInfo from './postInfo'
import profileInfo from './profileInfo'
import { persistReducer } from 'redux-persist';	// 추가
import storage from 'redux-persist/lib/storage';	// 추가

const persistConfig = {
  key: 'root',
  storage,
}	// 추가


	
const rootReducer = combineReducers({
  user,
  postInfo,
  profileInfo
});

const persistedReducer = persistReducer(persistConfig, rootReducer);	// 추가

export default persistedReducer;