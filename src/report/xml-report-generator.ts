import { type ReportData } from "../types/basic-contracts.js";
import { ReportGenerator } from "./report-generator.js";

function escapeXml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

export class XmlReportGenerator extends ReportGenerator {

    protected generateHeader(): string {
        return '<?xml version="1.0" encoding="UTF-8"?>\n<academicReport>\n';
    }

    protected generateBody(data: ReportData): string {
        const groupsXml = data.groups.map(group => {
            const studentsXml = group.students.map(student => {
                const gradesXml = student.grades.map(grade => `
                    <grade courseId="${escapeXml(grade.courseId)}">
                        <score>${grade.score}</score>
                        <date>${escapeXml(grade.date)}</date>
                    </grade>`).join("");

                return `
                    <student id="${escapeXml(student.id)}">
                        <fullName>${escapeXml(student.fullName)}</fullName>
                        <email>${escapeXml(student.email)}</email>
                        <gpa>${student.gpa.toFixed(2)}</gpa>
                        <grades>${gradesXml}
                        </grades>
                    </student>`;
            }).join("");

            return `
            <group id="${escapeXml(group.id)}">
                <name>${escapeXml(group.name)}</name>
                <students>${studentsXml}
                </students>
            </group>`;
        }).join("");

        const coursesXml = data.courses.map(course => {
            const prerequisitesXml = course.prerequisites.map(id =>
                `<prerequisite>${escapeXml(id)}</prerequisite>`
            ).join("");

            return `
            <course id="${escapeXml(course.id)}">
                <title>${escapeXml(course.title)}</title>
                <credits>${course.credits}</credits>
                <instructor>${escapeXml(course.instructor)}</instructor>
                <prerequisites>${prerequisitesXml}</prerequisites>
            </course>`;
        }).join("");

        return `
    <faculty id="${escapeXml(data.faculty.id)}">
        <name>${escapeXml(data.faculty.name)}</name>
        <groups>${groupsXml}
        </groups>
    </faculty>
    <courses>${coursesXml}
    </courses>
`;
    }

    protected generateFooter(): string {
        return "</academicReport>";
    }
}