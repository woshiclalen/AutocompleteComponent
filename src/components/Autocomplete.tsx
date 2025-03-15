import React, { useEffect, useState, KeyboardEvent } from 'react';

import './style.css';

type OptionType = string | { value: string; name: string };

interface AutocompleteProps {
    searchType?: "sync" | "async"
    description?: string;
    disabled?: boolean;
    filterOptions?: (options: OptionType[], inputValue: string) => OptionType[];
    label?: string;
    loading?: boolean;
    multiple?: boolean;
    onChange?: (value: OptionType | OptionType[]) => void;
    onInputChange?: (inputValue: string) => void;
    options: OptionType[];
    placeholder?: string;
    renderOption?: (option: OptionType) => React.ReactNode;
    value?: OptionType[];
}

const useDebouncedValue = (inputValue: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);

    return debouncedValue;
};

function Autocomplete({
    searchType = "sync",
    description,
    label,
    placeholder = "Type to search...",
    disabled = false,
    loading = false,
    multiple = false,
    filterOptions,
    onChange,
    onInputChange,
    options,
    renderOption,
    value = []
}: AutocompleteProps) {

    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<OptionType[]>([]);
    const [selectedValues, setSelectedValues] = useState<OptionType[]>(value);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const debouncedSearchTerm = useDebouncedValue(value, 500);

    if (searchType === "async") {
        useEffect(() => {
            if (inputValue == "") return setFilteredOptions([]);
            if (filterOptions) {
                setFilteredOptions(filterOptions(options, inputValue));
            } else {
                const defaultFilter = options.filter(option =>
                    typeof option === 'string'
                        ? option.toLowerCase().includes(inputValue.toLowerCase())
                        : option.name.toLowerCase().includes(inputValue.toLowerCase())
                );
                setFilteredOptions(defaultFilter);
            }
            onInputChange?.(inputValue);
        }, [debouncedSearchTerm])
    } else {
        useEffect(() => {
            if (filterOptions) {
                setFilteredOptions(filterOptions(options, inputValue));
            } else {
                const defaultFilter = options.filter(option =>
                    typeof option === 'string'
                        ? option.toLowerCase().includes(inputValue.toLowerCase())
                        : option.name.toLowerCase().includes(inputValue.toLowerCase())
                );
                setFilteredOptions(defaultFilter);
            }
            onInputChange?.(inputValue);
        }, [inputValue, options, filterOptions, onInputChange, debouncedSearchTerm]);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsDropdownOpen(true);

        setActiveIndex(-1);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDropdownOpen(false);
        }
    };

    const handleClick = (option: OptionType) => {
        if (multiple) {
            const updatedValues = selectedValues.includes(option)
                ? selectedValues.filter(val => val !== option)
                : [...selectedValues, option];
            setSelectedValues(updatedValues);
            onChange?.(updatedValues);
        } else {
            const updatedValues = selectedValues.includes(option)
                ? selectedValues.filter(val => val !== option)
                : [option];
            setSelectedValues(updatedValues);
            onChange?.(updatedValues);
            setIsDropdownOpen(false);
        }
        console.log(selectedValues);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isDropdownOpen || filteredOptions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prevIndex) => (prevIndex + 1) % filteredOptions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            handleClick(filteredOptions[activeIndex]);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setIsDropdownOpen(false);
        }
    };

    return (
        <div className="relative w-64" onBlur={handleBlur} tabIndex={-1}>
            {label && <label className="block mb-1 text-lg font-medium">{label}</label>}
            <div className="flex items-center border border-gray-300 rounded-lg p-1 flex-wrap">
                {selectedValues.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {selectedValues.map((option, index) => (
                            <div key={index} className="cursor-pointer hover:bg-red-500 bg-green-500 text-white px-2 py-1 rounded-lg text-sm" onClick={() => handleClick(option)}>
                                {typeof option === "string" ? option : option.name}
                            </div>
                        ))}
                    </div>
                )}
                <input
                    type="text"
                    className="flex-1 p-2 border-none focus:ring-0 outline-none"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {loading && <div className="relative right-2">🔄</div>}
            </div>

            {isDropdownOpen && filteredOptions.length > 0 && (
                <ul className="absolute w-full bg-black border border-gray-300 mt-1 rounded-lg shadow-md max-h-50 overflow-y-auto z-10">
                    {filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            className={`p-2 cursor-pointer hover:bg-gray-800 ${index === activeIndex ? "bg-gray-800" : selectedValues.includes(option) ? "bg-green-800" : ""}`}
                            onClick={(e) => { e.preventDefault(); handleClick(option) }}
                            tabIndex={0}
                        >
                            {renderOption ? renderOption(option) : (typeof option === "string" ? option : option.name)}
                        </li>
                    ))}
                </ul>
            )}
            {description && <label className="block mb-1 text-lg font-medium">{description}</label>}
        </div>
    )
}

export default Autocomplete