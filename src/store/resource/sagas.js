import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'

export function* createResource(newData, api) {
  try {
    const data = yield call([api, api.post], '/resources', newData)
    yield put(actions.resourceCreateSuccess(data))
  } catch (e) {
    yield put(actions.resourceCreateFailure(e))
  }
}

export function* readResourceList(params, api) {
  try {
    const data = yield call([api, api.get], '/resources', { params })
    yield put(actions.resourceListReadSuccess(data))
  } catch (e) {
    yield put(actions.resourceListReadFailure(e))
  }
}

export function* readResourceDetail(needle, api) {
  try {
    const data = yield call([api, api.get], `/resources/${needle}`)
    yield put(actions.resourceDetailReadSuccess(needle, data))
  } catch (e) {
    yield put(actions.resourceDetailReadFailure(needle, e))
  }
}

export function* updateResource(needle, newData, api) {
  try {
    const data = yield call([api, api.put], `/resources/${needle}`, newData)
    yield put(actions.resourceUpdateSuccess(needle, data))
  } catch (e) {
    yield put(actions.resourceUpdateFailure(needle, e))
  }
}

export function* deleteResource(needle, api) {
  try {
    yield call([api, api.delete], `/resources/${needle}`)
    yield put(actions.resourceDeleteSuccess(needle))
  } catch (e) {
    yield put(actions.resourceDeleteFailure(needle, e))
  }
}

export function* watchResourceCreateRequest(api) {
  while (true) {
    const { data } = yield take(actions.RESOURCE_CREATE_REQUEST)
    yield call(createResource, data, api)
  }
}

export function* watchResourceListReadRequest(api) {
  while (true) {
    const { params } = yield take(actions.RESOURCE_LIST_READ_REQUEST)
    yield call(readResourceList, params, api)
  }
}

export function* watchResourceDetailReadRequest(api) {
  while (true) {
    const { needle } = yield take(actions.RESOURCE_DETAIL_READ_REQUEST)
    yield call(readResourceDetail, needle, api)
  }
}

export function* watchResourceUpdateRequest(api) {
  while (true) {
    const { needle, data } = yield take(actions.RESOURCE_UPDATE_REQUEST)
    yield call(updateResource, needle, data, api)
  }
}

export function* watchResourceDeleteRequest(api) {
  while (true) {
    const { needle } = yield take(actions.RESOURCE_DELETE_REQUEST)
    yield call(deleteResource, needle, api)
  }
}

export default function* (api) {
  yield fork(watchResourceCreateRequest, api)
  yield fork(watchResourceListReadRequest, api)
  yield fork(watchResourceDetailReadRequest, api)
  yield fork(watchResourceUpdateRequest, api)
  yield fork(watchResourceDeleteRequest, api)
}
