export const denormalizeStatus = (status: string): string => {
    switch (status) {
    case 'NEW':
        return 'Backlog';
    case 'IN_PROGRESS':
        return 'InProgress';
    case 'DONE':
        return 'Done';
    default:
        return status;
    }
};
