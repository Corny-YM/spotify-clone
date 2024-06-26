"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface Props {
  value?: number;
  onChange?: (val: number) => void;
}

const Slider = ({ value = 1, onChange }: Props) => {
  const handleChange = (newVal: number[]) => {
    onChange?.(newVal[0]);
  };

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      value={[value]}
      max={1}
      step={0.1}
      aria-label="Volume"
      onValueChange={handleChange}
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
