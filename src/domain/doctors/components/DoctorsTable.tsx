import type { DoctorProfile, DoctorStatus } from "@/common/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/shared/components/ui/table";
import { SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

type Props = {
  doctors: DoctorProfile[];
};

const StatusBadge = ({ status }: { status: DoctorStatus }) => {
  const color =
    status === "ACTIVE"
      ? "bg-green-500"
      : status === "PENDING_VERIFICATION"
        ? "bg-blue-500"
        : "bg-transparent";
  return (
    <Badge className={`capitalize ${color}`}>
      {status.split("_").join(" ").toLowerCase()}
    </Badge>
  );
};

const DoctorsTable = ({ doctors }: Props) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Total Patient</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map(({ user, profile }) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell className="capitalize">
              <StatusBadge status={profile.status} />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone_number}</TableCell>
            <TableCell>{profile.standard_consultation_fee} MMK</TableCell>
            <TableCell>{profile.average_rating}</TableCell>
            <TableCell>{profile.total_patient_count}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                className="min-w-9 h-9"
                onClick={() => {
                  navigate(`/dashboard/doctors/${user.id}`);
                }}
              >
                <SlidersHorizontal />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DoctorsTable;
