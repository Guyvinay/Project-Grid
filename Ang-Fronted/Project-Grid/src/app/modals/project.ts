export interface Project {
    id:number
    name:string;
    description:string;
    project_logo:string;
    start_date:string;
    end_date:string
}
export interface CreatedProject {
    name:string;
    description:string;
    start_date:string;
    end_date:string;
    project_logo:string;
    managerEmail : string;
    teamsId : string[];
}