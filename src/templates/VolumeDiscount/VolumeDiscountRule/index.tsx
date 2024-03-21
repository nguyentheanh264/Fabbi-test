import { Button, Card, Divider, Grid, Text } from "@shopify/polaris";
import { DeleteIcon, PlusCircleIcon } from '@shopify/polaris-icons';
import { useFieldArray, useFormContext } from "react-hook-form";
import CoreAutocompleteV2 from "../../components/CoreAutocompleteV2";
import CoreInput from "../../components/CoreInput";
import { RequestBodyVolumeDiscount } from "../type";

export const discountTypeOptions = [
    { value: 'NONE', label: 'None' },
    { value: 'PERSENT_DISCOUNT', label: '% Discount' },
    { value: 'EACH', label: 'Discount / each' }
]

const VolumeDiscountRule = () => {
    const { control, watch, setValue } = useFormContext<RequestBodyVolumeDiscount>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'volumeDiscountRule',
        keyName: 'key'

    })

    const [volumeDiscountRule] = watch(['volumeDiscountRule'])

    return <Card>
        <div className='mb-3'>
            <Text variant="headingMd" as="h6">
                Volume discount rule
            </Text>
        </div>
        {fields.map((item, index) => {
            const discountType = watch(`volumeDiscountRule.${index}.discountType`)?.[0]
            return <div key={item?.key} className='mb-10' >
                <Divider borderWidth="100" />
                <div className='mb-5'>
                    <p className='px-2 py-1 max-w-[110px] text-white bg-orange-600' style={{ borderBottomRightRadius: '10px' }}>OPTION {index + 1}</p>
                </div>
                {fields.length > 1 && (
                    <div className='flex justify-end'>
                        <div className="w-[20px] cursor-pointer">
                            <DeleteIcon onClick={() => remove(index)} />
                        </div>
                    </div>
                )}

                <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                        <CoreInput
                            control={control}
                            name={`volumeDiscountRule.${index}.title`}
                            label="Title"
                            autoComplete='off'
                            rules={{ required: "This field is required" }}
                        />
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                        <CoreInput
                            control={control}
                            name={`volumeDiscountRule.${index}.subtitle`}
                            label="Subtitle"
                            autoComplete='off'
                        />
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                        <CoreInput
                            control={control}
                            name={`volumeDiscountRule.${index}.label`}
                            label="Label (Optional)"
                            autoComplete='off'
                        />
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                        <CoreInput
                            control={control}
                            name={`volumeDiscountRule.${index}.quantity`}
                            label="Quantity"
                            type="number"
                            autoComplete='off'
                            rules={{
                                required: "This field is required",
                                min: {
                                    value: 1,
                                    message: "Cannot be less than 1",
                                },
                            }}
                        />
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                        <CoreAutocompleteV2
                            control={control}
                            name={`volumeDiscountRule.${index}.discountType`}
                            label="Discount type"
                            deselectedOptions={discountTypeOptions}
                            onChangeValue={selected => {
                                if (selected?.[0] === 'NONE') {
                                    setValue(`volumeDiscountRule.${index}.amount`, null)
                                }
                            }}
                        />
                    </Grid.Cell>
                    {['PERSENT_DISCOUNT', 'EACH'].includes(discountType) && (
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                            <CoreInput
                                control={control}
                                name={`volumeDiscountRule.${index}.amount`}
                                label="Quantity"
                                type="number"
                                autoComplete='off'
                                suffix={discountType === 'PERSENT_DISCOUNT' ? '%' : '$'}
                                rules={{
                                    required: "This field is required",
                                    min: {
                                        value: 1,
                                        message: "Cannot be less than 1",
                                    },
                                }}
                            />
                        </Grid.Cell>
                    )}
                </Grid>
            </div>
        })}
        <Divider />
        <div className='mx-10 my-4 text-center'>
            <Button icon={PlusCircleIcon} fullWidth onClick={() => append({
                title: '',
                subtitle: '',
                label: '',
                quantity: Number.isInteger((volumeDiscountRule[fields.length - 1].quantity)) ? Number(volumeDiscountRule[fields.length - 1].quantity) + 1 : null,
                discountType: [],
                amount: null,
            })} >
                Add option
            </Button>
        </div>
    </Card>
}

export default VolumeDiscountRule