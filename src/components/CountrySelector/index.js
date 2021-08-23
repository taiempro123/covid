import React from "react";
import { FormControl, FormHelperText, InputLabel, NativeSelect } from "@material-ui/core";

export default function CountrySelector({ value, handleOnChange, countries }) {
  return (
    <FormControl>
      <InputLabel htmlFor="country-selector" shrink>
        Quốc gia
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnChange}
        inputProps={{
          name: "country",
          id: "country-selector",
        }}
      >
          {
        countries.map((country, index) => {
            return <option key={index} value={country.ISO2.toLowerCase()}>{country.Country}</option>
        })
      }
          
      </NativeSelect>
      <FormHelperText>Lựa chọn quốc gia</FormHelperText>
    </FormControl>
  );
}
