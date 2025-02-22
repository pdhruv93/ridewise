import {
  createListCollection,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";

const pickupSlots = createListCollection({
  items: [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Any", value: "Any" },
  ],
});

interface GenderPreferenceProps {
  defaultValue: string[];
}

export function GenderPreference({ defaultValue }: GenderPreferenceProps) {
  return (
    <SelectRoot
      collection={pickupSlots}
      width="full"
      name="genderPreference"
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValueText placeholder="Select gender preference" />
      </SelectTrigger>

      <SelectContent>
        {pickupSlots.items.map((slot) => (
          <SelectItem item={slot} key={slot.value}>
            {slot.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
