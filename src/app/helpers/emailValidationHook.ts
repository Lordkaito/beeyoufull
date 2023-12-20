export default function validateEmail(email: string) {
  console.log(email);
  // const re = /\S+@\S+\.\S+/;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}