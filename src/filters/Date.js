export default function (date) {
  const time = new Date(date * 1000);
  // return time.toLocaleDateString();
  const tYear = time.getFullYear();
  const tMonth = time.getMonth() + 1;
  const tDate = time.getDate();
  const tTime = `${tYear}/${tMonth}/${tDate}`;
  return tTime;
}
