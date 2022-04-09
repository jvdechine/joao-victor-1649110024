export interface Child {
    _id: string;
    title: string;
    description: string;
    toDoId: string;
    order: number;
    done: boolean;
    fatherId: string;
    __v: number;
}

export default interface ToDoItem {
    _id: string;
    title: string;
    description: string;
    order: number;
    done: boolean;
    children: Child[];
    toDoId: string;
}