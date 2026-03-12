import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface LeadSubmission {
    id: bigint;
    name: string;
    businessName: string;
    email: string;
    timestamp: bigint;
    phone: string;
}
export interface backendInterface {
    getAllContacts(): Promise<Array<ContactSubmission>>;
    getAllLeads(): Promise<Array<LeadSubmission>>;
    submitContact(name: string, email: string, message: string): Promise<bigint>;
    submitLead(name: string, email: string, phone: string, businessName: string): Promise<bigint>;
}
