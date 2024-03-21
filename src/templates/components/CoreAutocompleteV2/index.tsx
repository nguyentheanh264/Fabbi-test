import { Autocomplete } from "@shopify/polaris";
import { OptionDescriptor } from "@shopify/polaris/build/ts/src/types";
import { useCallback, useState } from "react";
import { Controller } from "react-hook-form";

type Props = {
    control: any;
    name: string;
    label?: string
    placeholder?: string
    deselectedOptions: OptionDescriptor[]
    onChangeValue?: (val: any) => void;
    rules?: any;

};

const CoreAutocompleteV2 = (props: Props) => {
    const { control, deselectedOptions, rules, name, onChangeValue, label, placeholder } = props;

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(deselectedOptions);

    const updateText = useCallback(
        (value: string) => {
            setInputValue(value);

            if (value === '') {
                setOptions(deselectedOptions);
                return;
            }

            const filterRegex = new RegExp(value, 'i');
            const resultOptions = deselectedOptions.filter((option) =>
                (option?.label as string)?.match(filterRegex),
            );
            setOptions(resultOptions);
        },
        [deselectedOptions],
    );

    const updateSelection = useCallback(
        (selected: string[]) => {
            const selectedValue = selected.map((selectedItem) => {
                const matchedOption = options.find((option) => {
                    return option.value.match(selectedItem);
                });
                return matchedOption && matchedOption.label;
            });

            setSelectedOptions(selected);
            setInputValue((selectedValue?.[0] || '') as string);
        },
        [options],
    );



    return (
        <Controller
            control={control}
            name={name}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => {
                return (
                    <Autocomplete
                        options={options}
                        onSelect={(selected) => {
                            console.log('============= selected', selected)
                            onChange(selected);
                            updateSelection(selected)
                            if (onChangeValue) onChangeValue(selected);
                        }}
                        selected={selectedOptions}
                        textField={
                            <Autocomplete.TextField
                                onChange={updateText}
                                label={label}
                                value={inputValue}
                                placeholder={placeholder}
                                autoComplete="off"
                                helpText={error && error.message}
                            />
                        }

                    />
                );
            }}
            rules={rules}
        />
    );
};

export default CoreAutocompleteV2;
