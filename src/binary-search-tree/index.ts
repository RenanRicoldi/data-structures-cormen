interface Element<T> {
    key: T
    left: Element<T> | null
    right: Element<T> | null
    parent: Element<T> | null
}

export class BinarySearchTree<T> {
    private NIL: Element<T>
    private root: Element<T>
    
    constructor() {
        this.NIL = {
            key: {} as T,
            left: null,
            right: null,
            parent: null,
        }
        this.root = this.NIL
    }

    get getRoot() {
        return this.root
    }

    insert(key: T, firstLesserThenSecond: (element1: T, element2: T) => boolean) {
        let y = this.NIL
        let x = this.root
        let z = {
            left: this.NIL,
            right: this.NIL,
            parent: this.NIL,
            key
        }

        while(x !== this.NIL) {
            y = x

            if(firstLesserThenSecond(z.key, x.key))
                x = x.left as Element<T>
            else
                x = x.right as Element<T>
        }

        z.parent = y

        if(y === this.NIL)
            this.root = z
        else if(firstLesserThenSecond(z.key, y.key))
            y.left = z
        else
            y.right = z
    }

    /** Perfoms an iterative search by the passed node, comparing the elements with 
     * {comparisonFn} that should return 0 if your key is equal to the element, -1 the your key is lesser than the element and 1 if your key is bigger than the element 
     * */
    search(initialNode: Element<T>, comparisonFn: (element: T) => number): Element<T>  {
        while(initialNode !== this.NIL && comparisonFn(initialNode.key) !== 0) {
            if(comparisonFn(initialNode.key) < 0)
                initialNode = initialNode.left as Element<T>
            else
                initialNode = initialNode.right as Element<T>
        }
        return initialNode
    }

    minimun(initialNode: Element<T>) {
        while(initialNode.left !== this.NIL)
            initialNode = initialNode.left as Element<T>
        
        return initialNode
    }

    maximun(initialNode: Element<T>) {
        while(initialNode.right !== this.NIL)
            initialNode = initialNode.right as Element<T>
        
        return initialNode
    }

    sucessor(initialNode: Element<T>) {
        if(initialNode.right !== this.NIL && initialNode.right !== null)
            return this.minimun(initialNode.right)
        
        let y = initialNode.parent
        while(y !== this.NIL && initialNode === y?.right) {
            initialNode = y
            y = y.parent
        }

        return y
    }

    private transplant(element1: Element<T>, element2: Element<T>) {
        if(element1 === this.NIL)
            this.root = element2
        else if(element1 === element1.parent?.left)
            element1.parent.left = element2
        else if(element1.parent)
            element1.parent.right= element2
        
        if(element2 !== this.NIL)
            element2.parent = element1.parent
    }

    delete(element: Element<T>) {
        if(element.left === this.NIL && element.right)
            this.transplant(element, element.right)
        else if(element.right === this.NIL && element.left)
            this.transplant(element, element.left)
        else if (element.right) {
            let y = this.minimun(element.right)
            if(y.parent !== element && y.right) {
                this.transplant(y, y.right)
                y.right = element.right
                y.right.parent = y
            }
            this.transplant(element, y)
            y.left = element.left
            if(y.left)
                y.left.parent = y
        }
    }
}