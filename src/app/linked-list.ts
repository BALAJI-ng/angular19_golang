export class Node<T> {
    constructor(public value: T, public next: Node<T> | null = null) { }
}

export class LinkedList<T> {
    head: Node<T> | null = null;

    add(value: T): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let temp = this.head;
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
    }

    print(): void {
        let temp = this.head;
        while (temp) {
            console.log(temp.value);
            temp = temp.next;
        }
    }
}