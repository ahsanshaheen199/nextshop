'use client';

import { Button } from '@/components/form/button';
import { FormInput } from '@/components/form/input';
import { FormLabel } from '@/components/form/label';
import { Customer } from '@/types/user';
import { useActionState, useMemo } from 'react';
import { updateBillingAddress } from '../actions';
import { Fragment, useEffect, useState } from 'react';
import { useCountryWiseFields } from '@/hooks/use-country-wise-fields';
import { OrderBilling } from '@/types/order';
import Select from 'react-select';
import { countries } from '@/utlis/countries';
import { getCountryStates } from '@/utlis/states';
import { isEmpty } from '@/utlis';
import { toast } from '@/components/toast';

export function BillingAddressForm({ customer }: { customer: Customer }) {
  const [state, formAction, isPending] = useActionState(updateBillingAddress, null);
  const [billingFormData, setBillingFormData] = useState<OrderBilling>({
    first_name: customer.billing?.first_name || '',
    last_name: customer.billing?.last_name || '',
    company: customer.billing?.company || '',
    country: customer.billing?.country || '',
    address_1: customer.billing?.address_1 || '',
    address_2: customer.billing?.address_2 || '',
    city: customer.billing?.city || '',
    state: customer.billing?.state || '',
    postcode: customer.billing?.postcode || '',
    email: customer.billing?.email || '',
    phone: customer.billing?.phone || '',
  });
  const updateBillingAddressAction = formAction.bind(null, {
    customerId: customer.id,
    ...billingFormData,
  });

  const countryWiseFieldValues = useCountryWiseFields(billingFormData.country);
  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  }));

  const stateOptions = useMemo(() => {
    return getCountryStates(billingFormData.country).map((state) => ({
      value: state.code,
      label: state.name,
    }));
  }, [billingFormData.country]);

  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Success',
        description: 'Billing address updated successfully',
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
            await updateBillingAddressAction();
          }}
        >
          <input type="hidden" name="customerId" value={customer.id} />

          {/* First Name and Last Name */}
          <div className="mb-5 grid grid-cols-12 gap-x-5">
            <div className="col-span-6">
              <FormLabel htmlFor="firstName" className="mb-2.5 inline-flex gap-x-1">
                First Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormInput
                id="firstName"
                className="w-full"
                type="text"
                value={billingFormData.first_name}
                onChange={(e) => setBillingFormData({ ...billingFormData, first_name: e.target.value })}
              />
            </div>
            <div className="col-span-6">
              <FormLabel htmlFor="lastName" className="mb-2.5 inline-flex gap-x-1">
                Last Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormInput
                id="lastName"
                className="w-full"
                type="text"
                value={billingFormData.last_name}
                onChange={(e) => setBillingFormData({ ...billingFormData, last_name: e.target.value })}
              />
            </div>
          </div>

          {/* Company */}
          <div className="mb-5">
            <FormLabel htmlFor="company" className="mb-2.5 inline-block">
              Company Name
            </FormLabel>
            <FormInput
              id="company"
              className="w-full"
              type="text"
              name="company"
              value={billingFormData.company}
              onChange={(e) => setBillingFormData({ ...billingFormData, company: e.target.value })}
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
              value={countryOptions.find((country) => country.value === billingFormData.country)}
              onChange={(newValue: { label: string; value: string } | null) =>
                setBillingFormData({ ...billingFormData, country: newValue?.value || '', state: '' })
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
              value={billingFormData.address_1}
              onChange={(e) => setBillingFormData({ ...billingFormData, address_1: e.target.value })}
            />
            <FormInput
              id="address2"
              className="w-full"
              type="text"
              name="address2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              value={billingFormData.address_2}
              onChange={(e) => setBillingFormData({ ...billingFormData, address_2: e.target.value })}
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
                value={billingFormData.city}
                onChange={(e) => setBillingFormData({ ...billingFormData, city: e.target.value })}
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
                value={stateOptions.find((state) => state.value === billingFormData.state) || null}
                onChange={(newValue: { label: string; value: string } | null) =>
                  setBillingFormData({ ...billingFormData, state: newValue?.value || '' })
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
                value={billingFormData.state}
                onChange={(e) => setBillingFormData({ ...billingFormData, state: e.target.value })}
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
                value={billingFormData.postcode}
                onChange={(e) => setBillingFormData({ ...billingFormData, postcode: e.target.value })}
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <FormLabel htmlFor="email" className="mb-2.5 inline-flex gap-x-1">
              Email Address <span className="text-red-500">*</span>
            </FormLabel>
            <FormInput
              id="email"
              className="w-full"
              type="email"
              name="email"
              value={billingFormData.email}
              onChange={(e) => setBillingFormData({ ...billingFormData, email: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div className="mb-5">
            <FormLabel htmlFor="phone" className="mb-2.5 inline-flex gap-x-1">
              Phone <span className="text-red-500">*</span>
            </FormLabel>
            <FormInput
              id="phone"
              className="w-full"
              type="tel"
              name="phone"
              value={billingFormData.phone}
              onChange={(e) => setBillingFormData({ ...billingFormData, phone: e.target.value })}
            />
          </div>

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
