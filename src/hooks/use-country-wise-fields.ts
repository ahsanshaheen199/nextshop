import { useMemo } from 'react';
import { isEmpty } from '../utlis';
import { getCountryLocaleConfig } from '@/utlis/country-locale';

export const defaultAddressFieldsValues = {
  firstName: {
    required: true,
    hidden: false,
    label: 'First Name',
    priority: 10,
    placeholder: 'First Name',
  },
  lastName: {
    required: true,
    hidden: false,
    label: 'Last Name',
    placeholder: 'Last Name',
    priority: 20,
  },
  country: {
    required: true,
    hidden: false,
    label: 'Country',
    placeholder: 'Choose a country',
    priority: 30,
  },
  address1: {
    required: true,
    hidden: false,
    label: 'Address',
    priority: 40,
    placeholder: 'Enter your address',
  },
  address2: {
    required: false,
    hidden: false,
    label: 'Apartment',
    placeholder: 'Apartment, suite, unit, etc.',
    priority: 50,
  },
  state: {
    required: true,
    hidden: false,
    label: 'State',
    placeholder: 'State',
    priority: 60,
  },
  city: {
    required: true,
    hidden: false,
    label: 'City',
    placeholder: 'City',
    priority: 70,
  },
  postcode: {
    required: true,
    hidden: false,
    label: 'Postal Code',
    placeholder: 'Postal Code',
    priority: 80,
  },
};

export const useCountryWiseFields = (country: string) => {
  return useMemo(() => {
    const values = getCountryLocaleConfig(country);

    if (isEmpty(values)) {
      return defaultAddressFieldsValues;
    }

    return {
      ...defaultAddressFieldsValues,
      state: {
        ...defaultAddressFieldsValues.state,
        ...(values?.state && { ...values.state }),
      },
      city: {
        ...defaultAddressFieldsValues.city,
        ...(values?.city && { ...values.city }),
      },
      postcode: {
        ...defaultAddressFieldsValues.postcode,
        ...(values?.postcode && { ...values.postcode }),
      },
    };
  }, [country]);
};
