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

export function GenderPreference() {
  return (
    <SelectRoot collection={pickupSlots} width="full" name="genderPreference">
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
