export const departmentBuilder = (
  departmentName,
  street,
  houseNumber,
  postalCode,
  location,
  country,
  gender,
  firstname,
  lastname,
  mail,
  sendConfirmationMail
) => {
  return {
    departmentName: departmentName,
    contact: {
      gender: gender,
      firstname: firstname,
      lastname: lastname,
      mail: mail,
    },
    street: street,
    houseNumber: houseNumber,
    postalCode: postalCode,
    location: location,
    country: country,
    sendConfirmationMail: sendConfirmationMail,
  };
};
