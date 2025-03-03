import { Avatar } from "@chakra-ui/react/avatar";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Logout } from "@/components/login/logout";
import NextLink from "next/link";

export const UserMenu = () => {
  return (
    <MenuRoot positioning={{ placement: "bottom" }}>
      <MenuTrigger>
        <Avatar.Root colorPalette="teal">
          <Avatar.Fallback />
        </Avatar.Root>
      </MenuTrigger>

      <MenuContent>
        <MenuItem value="my_carpool">
          <NextLink href="/list/my_carpools">My carpools</NextLink>
        </MenuItem>

        <MenuItem value="carpool_requests" asChild>
          <NextLink href="/list/requests">Requests</NextLink>
        </MenuItem>

        <MenuItem value="carpool_requests" color="fg.error">
          <Logout />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
