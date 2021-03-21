import { SyntheticEvent } from 'react'

type EventInterceptor<E extends Element> = (
  e: SyntheticEvent<E>
) => SyntheticEvent<E>
type EventHandler<E extends Element> = (e: SyntheticEvent<E>) => void

const createEventInterceptor = <T extends Element>(
  interceptor: EventInterceptor<T>
) => (cb: EventHandler<T>) => (
  e: SyntheticEvent<T>
): ReturnType<EventHandler<T>> => {
  const enhancedEvent = interceptor(e)
  return cb(enhancedEvent)
}

export const defaultPreventer = createEventInterceptor<HTMLFormElement>((e) => {
  e.preventDefault()
  return e
})

export default createEventInterceptor
