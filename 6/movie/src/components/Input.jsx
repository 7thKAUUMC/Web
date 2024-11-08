import React from 'react';

const Input = ({ label, id, type, register, error, onBlur }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            {...register}
            onBlur={onBlur}
            className={error ? 'error' : ''}
        />
        {error && <div className="error-message">{error.message}</div>}
    </div>
);

export default Input; 