import { useForm } from "react-hook-form";
import { RequestBodyVolumeDiscount } from "./type";

export const useVolumeDiscount = () => {
    const methodForm = useForm<RequestBodyVolumeDiscount>({
        mode: "onTouched",
        defaultValues: {
            campaign: '',
            title: '',
            description: '',
            volumeDiscountRule: [
                {
                    title: '',
                    subtitle: '',
                    label: '',
                    quantity: 1,
                    discountType: [],
                    amount: null,
                },
                {
                    title: '',
                    subtitle: '',
                    label: '',
                    quantity: 2,
                    discountType: [],
                    amount: null,
                }
            ]
        },
    });

    const { handleSubmit } = methodForm

    const onSubmit = handleSubmit(async data => {
        alert('Call api...')
    })

    return [
        { methodForm },
        { onSubmit },
    ] as const;
};
