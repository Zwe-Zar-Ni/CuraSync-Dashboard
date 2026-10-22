import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { DoctorResource } from '@/common/types/doctor';
import StatusBadge from './StatusBadge';

type Props = {
  doctors: DoctorResource[];
};

const DoctorsTable = ({ doctors }: Props) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Doctor ID</TableHead>
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
        {doctors.map((doctor) => (
          <TableRow key={doctor.id}>
            <TableCell className="font-medium">{doctor.id}</TableCell>
            <TableCell className="capitalize">
              <StatusBadge status={doctor.status} />
            </TableCell>
            <TableCell>{doctor.name}</TableCell>
            <TableCell>{doctor.email}</TableCell>
            <TableCell>{doctor.phone_number}</TableCell>
            <TableCell>{doctor.standard_consultation_fee} MMK</TableCell>
            <TableCell>{doctor.average_rating}</TableCell>
            <TableCell>{doctor.total_patient_count}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                className="min-w-9 h-9"
                onClick={() => {
                  navigate(`/dashboard/doctors/${doctor.id}`);
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
