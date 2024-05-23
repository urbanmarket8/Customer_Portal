// https://uxplanet.org/phone-number-field-design-best-practices-23957cbd86d5

import { useLayoutEffect, useState } from "react";
import { getIn } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";
import styles from "./index.module.css";
import classnames from "classnames";
import useShouldUpdateCountry from "./useShouldUpdateCountry";

const defaultInputProps = {
  type: "tel",
  autoComplete: "tel-national",
  id: "courier-tel-input",
  "data-testid": "phone-number-input",
};

const HAS_NO_COUNTRY_FLAG = "has no country";

function PhoneNumberControl({
  formik,
  name,
  disabled = false,
  containerClassNames,
  placeholder,
}) {
  const error = getIn(formik.errors, name);
  const value = getIn(formik.values, name);
  const [country, setCountry] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const shouldUpdateCountry = useShouldUpdateCountry({
    value,
    country,
    HAS_NO_COUNTRY_FLAG,
  });

  useLayoutEffect(() => {
    const handleCountry = () => {
      if (typeof value === "string" && !value.startsWith("+")) {
        setCountry(HAS_NO_COUNTRY_FLAG);
        return;
      }

      if (typeof value === "string" && value.startsWith("+")) {
        setCountry(null);
      }
    };

    if (!isFocused && shouldUpdateCountry) {
      handleCountry();
    }
  }, [shouldUpdateCountry, isFocused, value]);

  const { setFieldValue } = formik;

  const onPhoneNumberChange = (_value, _country, e, formattedValue) => {
    let tempFormattedValue = formattedValue.replace(/[-\s()]/g, "");

    if (country === HAS_NO_COUNTRY_FLAG) setCountry(_country.countryCode);

    setFieldValue(name, tempFormattedValue);
  };

  const inputProps =
    country === HAS_NO_COUNTRY_FLAG
      ? {
          ...defaultInputProps,
          value,
        }
      : {
          ...defaultInputProps,
        };

  return (
    <PhoneInput
      // to force unmount and mount the component when country change to avoid crash caused by the lib
      key={country}
      preferredCountries={["us", "ca"]}
      data-testid="component-phone-number"
      containerClass={classnames(
        "intl-tel-input",
        styles.container,
        {
          "is-invalid": !!error,
        },
        {
          [styles.disabled]: disabled,
        },
        ...(containerClassNames || [])
      )}
      inputClass={classnames("form-control", {
        "is-invalid": !!error,
      })}
      inputProps={inputProps}
      disabled={disabled}
      enableSearch
      autoFormat
      countryCodeEditable={true}
      disableCountryCode={false}
      enableAreaCodes={true}
      searchPlaceholder="search country ..."
      dropdownStyle={{
        width: document.getElementById("courier-tel-input")?.clientWidth + 1,
      }}
      //
      country={country === HAS_NO_COUNTRY_FLAG ? null : country}
      value={country === HAS_NO_COUNTRY_FLAG ? null : value}
      onChange={onPhoneNumberChange}
      onFocus={() => {
        if (country === HAS_NO_COUNTRY_FLAG) setCountry(null);
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      placeholder={placeholder || ""}
    />
  );
}

export default function PhoneNumber({
  enableCurrentLocation = true,
  ...props
}) {
  return (
    <PhoneNumberControl
      enableCurrentLocation={enableCurrentLocation}
      {...props}
    />
  );
}
