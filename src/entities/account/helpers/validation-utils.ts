/**
 * Validation utilities for accounts
 */

import type { Account } from '../types/account-types';

export const validateAccount = (account: Account): boolean => {
    if (!account.login.trim()) return false;
    if (account.type === 'local' && !account.password) return false;
    if (account.login.length > 100) return false;
    if (account.password && account.password.length > 100) return false;
    if (account.label.length > 50) return false;
    return true;
};