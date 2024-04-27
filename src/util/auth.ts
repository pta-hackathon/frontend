export function saveUserInLocalStorage(id: number) {
  localStorage.setItem("user", JSON.stringify(id));
}

export function getUserFromLocalStorage(): number | null {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
