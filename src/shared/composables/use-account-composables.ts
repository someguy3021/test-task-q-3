import { getLabelArray as getLabelArrayUtil, validateAccount as validateAccountUtil, type Account, type AccountLabel, type AccountUpdate } from 'src/shared/utils/account-utils';

export const useAccountValidation = () => {
    return {
        validateAccount: validateAccountUtil
    };
};

export const useAccountFormatting = () => {
    return {
        getLabelArray: getLabelArrayUtil
    };
};

// Re-export types for convenience
export type { Account, AccountLabel, AccountUpdate };