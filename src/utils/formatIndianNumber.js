export function formatIndianNumber(number) {
  if (number === null || number === undefined || isNaN(number)) {
    return "";
  }

  // Ensure the number is formatted to 2 decimal places
  const formattedNumber = Number(number).toFixed(2);

  const [integerPart, decimalPart] = formattedNumber.split(".");

  // Split the integer part for formatting
  const lastThreeDigits = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);

  let formattedInteger;
  if (otherDigits) {
    // Add a comma after every two digits in the otherDigits part
    formattedInteger =
      otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThreeDigits;
  } else {
    formattedInteger = lastThreeDigits;
  }

  // Always include the decimal part
  return `${
    formattedInteger === "0"
      ? ""
      : `${formattedInteger}${decimalPart === "00" ? "" : `.${decimalPart}`}`
  }`;
}
