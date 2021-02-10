export class Queue<T> {
    private head: number
    private tail: number
    private elements: T[]

    constructor() {
        this.head = this.tail = 0
        this.elements = []
    }

    enqueue(element: T) {
        this.elements[this.tail] = element
        this.tail++
    }

    dequeue() {
        if(this.head === this.tail)
            return null

        this.head++
        return this.elements[this.head-1]
    }


    display() {
        let result = 'End => '
        for(let i = this.tail-1; i >= this.head; i--) {
            result +=  `${this.elements[i]} | `            
        }
        result += 'Start'
        console.log(result)
        console.log(`------------------`)
        console.log(`Queue length: ${this.tail-this.head}`)
    }
}