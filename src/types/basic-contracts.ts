export interface Identifiable {
    readonly id: string;
}

export interface IRepository<T extends Identifiable> {
    save(entity: T): Promise<void>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    delete(id: string): Promise<boolean>;
    findWhere(predicate: (item: T) => boolean): Promise<T[]>;
}

export interface Grade {
  readonly courseId: string;
  readonly score: number; // 0 - 100
  readonly date: Date;
}

export interface StaffIdCard {
    readonly cardNumber: string;
    readonly fullName: string;
    readonly department: Department;
    readonly issueDate: Date;
}

export type AcademicTitle = 
    | "Assistant"
    | "AssociateProfessor" 
    | "Professor";

export type StaffPosition =
    | "Administrator"
    | "Accountant"
    | "HRManager"
    | "Librarian";

export const EMPLOYEE_SALARY_COEFFICIENTS = {
    Administrator: 1.1,
    Professor: 1.5,
    AssociateProfessor: 1.25,
    Accountant: 1.2,
    HRManager: 1.1,
    Librarian: 1.1,
    Assistant: 1,
};

export type EmployeePosition =
    keyof typeof EMPLOYEE_SALARY_COEFFICIENTS;

export type Department =
    | "Administration"
    | "Admissions"
    | "AcademicAffairs"
    | "HumanResources"
    | "Finance"
    | "IT"
    | "Library"
    | "StudentAffairs"
    | "Examinations"
    | "Research"
    | "Facilities";

export const PASSING_SCORE = 60;

export interface ReportData {
    faculty: {
        id: string;
        name: string;
    };
    groups: {
        id: string;
        name: string;
        students: {
            id: string;
            fullName: string;
            email: string;
            gpa: number;
            grades: {
                courseId: string;
                score: number;
                date: string;
            }[];
        }[];
    }[];
    courses: {
        id: string;
        title: string;
        credits: number;
        instructor: string;
        prerequisites: string[];
    }[];
}
