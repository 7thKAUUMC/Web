import React from 'react';

const Input = ({ label, id, type, register, error, onBlur }) => (
    <div className="form-group">
        <input
            type={type}
            id={id}
            placeholder={label}
            {...register}
            onBlur={onBlur}
            className={error ? 'error' : ''}
        />
    </div>
);

export default Input; 