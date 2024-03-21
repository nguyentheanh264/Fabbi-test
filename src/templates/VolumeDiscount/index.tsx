import { Button, Card, DataTable, Grid, Page, Text } from "@shopify/polaris"
import { FormProvider } from "react-hook-form"
import CoreInput from "../components/CoreInput"
import VolumeDiscountRule, { discountTypeOptions } from "./VolumeDiscountRule"
import { useVolumeDiscount } from "./useVolumeDiscount"

const VolumeDiscount = () => {
    const [values, handles] = useVolumeDiscount()
    const { methodForm } = values
    const { onSubmit } = handles
    const { control, watch } = methodForm

    const [volumeDiscountRule] = watch(['volumeDiscountRule'])

    const rows = volumeDiscountRule.map(x => {
        const discountType = x?.discountType?.[0]
        return [
            x?.title,
            discountTypeOptions?.find(option => option?.value === discountType)?.label ?? ''
            , x?.quantity,
            ['PERSENT_DISCOUNT', 'EACH'].includes(discountType) && x?.amount ? x?.amount + `${discountType === 'PERSENT_DISCOUNT' ? ` %` : ` $`}` : '']
    })


    return <FormProvider {...methodForm}>
        <form onSubmit={onSubmit}>
            <Page  >
                <Grid >
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                        <div className='mb-5'>
                            <Card padding='600'>
                                <Text variant="headingMd" as="h6">
                                    General
                                </Text>
                                <CoreInput
                                    control={control}
                                    name="campaign"
                                    label="Campaign"
                                    autoComplete='off'
                                    className='mt-5 mb-3'
                                    rules={{ required: "This field is required" }}
                                />
                                <CoreInput
                                    control={control}
                                    name="title"
                                    label="Title"
                                    autoComplete='off'
                                    className='mb-3'
                                    rules={{ required: "This field is required" }}
                                />
                                <CoreInput
                                    control={control}
                                    name="description"
                                    label="Description"
                                    autoComplete='off'
                                    className='mb-3'
                                />
                            </Card>
                        </div>
                        <VolumeDiscountRule />
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                        <Card >
                            <Text variant="headingMd" as="h6">
                                Preview
                            </Text>
                            <div className='my-1 text-center'>
                                <Text variant="headingMd" as="h5">
                                    Buy more and save
                                </Text>
                            </div>
                            <Text variant="headingSm" as="h5">
                                Apply for all products in store
                            </Text>

                            <DataTable
                                columnContentTypes={[
                                    'text',
                                    'text',
                                    'numeric',
                                    'numeric',
                                ]}
                                headings={[
                                    'Title',
                                    'Discount Type',
                                    'Quantity',
                                    'Amount',
                                ]}
                                rows={rows}
                                showTotalsInFooter
                            />

                            <div className='text-center'>
                                <Button submit>Submit</Button>
                            </div>

                        </Card>
                    </Grid.Cell>
                </Grid>

            </Page>
        </form>
    </FormProvider>
}

export default VolumeDiscount