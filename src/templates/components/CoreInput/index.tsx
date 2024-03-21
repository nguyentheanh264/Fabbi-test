import { TextField, TextFieldProps } from "@shopify/polaris"
import { Controller } from "react-hook-form"

type CoreInputProps = TextFieldProps & {
    name: string
    control: any
    label: string
    className?: string
    rules?: any

}

const CoreInput = (props: CoreInputProps) => {
    const { name, control, label, className, rules, ...restProps } = props
    return <div className={className}>
        <Controller
            control={control}
            name={name}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => (
                <TextField
                    label={label}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={error?.message}
                    {...restProps}
                />
            )}
            rules={rules}
        />

    </div>
}

export default CoreInput