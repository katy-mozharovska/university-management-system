import { Identifiable } from "../types/basic-contracts.js";
import { Student } from "./student.js";
import { Teacher } from "./teacher.js";

export class Course implements Identifiable {
    constructor(
        public readonly id: string,
        public title: string,
        public credits: number,
        private _instructor: Teacher,
        public readonly prerequisites: readonly Course[] = []
    ) {}

    get instructor(): Teacher {
        return this._instructor;
    }

    public reassignInstructor(newInstructor: Teacher): void {
        console.log(`[Course Info] Instructor change "${this.title}": ${newInstructor.fullName}`);
        this._instructor = newInstructor;
    }

    public canStudentEnroll(student: Student): boolean {
        if (this.prerequisites.length === 0) return true;
        return this.prerequisites.every(course => student.hasPassedCourse(course.id));
    }
}