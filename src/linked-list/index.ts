interface Element<T> {
    next: Element<T> | null
    key: T
    previous:  Element<T>
}

export class LinkedList<T> {
    private head: Element<T> | null
    private nil: Element<T>

    constructor() {
        this.head = null
        this.nil = {
            next: this.head,
            key: {} as T,
            previous: {} as Element<T>
        }
    }

    search(comparisonFn: (key: T) => boolean) {
        let current = this.nil.next

        while(current && current !== this.nil && !comparisonFn(current.key))
            current = current.next

        return  current
    }

    insert(key: T) {
        const element: Element<T> = {
            next: this.nil.next,
            key,
            previous: this.nil
        }

        if(this.nil.next)
            this.nil.next.previous = element
            
        this.nil.next = element
    }

    delete(element: Element<T>) {
        if(element.next)
            element.next.previous = element.previous

        element.previous.next = element.next
    }

    display() {
        let result = 'Head | '
        let current = this.nil.next
        let size = 0

        while(current && current !== this.nil) {
            result += current.key + ' => '
            current = current.next
            size++
        }
        console.log(result + 'NIL')
        console.log('-----------------')
        console.log(`List size: ${size}`)
    }
}