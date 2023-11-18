export interface User {
    name:string;
    jwt_token:string;
    email:string;
    profile_picture:string;
    profile_id:string;
    role:string;
}
export  interface LoginCreds {
    email:string;
    password:string;
}
export interface ResponseUser {
    name:string;
    jwt_token:string;
    email:string;
    profile_picture:string;
    profile_id:string;
    role:string;
}
export interface RegisterUser {
    name:string;
    email:string;
    password:string;
    profile_picture:string;
}
export interface RegisterAccount {
    name:string;
    email:string;
    password:string;
    profile_picture:string;
    role:string
}