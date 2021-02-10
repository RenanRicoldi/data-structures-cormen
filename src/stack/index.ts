export class Stack<T> {
    private top: number
    private value: T[]

    constructor() {
        this.top = 0
        this.value = []
    }

    isEmpty() {
        return this.top === 0
    }

    push(element: T) {
        this.top++
        this.value[this.top] = element
    }

    pop() {
        if(this.isEmpty())
            return null
        
        this.top--
        return this.value[this.top+1]
    }

    display() {
        let result = ''
        for(let i = this.top; i > 0; i--) {
            const info = `| ${this.value[i]} |`
            for(let j = 0; j < info.length; j++) {
                result += '_'
            }
            result += '\n' + info + '\n'
        }
        console.log(result)
        console.log(`------------------`)
        console.log(`Stack size: ${this.top}`)
    }
}