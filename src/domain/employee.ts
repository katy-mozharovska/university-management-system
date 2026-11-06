import { Person } from "./person.js";
import { EMPLOYEE_SALARY_COEFFICIENTS,
    type EmployeePosition} from "../types/basic-contracts.js"; 

export abstract class Employee extends Person {
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        public readonly position: EmployeePosition,
        protected readonly baseSalary: number
    ) {
        super(id, firstName, lastName, email);
    }

    public calculateSalary(): number {
        return this.baseSalary * EMPLOYEE_SALARY_COEFFICIENTS[this.position];
    }
}
