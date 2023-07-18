export default function isDatePass(date: Date) {
  try {
    const day = new Date(date!).getDate();
    const month = new Date(date!).getMonth() + 1;
    const year = new Date(date!).getFullYear();
    const today = new Date();
    if (year < today.getFullYear()) return false;
    else if (year == today.getFullYear() && month < today.getMonth() + 1)
      return false;
    else if (
      year == today.getFullYear() &&
      month == today.getMonth() + 1 &&
      day < today.getDate()
    )
      return false;
    return true;
  } catch (error) {
    console.error(error);
  }
}
