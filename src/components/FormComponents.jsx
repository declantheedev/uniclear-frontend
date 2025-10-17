import React from 'react';

// Reusable Input Field Component
export const InputField = ({ label, id, name, type = 'text', value, onChange, placeholder, required = true }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-primary-custom mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-custom/20 focus:border-primary-custom"
    />
  </div>
);

// Reusable Dropdown Component
export const DropdownField = ({ label, id, name, value, onChange, options, disabled, required = true }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-primary-custom mb-1">
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`w-full px-4 py-2 rounded-md border ${
        disabled 
          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' 
          : 'bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-custom/20 focus:border-primary-custom'
      }`}
    >
      <option value="" disabled={value !== ''}>
        {disabled ? 'Select a school first' : `--- Select ${label} ---`}
      </option>
      {options.map(option => (
        <option key={option.code} value={option.code}>
          {option.full_name}
        </option>
      ))}
    </select>
  </div>
);