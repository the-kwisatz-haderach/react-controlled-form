export type DeepPartial<T extends Record<any, any>> = {
  [K in keyof T]?: DeepPartial<T[K]>
}
