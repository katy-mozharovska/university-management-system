# University Management System

A TypeScript application demonstrating object-oriented programming principles and design patterns through a simplified university management system.

## Features

- **Inheritance and polymorphism** – Person, Student, Employee, Teacher, and Staff hierarchies.
- **Student management** – student records, grades, and GPA calculation.
- **Course management** – instructors and prerequisite validation.
- **Faculty management** – academic groups and student assignments.
- **Generic Repository** – in-memory CRUD operations and predicate-based filtering.
- **Staff management** – employee positions, salary calculation, and staff ID card generation.
- **Report generation** – XML and JSON reports using the Template Method design pattern.

## Technologies

- TypeScript
- Node.js
- npm

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/katy-mozharovska/university-management-system.git
cd university
npm install
```

### Run the application

```bash
npm run dev
```

The demo displays the main application features in the terminal and generates XML and JSON reports in the `reports/` directory.

### Build

```bash
npm run build
```

### Type checking

```bash
npm run typecheck
```

## Project Structure

```text
src/
├── domain/        # Domain models and business logic
├── repositories/  # Generic in-memory repository
├── report/        # XML and JSON report generators
├── types/         # Shared interfaces and types
└── main.ts        # Application demo
```
