export const visibilityToggle = (e, passwordRef) => {
    if (passwordRef.current.type === "password" && e.target.textContent === 'visibility') {
        passwordRef.current.type = "text";
        e.target.textContent = 'visibility_off';
    }else {
        passwordRef.current.type = "password";
        e.target.textContent = 'visibility';
    }
}