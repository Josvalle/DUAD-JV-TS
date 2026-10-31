import { useSyncExternalStore } from "react"
import type { Identifiable, Store } from "./Store"

export function useStoreItems<T extends Identifiable>(store: Store<T>): T[] {
    return useSyncExternalStore(store.subscribe, store.getSnapshot)
}
