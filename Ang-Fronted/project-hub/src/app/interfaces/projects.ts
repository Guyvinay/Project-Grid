import { Users } from "./users";


export interface Project {

    id:number;
    name:string;
    description:string;
    start_date:string;
    end_date:string;
    project_logo:string;
    users:Users[];
}
