export interface Task {

}

export interface CreateTask {
    title:string;
    description:string
    due_date:string;
    priority:string;
    status:string;
    userEmail:string;
}

export interface ResponseTask {
    title:string;
    description:string
    due_date:string;
    priority:string;
    status:string;
    id:number;
}
