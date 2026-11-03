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
import { useTranslation } from 'react-i18next';
import type { DoctorResource } from '@/common/types/doctor';
import StatusBadge from './StatusBadge';

type Props = {
  doctors: DoctorResource[];
};

const DoctorsTable = ({ doctors }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('doctors.doctorId')}</TableHead>
          <TableHead>{t('labels.status')}</TableHead>
          <TableHead>{t('labels.name')}</TableHead>
          <TableHead>{t('labels.email')}</TableHead>
          <TableHead>{t('labels.phoneNumber')}</TableHead>
          <TableHead>{t('doctors.fee')}</TableHead>
          <TableHead>{t('doctors.rating')}</TableHead>
          <TableHead>{t('doctors.totalPatient')}</TableHead>
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
