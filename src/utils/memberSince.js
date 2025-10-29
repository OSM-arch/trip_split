export default function memberSince(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears >= 1) {
        return `Member since ${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    } else if (diffMonths >= 1) {
        return `Member since ${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    } else if (diffDays >= 1) {
        return `Member since ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
        return 'Member since today';
    }
}