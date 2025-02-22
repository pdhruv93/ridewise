import { createListCollection } from "@chakra-ui/react";
import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const genderPrefs = createListCollection({
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
      collection={genderPrefs}
      width="full"
      name="genderPreference"
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValueText placeholder="Select gender preference" />
      </SelectTrigger>

      <SelectContent>
        {genderPrefs.items.map((pref) => (
          <SelectItem item={pref} key={pref.value}>
            {pref.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
