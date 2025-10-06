"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { updateUserRoleAction } from "@/actions/update-user-role";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateUserRoleButtonProps {
  userId: string;
  currentRole: "USER" | "ADMIN" | "FIRSTC" | "SECONDC";
}

export const UpdateUserRoleButton = ({ userId, currentRole }: UpdateUserRoleButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  const [selectedRole, setSelectedRole] = useState(currentRole);

  async function handleRoleChange(newRole: "USER" | "ADMIN" | "FIRSTC" | "SECONDC") {
    if (newRole === currentRole) return;

    setIsPending(true);
    const res = await updateUserRoleAction({ userId, newRole });

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(`User role updated to ${newRole} successfully`);
      setSelectedRole(newRole);
    }
    setIsPending(false);
  }

  return (
    <Select
      value={selectedRole}
      onValueChange={handleRoleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[120px]">
        <UserIcon className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USER">User</SelectItem>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="FIRSTC">FirstC</SelectItem>
        <SelectItem value="SECONDC">SecondC</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const PlaceholderUpdateUserRoleButton = () => {
  return (
    <Button
      size="sm"
      variant="outline"
      className="w-[120px]"
      disabled
    >
      <UserIcon className="mr-2 h-4 w-4" />
      Role
    </Button>
  );
};