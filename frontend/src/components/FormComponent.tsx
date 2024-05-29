import React, { FormEvent } from 'react';

interface FormField {
  placeholder?: string;
  value: any;
  onChange: (e: any) => void;
  type?: string;
  required?: boolean;
  options?: Array<{ value: any; label: string }>;
}

interface FormComponentProps {
  title: string;
  fields: FormField[];
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({ title, fields, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit}>
      {title && <h2>{title}</h2>}
      {fields.map((field, index) => (
        field.type === 'select' ? (
          <div className="mb-3" key={index}>
            <label className="form-label">{field.placeholder}</label>
            <select
              className="form-select"
              value={field.value}
              onChange={field.onChange}
              required={field.required}
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mb-3" key={index}>
            <label className="form-label">{field.placeholder}</label>
            <input
              className="form-control"
              type={field.type || 'text'}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
            />
          </div>
        )
      ))}
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Añadir'}
      </button>
    </form>
  );
};

export default FormComponent;
