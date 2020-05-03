// input types
const FIRST_NAME = "FIRST_NAME";
const LAST_NAME = "LAST_NAME";
const BIRTHDAY = "BIRTHDAY";
const STREET_ADDRESS = "STREET_ADDRESS";
const CITY = "CITY";
const PROVINCE = "PROVINCE";
const POSTAL_CODE = "POSTAL_CODE";

export const getAllCheckInFields = () => {
  return [
    { inputType: FIRST_NAME, name: "firstName", label: "First Name" },
    { inputType: LAST_NAME, name: "lastName", label: "Last Name" },
    { inputType: BIRTHDAY, name: "birthday", label: "Birthday" },
    {
      inputType: STREET_ADDRESS,
      name: "streetAddress",
      label: "Street Address",
    },
    { inputType: CITY, name: "city", label: "City" },
    { inputType: PROVINCE, name: "province", label: "Province" },
    { inputType: POSTAL_CODE, name: "postalCode", label: "Postal Code" },
  ];
};

const CHECK_IN_FIELDS = "CHECK_IN_FIELDS";
/**
 *
 * @param {Array} fields - array of field objects {inputType, name, label}
 */
export const setUserCheckInFields = (fields) => {
  localStorage.setItem(CHECK_IN_FIELDS, JSON.stringify(fields));
};

export const getUserCheckInFields = () => {
  return JSON.parse(localStorage.getItem(CHECK_IN_FIELDS));
};

// These would be automatically set when the clinic user is first created
export const getDefaultCheckInFields = () => {
  localStorage.setItem(
    CHECK_IN_FIELDS,
    JSON.stringify([
      { inputType: LAST_NAME, name: "lastName", label: "Last Name" },
      { inputType: BIRTHDAY, name: "birthday", label: "Birthday" },
    ])
  );
  return getUserCheckInFields();
};
