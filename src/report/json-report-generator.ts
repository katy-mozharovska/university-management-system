import { type ReportData } from "../types/basic-contracts.js";
import { ReportGenerator } from "./report-generator.js";

export class JsonReportGenerator extends ReportGenerator {

    protected generateHeader(): string {
        return "";
    }

    protected generateBody(data: ReportData): string {
        return JSON.stringify(data, null, 4);
    }

    protected generateFooter(): string {
        return "";
    }
}