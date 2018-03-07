
//This file was generated by Typewriter with some custom modification



export namespace DTO {   
export module Queries {
    export interface searchCriteria {
       id:number
    }
  }
  export module Result {
    export interface Info {
       firstName:string
       lastName:string 
    }
    export interface employeeDetails extends Info {

        id:number
        nameDiscountFlag:boolean
        payCheckAfterDeductions:number
        employeePremium:number
        dependentsPremium:number
        dependents?:Info[]
     }
   
  }

  export module Commands {
    export interface Info {
        firstName:string
        lastName:string 
     }
    export interface addEmployee {
       employee:Info
       dependents:Info[]
    }
  }
}