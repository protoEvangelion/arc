import { expectSaga } from 'redux-saga-test-plan'
import * as actions from './actions'
import saga from './sagas'

describe('createPost', () => {
  it('calls success', () => {
    const api = {
      post: (url, data) => Promise.resolve({ id: 1, ...data }),
    }

    return expectSaga(saga, api)
      .call([api, api.post], '/posts', { title: 'test' })
      .put(actions.postCreateSuccess({ id: 1, title: 'test' }))
      .dispatch(actions.postCreateRequest({ title: 'test' }))
      .run({ timeout: 20, silenceTimeout: true })
  })

  it('calls failure', () => {
    const api = {
      post: () => Promise.reject('foo'),
    }

    return expectSaga(saga, api)
      .call([api, api.post], '/posts', { title: 'test' })
      .put(actions.postCreateFailure('foo'))
      .dispatch(actions.postCreateRequest({ title: 'test' }))
      .run({ timeout: 20, silenceTimeout: true })
  })
})

describe('readPostList', () => {
  it('calls success', () => {
    const api = {
      get: () => Promise.resolve([1, 2, 3]),
    }

    return expectSaga(saga, api)
      .call([api, api.get], '/posts', { params: { _limit: 1 } })
      .put(actions.postListReadSuccess([1, 2, 3]))
      .dispatch(actions.postListReadRequest({ _limit: 1 }))
      .run({ timeout: 20, silenceTimeout: true })
  })

  it('calls failure', () => {
    const api = {
      get: () => Promise.reject('foo'),
    }

    return expectSaga(saga, api)
      .call([api, api.get], '/posts', { params: { _limit: 1 } })
      .put(actions.postListReadFailure('foo'))
      .dispatch(actions.postListReadRequest({ _limit: 1 }))
      .run({ timeout: 20, silenceTimeout: true })
  })
})
