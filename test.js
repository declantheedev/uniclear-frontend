async function fetchRegistrationChoices() {
  try {
    const response = await fetch("https://jonathan006.pythonanywhere.com/school_management_api/registration_choices/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.schools[0].code);
  } catch (error) {
    console.error("Failed to fetch registration choices:", error);
    throw error;
  }
}
fetchRegistrationChoices()