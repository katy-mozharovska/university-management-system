import type { Identifiable } from "../types/basic-contracts.js"; 

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export abstract class Person implements Identifiable {
    constructor(
        public readonly id: string,
        public firstName: string,
        public lastName: string,
        private _email: string
    ) {
        this.email = _email;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;

    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        const normalizedEmail = value.trim();
        if (EMAIL_REGEX.test(normalizedEmail)) {
            this._email = normalizedEmail;
        } else {
            throw new Error(`Invalid email: ${value}`);
        }
    }

    abstract getRoleDescription(): string;
}
