// Country-specific locale settings for address forms
export interface FieldConfig {
  label?: string;
  required?: boolean;
  hidden?: boolean;
  priority?: number;
  class?: string[];
}

export interface CountryLocaleConfig {
  postcode?: FieldConfig;
  state?: FieldConfig;
  city?: FieldConfig;
  address_1?: FieldConfig;
  address_2?: FieldConfig;
  first_name?: FieldConfig;
  last_name?: FieldConfig;
}

export type CountryLocaleMap = Record<string, CountryLocaleConfig>;

export const countryLocale: CountryLocaleMap = {
  AE: {
    postcode: {
      required: false,
      hidden: true,
    },
    state: {
      required: false,
    },
  },
  AF: {
    state: {
      required: false,
      hidden: true,
    },
  },
  AL: {
    state: {
      label: 'County',
    },
  },
  AO: {
    postcode: {
      required: false,
      hidden: true,
    },
    state: {
      label: 'Province',
    },
  },
  AT: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  AU: {
    city: {
      label: 'Suburb',
    },
    postcode: {
      label: 'Postcode',
    },
    state: {
      label: 'State',
    },
  },
  AX: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  BA: {
    postcode: {
      priority: 65,
    },
    state: {
      label: 'Canton',
      required: false,
      hidden: true,
    },
  },
  BD: {
    postcode: {
      required: false,
    },
    state: {
      label: 'District',
    },
  },
  BE: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  BG: {
    state: {
      required: false,
    },
  },
  BH: {
    postcode: {
      required: false,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  BI: {
    state: {
      required: false,
      hidden: true,
    },
  },
  BO: {
    postcode: {
      required: false,
      hidden: true,
    },
    state: {
      label: 'Department',
    },
  },
  BS: {
    postcode: {
      required: false,
      hidden: true,
    },
  },
  BW: {
    postcode: {
      required: false,
      hidden: true,
    },
    state: {
      required: false,
      hidden: true,
      label: 'District',
    },
  },
  BZ: {
    postcode: {
      required: false,
      hidden: true,
    },
    state: {
      required: false,
    },
  },
  CA: {
    postcode: {
      label: 'Postal code',
    },
    state: {
      label: 'Province',
    },
  },
  CH: {
    postcode: {
      priority: 65,
    },
    state: {
      label: 'Canton',
      required: false,
    },
  },
  CL: {
    city: {
      required: true,
    },
    postcode: {
      required: false,
      // Hidden for stores within Chile. @see https://github.com/woocommerce/woocommerce/issues/36546.
      hidden: false, // This would need to be dynamically set based on base country
    },
    state: {
      label: 'Region',
    },
  },
  CN: {
    state: {
      label: 'Province',
    },
  },
  CO: {
    postcode: {
      required: false,
    },
    state: {
      label: 'Department',
    },
  },
  CR: {
    state: {
      label: 'Province',
    },
  },
  CW: {
    postcode: {
      required: false,
      hidden: true,
    },
    state: {
      required: false,
    },
  },
  CY: {
    state: {
      required: false,
      hidden: true,
    },
  },
  CZ: {
    state: {
      required: false,
      hidden: true,
    },
  },
  DE: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
    },
  },
  DK: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  DO: {
    state: {
      label: 'Province',
    },
  },
  EC: {
    state: {
      label: 'Province',
    },
  },
  EE: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  ET: {
    state: {
      required: false,
      hidden: true,
    },
  },
  FI: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  FR: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  GG: {
    state: {
      required: false,
      label: 'Parish',
    },
  },
  GH: {
    postcode: {
      required: false,
    },
    state: {
      label: 'Region',
    },
  },
  GP: {
    state: {
      required: false,
      hidden: true,
    },
  },
  GF: {
    state: {
      required: false,
      hidden: true,
    },
  },
  GR: {
    state: {
      required: false,
    },
  },
  GT: {
    postcode: {
      required: false,
    },
    state: {
      label: 'Department',
    },
  },
  HK: {
    postcode: {
      required: false,
    },
    city: {
      label: 'Town / District',
    },
    state: {
      label: 'Region',
    },
  },
  HN: {
    state: {
      label: 'Department',
    },
  },
  HU: {
    last_name: {
      class: ['form-row-first'],
      priority: 10,
    },
    first_name: {
      class: ['form-row-last'],
      priority: 20,
    },
    postcode: {
      class: ['form-row-first', 'address-field'],
      priority: 65,
    },
    city: {
      class: ['form-row-last', 'address-field'],
    },
    address_1: {
      priority: 71,
    },
    address_2: {
      priority: 72,
    },
    state: {
      label: 'County',
      required: false,
    },
  },
  ID: {
    state: {
      label: 'Province',
    },
  },
  IE: {
    postcode: {
      required: true,
      label: 'Eircode',
    },
    state: {
      label: 'County',
    },
  },
  IS: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  IL: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  IM: {
    state: {
      required: false,
      hidden: true,
    },
  },
  IN: {
    postcode: {
      label: 'PIN Code',
    },
    state: {
      label: 'State',
    },
  },
  IR: {
    state: {
      priority: 50,
    },
    city: {
      priority: 60,
    },
    address_1: {
      priority: 70,
    },
    address_2: {
      priority: 80,
    },
  },
  IT: {
    postcode: {
      priority: 65,
    },
    state: {
      required: true,
      label: 'Province',
    },
  },
  JM: {
    city: {
      label: 'Town / City / Post Office',
    },
    postcode: {
      required: false,
      label: 'Postal Code',
    },
    state: {
      required: true,
      label: 'Parish',
    },
  },
  JP: {
    last_name: {
      class: ['form-row-first'],
      priority: 10,
    },
    first_name: {
      class: ['form-row-last'],
      priority: 20,
    },
    postcode: {
      class: ['form-row-first', 'address-field'],
      priority: 65,
    },
    state: {
      label: 'Prefecture',
      class: ['form-row-last', 'address-field'],
      priority: 66,
    },
    city: {
      priority: 67,
    },
    address_1: {
      priority: 68,
    },
    address_2: {
      priority: 69,
    },
  },
  KN: {
    postcode: {
      required: false,
      label: 'Postal code',
    },
    state: {
      required: true,
      label: 'Parish',
    },
  },
  KR: {
    state: {
      required: false,
      hidden: true,
    },
  },
  KW: {
    state: {
      required: false,
      hidden: true,
    },
  },
  LV: {
    state: {
      label: 'Municipality',
      required: false,
    },
  },
  LB: {
    state: {
      required: false,
      hidden: true,
    },
  },
  MF: {
    state: {
      required: false,
      hidden: true,
    },
  },
  MQ: {
    state: {
      required: false,
      hidden: true,
    },
  },
  MT: {
    state: {
      required: false,
      hidden: true,
    },
  },
  MZ: {
    postcode: {
      required: false,
      hidden: true,
    },
    state: {
      label: 'Province',
    },
  },
  NI: {
    state: {
      label: 'Department',
    },
  },
  NL: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  NG: {
    postcode: {
      label: 'Postcode',
      required: false,
      hidden: true,
    },
    state: {
      label: 'State',
    },
  },
  NZ: {
    postcode: {
      label: 'Postcode',
    },
    state: {
      required: false,
      label: 'Region',
    },
  },
  NO: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  NP: {
    state: {
      label: 'State / Zone',
    },
    postcode: {
      required: false,
    },
  },
  PA: {
    state: {
      label: 'Province',
    },
  },
  PL: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  PR: {
    city: {
      label: 'Municipality',
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  PT: {
    state: {
      required: false,
      hidden: true,
    },
  },
  PY: {
    state: {
      label: 'Department',
    },
  },
  RE: {
    state: {
      required: false,
      hidden: true,
    },
  },
  RO: {
    state: {
      label: 'County',
      required: true,
    },
  },
  RS: {
    city: {
      required: true,
    },
    postcode: {
      required: true,
    },
    state: {
      label: 'District',
      required: false,
    },
  },
  RW: {
    state: {
      required: false,
      hidden: true,
    },
  },
  SG: {
    state: {
      required: false,
      hidden: true,
    },
    city: {
      required: false,
    },
  },
  SK: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  SI: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  SR: {
    postcode: {
      required: false,
      hidden: true,
    },
  },
  SV: {
    state: {
      label: 'Department',
    },
  },
  ES: {
    postcode: {
      priority: 65,
    },
    state: {
      label: 'Province',
    },
  },
  LI: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  LK: {
    state: {
      required: false,
      hidden: true,
    },
  },
  LU: {
    state: {
      required: false,
      hidden: true,
    },
  },
  MD: {
    state: {
      label: 'Municipality / District',
    },
  },
  SE: {
    postcode: {
      priority: 65,
    },
    state: {
      required: false,
      hidden: true,
    },
  },
  TR: {
    postcode: {
      priority: 65,
    },
    state: {
      label: 'Province',
    },
  },
  UG: {
    postcode: {
      required: false,
      hidden: true,
    },
    city: {
      label: 'Town / Village',
      required: true,
    },
    state: {
      label: 'District',
      required: true,
    },
  },
  US: {
    postcode: {
      label: 'ZIP Code',
    },
    state: {
      label: 'State',
    },
  },
  UY: {
    state: {
      label: 'Department',
    },
  },
  GB: {
    postcode: {
      label: 'Postcode',
    },
    state: {
      label: 'County',
      required: false,
    },
  },
  ST: {
    postcode: {
      required: false,
      hidden: true,
    },
    state: {
      label: 'District',
    },
  },
  VN: {
    state: {
      required: false,
      hidden: true,
    },
    postcode: {
      priority: 65,
      required: false,
      hidden: false,
    },
    address_2: {
      required: false,
      hidden: false,
    },
  },
  WS: {
    postcode: {
      required: false,
      hidden: true,
    },
  },
  YT: {
    state: {
      required: false,
      hidden: true,
    },
  },
  ZA: {
    state: {
      label: 'Province',
    },
  },
  ZW: {
    postcode: {
      required: false,
      hidden: true,
    },
  },
};

// Helper functions for working with country locale data
export const getCountryLocaleConfig = (countryCode: string): CountryLocaleConfig => {
  return countryLocale[countryCode] || {};
};

export const getFieldConfig = (countryCode: string, fieldName: keyof CountryLocaleConfig): FieldConfig => {
  const countryConfig = getCountryLocaleConfig(countryCode);
  return countryConfig[fieldName] || {};
};

export const isFieldRequired = (countryCode: string, fieldName: keyof CountryLocaleConfig): boolean => {
  const fieldConfig = getFieldConfig(countryCode, fieldName);
  return fieldConfig.required !== false; // Default to true unless explicitly false
};

export const isFieldHidden = (countryCode: string, fieldName: keyof CountryLocaleConfig): boolean => {
  const fieldConfig = getFieldConfig(countryCode, fieldName);
  return fieldConfig.hidden === true;
};

export const getFieldLabel = (
  countryCode: string,
  fieldName: keyof CountryLocaleConfig,
  defaultLabel: string
): string => {
  const fieldConfig = getFieldConfig(countryCode, fieldName);
  return fieldConfig.label || defaultLabel;
};

export const getFieldPriority = (
  countryCode: string,
  fieldName: keyof CountryLocaleConfig,
  defaultPriority: number
): number => {
  const fieldConfig = getFieldConfig(countryCode, fieldName);
  return fieldConfig.priority || defaultPriority;
};

export const getFieldClasses = (countryCode: string, fieldName: keyof CountryLocaleConfig): string[] => {
  const fieldConfig = getFieldConfig(countryCode, fieldName);
  return fieldConfig.class || [];
};

// Function to check if postcode should be hidden for Chile stores
export const shouldHidePostcodeForChile = (countryCode: string, baseCountry: string): boolean => {
  return countryCode === 'CL' && baseCountry === 'CL';
};
