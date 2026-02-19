/**
 * Helper functions for account operations
 */

import type { Account, AccountUpdate } from '../types/account-types';

export const generateAccountId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const createDefaultAccount = (id: string): Account => {
    return {
        id,
        label: '',
        type: 'ldap',
        login: '',
        password: null
    };
};

export const updateAccountData = (
    currentAccount: Account,
    updates: AccountUpdate
): Account => {
    const updatedAccount: Account = {
        id: currentAccount.id,
        label: updates.label !== undefined ? updates.label : currentAccount.label,
        type: updates.type !== undefined ? updates.type : currentAccount.type,
        login: updates.login !== undefined ? updates.login : currentAccount.login,
        password: updates.password !== undefined ? updates.password : currentAccount.password
    };

    // If type is LDAP, password must be null
    if (updatedAccount.type === 'ldap') {
        updatedAccount.password = null;
    }

    return updatedAccount;
};