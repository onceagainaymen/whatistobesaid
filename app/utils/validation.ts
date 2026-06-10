export function validatePassword(password: string) {
  if (password.length < 6) {
    return {
      error: "Password is too short (minimum 6 characters).",
      isValid: false,
    };
  }
  if (!/[\d\W_]/.test(password)) {
    return {
      error:
        "Password must include at least one number or a special character.",
      isValid: false,
    };
  }
  return {
    isValid: true,
  };
}
