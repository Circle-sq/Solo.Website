export const EMAIL_REGEX = /^([\w\-+]+(?:\.[\w\-+]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

export const isApiError = (error: unknown): error is { errors: Record<string, unknown> } => {
    return typeof error === 'object' && error !== null && 'errors' in error;
};
