export const register = () => {
  const registerSection = document.createElement("section");
  const inpName = document.createElement("input");
  const inpPassword = document.createElement("input");
  const inpEmail = document.createElement("input");

  registerSection.appendChild(inpName);
  registerSection.appendChild(inpPassword);
  registerSection.appendChild(inpEmail);

  return registerSection;
};
