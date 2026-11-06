import { Identifiable } from "../types/basic-contracts.js";
import { Student } from "./student.js";
import { Teacher } from "./teacher.js";

export class AcademicGroup implements Identifiable {
    private _students: Map<string, Student> = new Map();

    constructor(
        public readonly id: string,
        public name: string,
        public curator?: Teacher
    ) {}

    public addStudent(student: Student): void {
        if (this._students.has(student.id)) {
            throw new Error(`Student ${student.fullName} already is a member of the group ${this.name}.`);
        }
        this._students.set(student.id, student);
    }

    public removeStudent(studentId: string): boolean {
        return this._students.delete(studentId);
    }

    public getStudents(): Student[] {
        return Array.from(this._students.values());
    }

    public getGroupAverageScore(): number {
        const list = this.getStudents();
        if (list.length === 0) return 0;
        const totalGPA = list.reduce((acc, s) => acc + s.calculateGPA(), 0);
        return Number((totalGPA / list.length).toFixed(2));
    }
}
