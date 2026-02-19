/**
 * Formatting utilities for accounts
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