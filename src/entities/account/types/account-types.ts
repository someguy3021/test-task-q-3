export interface Account {
    id: string;
    label: string;
    type: 'ldap' | 'local';
    login: string;
    password: string | null;
}

export interface AccountUpdate {
    label?: string;
    type?: 'ldap' | 'local';
    login?: string;
    password?: string | null;
}