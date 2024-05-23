import { useMemo } from 'react';

export default function useShouldUpdateCountry({
  value,
  country,
  HAS_NO_COUNTRY_FLAG,
  currentCountryByLocation,
}) {
  return useMemo(() => {
    if (
      typeof value === 'string' &&
      value.startsWith('+') &&
      country === HAS_NO_COUNTRY_FLAG
    )
      return true;

    if (
      typeof value === 'string' &&
      !value.startsWith('+') &&
      country !== HAS_NO_COUNTRY_FLAG
    )
      return true;

    if (
      currentCountryByLocation &&
      country !== currentCountryByLocation &&
      (!value || typeof value === 'undefined')
    )
      return true;

    return false;
  }, [country, value, currentCountryByLocation, HAS_NO_COUNTRY_FLAG]);
}
