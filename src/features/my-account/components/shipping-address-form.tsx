'use client';

import { Button } from '@/components/form/button';
import { FormInput } from '@/components/form/input';
import { FormLabel } from '@/components/form/label';
import { Customer } from '@/types/user';
import { useActionState, useMemo } from 'react';
import { updateShippingAddress } from '../actions';
import { Fragment, useEffect, useState } from 'react';
import { useCountryWiseFields } from '@/hooks/use-country-wise-fields';
import { OrderShipping } from '@/types/order';
import Select from 'react-select';
import { countries } from '@/utlis/countries';
import { getCountryStates } from '@/utlis/states';
import { isEmpty } from '@/utlis';
import { toast } from '@/components/toast';

export function ShippingAddressForm({ customer }: { customer: Customer }) {
  const [state, formAction, isPending] = useActionState(updateShippingAddress, null);
  const [shippingFormData, setShippingFormData] = useState<OrderShipping>({
    first_name: customer.shipping?.first_name || '',
    last_name: customer.shipping?.last_name || '',
    company: customer.shipping?.company || '',
    country: customer.shipping?.country || '',
    address_1: customer.shipping?.address_1 || '',
    address_2: customer.shipping?.address_2 || '',
    city: customer.shipping?.city || '',
    state: customer.shipping?.state || '',
    postcode: customer.shipping?.postcode || '',
  });
  const updateShippingAddressAction = formAction.bind(null, {
    customerId: customer.id,
    ...shippingFormData,
  });

  const countryWiseFieldValues = useCountryWiseFields(shippingFormData.country);
  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  }));

  const stateOptions = useMemo(() => {
    return getCountryStates(shippingFormData.country).map((state) => ({
      value: state.code,
      label: state.name,
    }));
  }, [shippingFormData.country]);

  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Success',
        description: 'Shipping address updated successfully',
        type: 'success',
      });
    }

    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        type: 'error',
      });
    }
  }, [state]);

  return (
    <Fragment>
      <div className="rounded-2xl border border-black/10 p-6">
        <form
          action={async () => {
            await updateShippingAddressAction();
          }}
        >
          <input type="hidden" name="customerId" value={customer.id} />

          {/* First Name and Last Name */}
          <div className="mb-5 md:grid md:grid-cols-12 md:gap-x-5">
            <div className="mb-5 md:col-span-6 md:mb-0">
              <FormLabel htmlFor="firstName" className="mb-2.5 inline-flex gap-x-1">
                First Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormInput
                id="firstName"
                className="w-full"
                type="text"
                value={shippingFormData.first_name}
                onChange={(e) => setShippingFormData({ ...shippingFormData, first_name: e.target.value })}
              />
            </div>
            <div className="md:col-span-6">
              <FormLabel htmlFor="lastName" className="mb-2.5 inline-flex gap-x-1">
                Last Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormInput
                id="lastName"
                className="w-full"
                type="text"
                value={shippingFormData.last_name}
                onChange={(e) => setShippingFormData({ ...shippingFormData, last_name: e.target.value })}
              />
            </div>
          </div>

          {/* Company */}
          <div className="mb-5">
            <FormLabel htmlFor="company" className="mb-2.5 inline-block">
              Company Name (Optional)
            </FormLabel>
            <FormInput
              id="company"
              className="w-full"
              type="text"
              name="company"
              value={shippingFormData.company}
              onChange={(e) => setShippingFormData({ ...shippingFormData, company: e.target.value })}
            />
          </div>

          {/* Country/Region */}
          <div className="mb-5">
            <FormLabel htmlFor="country" className="mb-2.5 inline-flex gap-x-1">
              Country / Region <span className="text-red-500">*</span>
            </FormLabel>
            <Select
              placeholder="Select a country..."
              inputId="country"
              components={{
                IndicatorSeparator: () => null,
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                fontSize: 16,
                colors: {
                  ...theme.colors,
                  primary: 'black',
                  primary25: '#f0f0f0',
                },
              })}
              styles={{
                control: (styles) => ({
                  ...styles,
                  boxShadow: 'none',
                  borderRadius: '27.5px',
                  padding: '0 8px',
                  height: '48px',
                }),
              }}
              options={countryOptions}
              value={countryOptions.find((country) => country.value === shippingFormData.country)}
              onChange={(newValue: { label: string; value: string } | null) =>
                setShippingFormData({ ...shippingFormData, country: newValue?.value || '', state: '' })
              }
            />
          </div>

          {/* Street Address */}
          <div className="mb-5">
            <FormLabel htmlFor="address1" className="mb-2.5 inline-flex gap-x-1">
              Street Address <span className="text-red-500">*</span>
            </FormLabel>
            <FormInput
              id="address1"
              className="mb-3 w-full"
              type="text"
              name="address1"
              placeholder="House number and street name"
              value={shippingFormData.address_1}
              onChange={(e) => setShippingFormData({ ...shippingFormData, address_1: e.target.value })}
            />
            <FormInput
              id="address2"
              className="w-full"
              type="text"
              name="address2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              value={shippingFormData.address_2}
              onChange={(e) => setShippingFormData({ ...shippingFormData, address_2: e.target.value })}
            />
          </div>

          {countryWiseFieldValues.city.hidden ? null : (
            <div className="mb-5">
              <FormLabel htmlFor="city" className="mb-2.5 inline-flex gap-x-1">
                {countryWiseFieldValues.city.label}{' '}
                {countryWiseFieldValues.city.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormInput
                id="city"
                className="w-full"
                type="text"
                name="city"
                value={shippingFormData.city}
                onChange={(e) => setShippingFormData({ ...shippingFormData, city: e.target.value })}
              />
            </div>
          )}

          {countryWiseFieldValues.state.hidden ? null : !isEmpty(stateOptions) && stateOptions.length ? (
            <div className="mb-5">
              <FormLabel htmlFor="state" className="mb-2.5 inline-flex gap-x-1">
                {countryWiseFieldValues.state.label}{' '}
                {countryWiseFieldValues.state.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  fontSize: 16,
                  colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#f0f0f0',
                  },
                })}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    boxShadow: 'none',
                    borderRadius: '27.5px',
                    padding: '0 8px',
                    height: '48px',
                  }),
                }}
                placeholder="Select a state..."
                inputId="state"
                components={{
                  IndicatorSeparator: () => null,
                }}
                options={stateOptions}
                value={stateOptions.find((state) => state.value === shippingFormData.state) || null}
                onChange={(newValue: { label: string; value: string } | null) =>
                  setShippingFormData({ ...shippingFormData, state: newValue?.value || '' })
                }
              />
            </div>
          ) : (
            <div className="mb-5">
              <FormLabel htmlFor="state" className="mb-2.5 inline-flex gap-x-1">
                {countryWiseFieldValues.state.label}{' '}
                {countryWiseFieldValues.state.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormInput
                id="state"
                className="w-full"
                type="text"
                name="state"
                value={shippingFormData.state}
                onChange={(e) => setShippingFormData({ ...shippingFormData, state: e.target.value })}
              />
            </div>
          )}

          {countryWiseFieldValues.postcode.hidden ? null : (
            <div className="mb-5">
              <FormLabel htmlFor="postcode" className="mb-2.5 inline-flex gap-x-1">
                {countryWiseFieldValues.postcode.label}{' '}
                {countryWiseFieldValues.postcode.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormInput
                id="postcode"
                className="w-full"
                type="text"
                name="postcode"
                value={shippingFormData.postcode}
                onChange={(e) => setShippingFormData({ ...shippingFormData, postcode: e.target.value })}
              />
            </div>
          )}

          <div>
            <Button type="submit" isLoading={isPending} disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Address'}
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
