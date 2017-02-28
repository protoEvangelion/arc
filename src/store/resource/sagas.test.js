import { expectSaga } from 'redux-saga-test-plan'
import * as actions from './actions'
import saga from './sagas'

describe('createResource', () => {
  it('calls success', () => {
    const api = {
      post: (url, data) => Promise.resolve({ id: 1, ...data }),
    }
    return expectSaga(saga, api)
      .call([api, api.post], '/resources', { foo: 'bar' })
      .put(actions.resourceCreateSuccess({ id: 1, foo: 'bar' }))
      .dispatch(actions.resourceCreateRequest({ foo: 'bar' }))
      .run({ timeout: 20, silenceTimeout: true })
  })

  it('calls failure', () => {
    const api = {
      post: () => Promise.reject('foo'),
    }
    return expectSaga(saga, api)
      .call([api, api.post], '/resources', { foo: 'bar' })
      .put(actions.resourceCreateFailure('foo'))
      .dispatch(actions.resourceCreateRequest({ foo: 'bar' }))
      .run({ timeout: 20, silenceTimeout: true })
  })
})

describe('readResourceList', () => {
  it('calls success', () => {
    const api = {
      get: () => Promise.resolve([1, 2, 3]),
    }
    return expectSaga(saga, api)
      .call([api, api.get], '/resources', { params: { limit: 1 } })
      .put(actions.resourceListReadSuccess([1, 2, 3]))
      .dispatch(actions.resourceListReadRequest({ limit: 1 }))
      .run({ timeout: 20, silenceTimeout: true })
  })

  it('calls failure', () => {
    const api = {
      get: () => Promise.reject('foo'),
    }
    return expectSaga(saga, api)
      .call([api, api.get], '/resources', { params: { limit: 1 } })
      .put(actions.resourceListReadFailure('foo'))
      .dispatch(actions.resourceListReadRequest({ limit: 1 }))
      .run({ timeout: 20, silenceTimeout: true })
  })
})

describe('readResourceDetail', () => {
  it('calls success', () => {
    const api = {
      get: () => Promise.resolve({ foo: 'bar' }),
    }
    return expectSaga(saga, api)
      .call([api, api.get], '/resources/1')
      .put(actions.resourceDetailReadSuccess(1, { foo: 'bar' }))
      .dispatch(actions.resourceDetailReadRequest(1))
      .run({ timeout: 20, silenceTimeout: true })
  })

  it('calls failure', () => {
    const api = {
      get: () => Promise.reject('foo'),
    }
    return expectSaga(saga, api)
      .call([api, api.get], '/resources/1')
      .put(actions.resourceDetailReadFailure(1, 'foo'))
      .dispatch(actions.resourceDetailReadRequest(1))
      .run({ timeout: 20, silenceTimeout: true })
  })
})

describe('updateResource', () => {
  it('calls success', () => {
    const api = {
      put: (url, data) => Promise.resolve({ id: 1, ...data }),
    }
    return expectSaga(saga, api)
      .call([api, api.put], '/resources/1', { foo: 'bar' })
      .put(actions.resourceUpdateSuccess(1, { id: 1, foo: 'bar' }))
      .dispatch(actions.resourceUpdateRequest(1, { foo: 'bar' }))
      .run({ timeout: 20, silenceTimeout: true })
  })

  it('calls failure', () => {
    const api = {
      put: () => Promise.reject('foo'),
    }
    return expectSaga(saga, api)
      .call([api, api.put], '/resources/1', { foo: 'bar' })
      .put(actions.resourceUpdateFailure(1, 'foo'))
      .dispatch(actions.resourceUpdateRequest(1, { foo: 'bar' }))
      .run({ timeout: 20, silenceTimeout: true })
  })
})

describe('deleteResource', () => {
  it('calls success', () => {
    const api = {
      delete: () => Promise.resolve(),
    }
    return expectSaga(saga, api)
      .call([api, api.delete], '/resources/1')
      .put(actions.resourceDeleteSuccess(1))
      .dispatch(actions.resourceDeleteRequest(1))
      .run({ timeout: 20, silenceTimeout: true })
  })

  it('calls failure', () => {
    const api = {
      delete: () => Promise.reject('foo'),
    }
    return expectSaga(saga, api)
      .call([api, api.delete], '/resources/1')
      .put(actions.resourceDeleteFailure(1, 'foo'))
      .dispatch(actions.resourceDeleteRequest(1))
      .run({ timeout: 20, silenceTimeout: true })
  })
})
