import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'

export function* createPost(newData, api) {
  try {
    const data = yield call([api, api.post], '/posts', newData)
    yield put(actions.postCreateSuccess(data))
  } catch (e) {
    yield put(actions.postCreateFailure(e))
  }
}

export function* readPostList(params, api) {
  try {
    const data = yield call([api, api.get], '/posts', { params })
    yield put(actions.postListReadSuccess(data))
  } catch (e) {
    yield put(actions.postListReadFailure(e))
  }
}

export function* watchPostCreateRequest(api) {
  while (true) {
    const { data } = yield take(actions.POST_CREATE_REQUEST)
    yield call(createPost, data, api)
  }
}

export function* watchPostListReadRequest(api) {
  while (true) {
    const { params } = yield take(actions.POST_LIST_READ_REQUEST)
    yield call(readPostList, params, api)
  }
}

export default function* (api) {
  yield fork(watchPostCreateRequest, api)
  yield fork(watchPostListReadRequest, api)
}
