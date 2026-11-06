import { Course } from "../domain/course.js";
import { Faculty } from "../domain/faculty.js";
import { ReportData } from "../types/basic-contracts.js";

export abstract class ReportGenerator {
    constructor(
        protected readonly faculty: Faculty,
        protected readonly courses: readonly Course[]
    ) {}

    protected buildReportData(): ReportData {
        const groups = this.faculty.getAllGroups().map(group => ({
            id: group.id,
            name: group.name,
            students: group.getStudents().map(student => ({
                id: student.id,
                fullName: student.fullName,
                email: student.email,
                gpa: student.calculateGPA(),
                grades: student.getGrades().map(grade => ({
                    courseId: grade.courseId,
                    score: grade.score,
                    date: grade.date.toISOString()
                }))
            }))
        }));

        const courses = this.courses.map(course => ({
            id: course.id,
            title: course.title,
            credits: course.credits,
            instructor: course.instructor.fullName,
            prerequisites: course.prerequisites.map(
                prerequisite => prerequisite.id
            )
        }));

        return {
            faculty: {
                id: this.faculty.id,
                name: this.faculty.name
            },
            groups,
            courses
        };
    }

    public generateReport(): string {
        const data = this.buildReportData();

        return (
            this.generateHeader() +
            this.generateBody(data) +
            this.generateFooter()
        );
    }

    protected abstract generateHeader(): string;
    protected abstract generateBody(data: ReportData): string;
    protected abstract generateFooter(): string;
}

export class XmlReportGenerator extends ReportGenerator {
    protected generateHeader(): string {
        return (
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<academicReport>\n'
        );
    }
    protected generateBody(): string {
        // We'll implement this next.
        return "";
    }
    protected generateFooter(): string {
        return "</academicReport>";
    }
}
