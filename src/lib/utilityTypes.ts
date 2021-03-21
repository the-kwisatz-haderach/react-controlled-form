export type DeepPartial<T extends Record<any, any>> = {
  [K in keyof T]?: DeepPartial<T[K]>
}

export type Defaults<T extends string, U extends Record<string, unknown>, V> = {
  [K in T & string]: Omit<U, keyof V>
}
