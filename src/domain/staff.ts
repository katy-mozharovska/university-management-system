import {  type StaffPosition,
    type Department,
    type StaffIdCard } from "../types/basic-contracts.js"; 
import { Employee } from "./employee.js";

export class Staff extends Employee {
    private readonly _idCard: StaffIdCard;
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        position: StaffPosition,
        baseSalary: number,
        public readonly department: Department,
    ) {
        super(id, firstName, lastName, email, position, baseSalary);

        this._idCard = {
            cardNumber: `STAFF-${this.id}`,
            fullName: this.fullName,
            department: this.department,
            issueDate: new Date()
        };
    }

    public generateStaffIdCard(): StaffIdCard {
        return { ...this._idCard };
    }

    override getRoleDescription(): string {
        return `${this.position} (${this.fullName})`;
    }
}