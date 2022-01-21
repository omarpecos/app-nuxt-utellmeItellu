export const getFullCountryObject = (country: any, arr: any[]) => {
  const { langs } = country
  const langsOfCountry = arr?.filter(({ code }) => langs.includes(code))

  return {
    ...country,
    languages: langsOfCountry,
  }
}
