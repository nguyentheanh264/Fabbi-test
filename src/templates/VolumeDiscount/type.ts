export type RequestBodyVolumeDiscount = {
  campaign: string;
  title: string;
  description: string;
  volumeDiscountRule: VolumeDiscountRule[];
};

export type VolumeDiscountRule = {
  title: string;
  subtitle: string;
  label?: string;
  quantity: number | null;
  discountType: string[];
  amount: number | null;
};
