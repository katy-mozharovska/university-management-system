import { type AcademicTitle} from "../types/basic-contracts.js"; 
import { Employee } from "./employee.js";

export abstract class Teacher extends Employee {
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        public readonly academicTitle: AcademicTitle,
        baseSalary: number
    ) {
        super(id, firstName, lastName, email, academicTitle, baseSalary);
    }
}

export class Professor extends Teacher {
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        baseSalary: number
    ) {
        super(id, firstName, lastName, email, "Professor", baseSalary);
    }

    override getRoleDescription(): string {
        return `Professor (${this.fullName})`;
    }
}

export class AssociateProfessor extends Teacher {
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        baseSalary: number
    ) {
        super(id, firstName, lastName, email, "AssociateProfessor", baseSalary);
    }

    override getRoleDescription(): string {
        return `Associate Professor (${this.fullName})`;
    }
}

export class Assistant extends Teacher {
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        baseSalary: number
    ) {
        super(id, firstName, lastName, email, "Assistant", baseSalary);
    }

    override getRoleDescription(): string {
        return `Assistant (${this.fullName})`;
    }
}