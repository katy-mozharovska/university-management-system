
import { mkdir, writeFile } from "node:fs/promises";
import {
    Professor,
    AssociateProfessor,
    Assistant
} from "./domain/teacher.js";
import { Staff } from "./domain/staff.js";
import { Student } from "./domain/student.js";
import { Course } from "./domain/course.js";
import { Faculty } from "./domain/faculty.js";
import { InMemoryRepository } from "./repositories/in-memory-repository.js";
import { XmlReportGenerator } from "./report/xml-report-generator.js";
import { JsonReportGenerator } from "./report/json-report-generator.js";
import type { Grade } from "./types/basic-contracts.js";

async function main(): Promise<void> {
    console.log("\n========== EMPLOYEES ==========");

    const professor = new Professor(
        "T001",
        "Taras",
        "Shevchenko",
        "taras.shevchenko@university.com",
        4000
    );

    const associateProfessor = new AssociateProfessor(
        "T002",
        "Illarion",
        "Pavliuk",
        "illarion.pavliuk@university.com",
        3500
    );

    const assistant = new Assistant(
        "T003",
        "Andriy",
        "Semiankiv",
        "andriy.semiankiv@university.com",
        2500
    );

    const administrator = new Staff(
        "S001",
        "Serhiy",
        "Sternenko",
        "serhiy.sternenko@university.com",
        "Administrator",
        3000,
        "Administration"
    );

    const employees = [
        professor,
        associateProfessor,
        assistant,
        administrator
    ];

    for (const employee of employees) {
        console.log(
            `${employee.getRoleDescription()} | ` +
            `Salary: $${employee.calculateSalary().toFixed(2)}`
        );
    }

    console.log("\nStaff ID card:");
    console.log(administrator.generateStaffIdCard());

    console.log("\n========== STUDENTS AND GRADES ==========");

    const student1 = new Student(
        "ST001",
        "Maks",
        "Kidruk",
        "maks.kidruk@student.com",
        "CARD-001"
    );

    const student2 = new Student(
        "ST002",
        "Olena",
        "Pshenychna",
        "olena.pshenychna@student.com",
        "CARD-002"
    );

    const student3 = new Student(
        "ST003",
        "Pavlo",
        "Derevianko",
        "pavlo.derevianko@student.com",
        "CARD-003"
    );

    const grades: Grade[] = [
        { courseId: "C001", score: 90, date: new Date("2026-05-15") },
        { courseId: "C002", score: 85, date: new Date("2026-06-10") },
        { courseId: "C001", score: 45, date: new Date("2026-05-15") },
        { courseId: "C001", score: 75, date: new Date("2026-05-15") },
        { courseId: "C002", score: 95, date: new Date("2026-06-10") }
    ];

    student1.addGrade(grades[0]);
    student1.addGrade(grades[1]);

    student2.addGrade(grades[2]);

    student3.addGrade(grades[3]);
    student3.addGrade(grades[4]);

    const students = [student1, student2, student3];

    for (const student of students) {
        console.log(
            `${student.fullName} | ` +
            `GPA: ${student.calculateGPA()} | ` +
            `Passed C001: ${student.hasPassedCourse("C001")}`
        );
    }

    console.log("\n========== COURSE PREREQUISITES ==========");

    const introductionToProgramming = new Course(
        "C001",
        "Introduction to Programming",
        5,
        professor
    );

    const advancedProgramming = new Course(
        "C002",
        "Advanced Programming",
        6,
        associateProfessor,
        [introductionToProgramming]
    );

    const courses = [
        introductionToProgramming,
        advancedProgramming
    ];

    for (const student of students) {
        const canEnroll = advancedProgramming.canStudentEnroll(student);

        console.log(
            `${student.fullName} can enroll in ` +
            `"${advancedProgramming.title}": ${canEnroll}`
        );
    }

    console.log("\n========== FACULTY AND GROUPS ==========");

    const faculty = new Faculty(
        "F001",
        "Faculty of Computer Science"
    );

    const group1 = faculty.createGroup(
        "G001",
        "CS-101",
        professor
    );

    const group2 = faculty.createGroup(
        "G002",
        "CS-102",
        associateProfessor
    );

    group1.addStudent(student1);
    group1.addStudent(student2);

    group2.addStudent(student3);

    for (const group of faculty.getAllGroups()) {
        console.log(`\nGroup: ${group.name}`);
        console.log(`Curator: ${group.curator?.fullName ?? "Not assigned"}`);

        for (const student of group.getStudents()) {
            console.log(
                `  - ${student.fullName}, GPA: ${student.calculateGPA()}`
            );
        }

        console.log(`Group average GPA: ${group.getGroupAverageScore()}`);
    }

    console.log("\n========== REPOSITORY ==========");

    const studentRepository = new InMemoryRepository<Student>();

    for (const student of students) {
        await studentRepository.save(student);
    }

    const foundStudent = await studentRepository.findById("ST001");

    console.log(
        "Find by ID:",
        foundStudent?.fullName ?? "Student not found"
    );

    const highPerformingStudents = await studentRepository.findWhere(
        student => student.calculateGPA() >= 80
    );

    console.log("\nStudents with GPA >= 80:");

    for (const student of highPerformingStudents) {
        console.log(`  - ${student.fullName}: ${student.calculateGPA()}`);
    }

    console.log(
        "\nTotal students in repository:",
        (await studentRepository.findAll()).length
    );

    const deleted = await studentRepository.delete("ST002");

    console.log("Student ST002 deleted:", deleted);

    console.log(
        "Students remaining:",
        (await studentRepository.findAll()).length
    );

    console.log("\n========== REPORT GENERATION ==========");

    const xmlGenerator = new XmlReportGenerator(faculty, courses);
    const jsonGenerator = new JsonReportGenerator(faculty, courses);

    const xmlReport = xmlGenerator.generateReport();
    const jsonReport = jsonGenerator.generateReport();

    await mkdir("reports", { recursive: true });

    await Promise.all([
        writeFile("reports/academic-report.xml", xmlReport, "utf-8"),
        writeFile("reports/academic-report.json", jsonReport, "utf-8")
    ]);

    console.log("XML report generated: reports/academic-report.xml");
    console.log("JSON report generated: reports/academic-report.json");

    console.log("\n========== DEMO COMPLETED ==========");
}

main().catch(error => {
    console.error("Application failed:", error);
});
