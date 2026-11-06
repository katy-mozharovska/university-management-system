import { Person } from "./person.js"
import { PASSING_SCORE, type Grade } from "../types/basic-contracts.js"; 

export class Student extends Person {
    private _grades: Grade[] = [];

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        public readonly studentCardNumber: string
    ) {
        super(id, firstName, lastName, email);
    }

    public addGrade(grade: Grade): void {
        if (grade.score < 0 || grade.score > 100) {
            throw new Error(`The grade ${grade.score} is invalid. Grade should be between 0 and 100.`)
        }
        this._grades.push(grade);
    }

    public getGrades(): readonly Grade[] {
        return this._grades;
    }

    public calculateGPA(): number {
        if (this._grades.length === 0) return 0;
        const total = this._grades.reduce((acc, curr) => acc + curr.score, 0);
        return Number((total / this._grades.length).toFixed(2));
    }

    public hasPassedCourse(courseId: string): boolean {
        const courseGrade = this._grades.find(grade => grade.courseId === courseId);
        if (!courseGrade) return false;
        return courseGrade.score >= PASSING_SCORE;
    }

    override getRoleDescription(): string {
        return `Student (Student Card Number: ${this.studentCardNumber}), GPA: ${this.calculateGPA()}`;
    }
}
