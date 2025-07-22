export interface ServiceOptions {
    name: string;
    description: string;
    code: string;
    price: number;
}

export interface Budget {
    id: string;
    name: string;
    email: string;
    phone: string;
    services: ServiceOptions[];
    webDetails?: WebsiteDetails;
    price: number;
    date: string;
    annualDiscount: boolean;
}

export interface WebsiteDetails {
    pages: number;
    languages: number;
}