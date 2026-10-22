import { useParams } from 'react-router';
import { useGetDoctor } from '../queries';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Star,
  Users,
  Banknote,
  BadgeCheck,
  Mail,
  Phone,
  Clock,
  CalendarDays,
  GraduationCap,
  Stethoscope,
  MoreHorizontal,
  Loader2,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import SpecializationsList from '../components/SpecializationsList';
import QualificationsList from '../components/QualificationsList';
import SchedulesList from '../components/SchedulesList';

const Card = ({
  title,
  icon,
  children,
  className = '',
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-xl border bg-card p-4 ${className}`}>
    <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold">
      <span className="text-muted-foreground">{icon}</span>
      {title}
    </h3>
    {children}
  </div>
);

const Stat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2.5">
    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="truncate text-xs text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-semibold">{value}</p>
    </div>
  </div>
);

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const { data: doctor, isLoading } = useGetDoctor(Number(id));

  if (isLoading || !doctor) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-4">
      {/* Profile header */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-start gap-4">
          <img
            src={doctor.profile_url}
            alt={doctor.name}
            className="size-16 shrink-0 rounded-full object-cover ring-2 ring-border"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-semibold">{doctor.name}</h1>
              <StatusBadge status={doctor.status} />
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="size-3.5" />
                {doctor.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="size-3.5" />
                {doctor.phone_number}
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="size-3.5" />
                License {doctor.license_number}
              </span>
            </div>
            {doctor.specilizations.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {doctor.specilizations.map((spec) => (
                  <Badge key={spec.name} variant="secondary">
                    {spec.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex shrink-0 gap-1.5">
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>
        {doctor.bio && (
          <p className="mt-3 border-t pt-3 text-sm leading-relaxed text-muted-foreground">
            {doctor.bio}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat
          icon={<Star className="size-4" />}
          label="Rating"
          value={`${doctor.average_rating.toFixed(1)} (${doctor.rating_count})`}
        />
        <Stat
          icon={<Users className="size-4" />}
          label="Patients Treated"
          value={doctor.total_patient_count.toLocaleString()}
        />
        <Stat
          icon={<Banknote className="size-4" />}
          label="Consultation Fee"
          value={doctor.standard_consultation_fee.toLocaleString()}
        />
        <Stat
          icon={<CalendarDays className="size-4" />}
          label="Working Days"
          value={`${doctor.schedules.length} day${doctor.schedules.length === 1 ? '' : 's'}`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Left column */}
        <div className="space-y-4">
          <Card
            title="Specializations"
            icon={<Stethoscope className="size-4" />}
          >
            <SpecializationsList specializations={doctor.specilizations} />
          </Card>

          <Card
            title="Qualifications"
            icon={<GraduationCap className="size-4" />}
          >
            <QualificationsList qualifications={doctor.qualifications} />
          </Card>
        </div>

        {/* Right column */}
        <Card
          title="Weekly Schedule"
          icon={<Clock className="size-4" />}
          className="h-fit"
        >
          <SchedulesList schedules={doctor.schedules} />
        </Card>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
