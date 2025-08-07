export interface OperatorConfig {
    domains: string[];
    portal?: string;
    api_username: string;
    api_password: string;
}

export interface Operators {
    [key: string]: OperatorConfig;
}
