import { Tasks } from "./tasks";
import { Teams } from "./teams";
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

export interface Projects {

   
    name:string;
    description:string;
    start_date:string;
    end_date:string;
    project_logo:string;
    toAddUsers:string[];
}


export interface ProjectModel {

   
    name:string;
    description:string;
    start_date:string;
    end_date:string;
    project_logo:string;
    managerEmail : string;
    teamsId : string[];
}
