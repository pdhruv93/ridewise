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
    { label: "6-8", value: "6-8" },
    { label: "8-10", value: "8-10" },
    { label: "10-13", value: "10-13" },
    { label: "13-16", value: "13-16" },
    { label: "16-18", value: "16-18" },
    { label: "18-20", value: "18-20" },
    { label: "20-6", value: "20-6" },
  ],
});

export function PickupSlots() {
  return (
    <SelectRoot collection={pickupSlots} width="full" name="pickupSlot">
      <SelectTrigger>
        <SelectValueText placeholder="Select pickup slot" />
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
