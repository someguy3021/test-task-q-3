/**
 * Validation utilities
 */

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

export const validateAccount = (account: Account): boolean => {
    if (!account.login.trim()) return false;
    if (account.type === 'local' && !account.password) return false;
    if (account.login.length > 100) return false;
    if (account.password && account.password.length > 100) return false;
    if (account.label.length > 50) return false;
    return true;
};

/**
 * Formatting utilities
 */

export interface AccountLabel {
    text: string;
}

export const getLabelArray = (labelString: string): AccountLabel[] => {
    if (!labelString.trim()) return [];
    return labelString
        .split(';')
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(text => ({ text }));
};