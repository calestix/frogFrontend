"use client"
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneNumberInput = ({ label, placeholder, ...props }) => {
    const [value, setValue] = useState('');

    return (
        <div className="px-4 mb-4 w-full p-3 rounded-lg bg-white/50 placeholder-gray-600 text-gray-900 outline-none hover:ring-2 hover:ring-purple-400">
            <PhoneInput
                id={label}
                value={value}
                onChange={setValue}
                placeholder={placeholder}
                className="w-full mt-0"
                {...props}
            />
        </div>
    );
};

export default PhoneNumberInput;