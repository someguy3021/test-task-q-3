import { getLabelArray as getLabelArrayUtil, type AccountLabel } from 'src/entities/account/helpers/formatting-utils';
import { validateAccount as validateAccountUtil } from 'src/entities/account/helpers/validation-utils';
import { type Account, type AccountUpdate } from 'src/entities/account/types/account-types';

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

// Re-export types для удобства
export type { Account, AccountLabel, AccountUpdate };