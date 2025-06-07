export const normalizeStatus = (status: string): string => {
    switch (status) {
    case 'InProgress':
        return 'IN_PROGRESS';
    case 'Done':
        return 'DONE';
    case 'Backlog':
        return 'NEW';
    default:
        return status.toUpperCase();
    }
};
