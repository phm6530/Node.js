
export function LocalTokenCheck() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('미 로그인상태');
        return false;
    }
    return true;
}