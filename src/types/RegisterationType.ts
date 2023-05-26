export interface postRequestbodyType{
    name:string,
    email:string,
    password:string,
    age:number | null,
    date:Date | string | null,
    fileUpload:File | null,
    selectProgramming:string,
    gender:string,
    languageCheckbox:string[]

}
export interface postResponseBodyType{
    
    
    message:string
    
}