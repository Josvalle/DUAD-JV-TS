export interface Identifiable {
    id: number;
}

export class Store<T extends Identifiable> {
    private items: T[] = []
    private listeners: Set<() => void> = new Set()
    private snapshot: T[] = []

    add(item: T): void {
        this.items = [...this.items, item]
        this.notify()
    }

    getAll(): T[] {
        return [...this.items]
    }

    findById(id: number): T | undefined {
        return this.items.find((item) => item.id === id)
    }

    remove(id: number): boolean {
        const exists = this.items.some((item) => item.id === id)
        if (!exists){
            return false
        }
        this.items = this.items.filter((item) => item.id !== id)
        this.notify()
        return true
    }

    update(id: number, changes: Partial<Omit<T, "id">>): T | undefined {
        const current = this.findById(id)
        if (current === undefined){
            return undefined
        }
        const updated: T = {...current, ...changes}
        this.items = this.items.map((item) => item.id === id ? updated : item)
        this.notify()
        return updated
    }

    find(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate)
    }

    nextId(): number {
        return this.items.reduce((maximum: number, item: T) => item.id > maximum ? item.id : maximum, 0) + 1
    }

    subscribe = (listener: () => void): (() => void) => {
        this.listeners.add(listener)
        return () => {
            this.listeners.delete(listener)
        }
    }

    getSnapshot = (): T[] => {
        return this.snapshot
    }

    private notify(): void {
        this.snapshot = [...this.items]
        this.listeners.forEach((listener) => listener())
    }
}
