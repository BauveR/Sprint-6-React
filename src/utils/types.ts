export interface ServiceOptions {
    name: string;
    description: string;
    code: string;
    price: number;
    hasCustomOptions?: boolean;
}

export interface SelectedService extends ServiceOptions {
    pages?: number;
    languages?: number;
}

