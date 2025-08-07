export const encoder = (text: string, idx: number): string => {
    const data = encodeURIComponent(`${text}${idx}`);

    if (typeof window === 'undefined') {
        return Buffer.from(data).toString('base64');
    }

    return window.btoa(data);
};
