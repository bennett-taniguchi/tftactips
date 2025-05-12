import CrudService from "./crudapiservice";

export default function retrieveBuild(id:string,token:string,email:string) {
    console.log(id,token,email)
    return CrudService.getByPartitionKey("tft_builds","id",id,email,token)


    // call 
}