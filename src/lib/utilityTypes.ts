export type DeepPartial<T extends Record<any, any>> = {
  [K in keyof T]?: DeepPartial<T[K]>
}

export type Defaults<T extends string, U extends Record<string, unknown>, V> = {
  [K in T & string]: Omit<U, keyof V>
}

export type Optional<
  T extends Record<string, unknown>,
  U extends keyof T
> = Omit<T, U> &
  {
    [K in U]?: T[K]
  }

export type RequireOnly<T, U extends keyof T> = Partial<Omit<T, U>> &
  Required<
    {
      [K in U]: T[K]
    }
  >
