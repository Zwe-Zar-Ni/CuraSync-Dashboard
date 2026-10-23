import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/shared/components/ui/multi-select';
import { Textarea } from '@/shared/components/ui/textarea';
import { useUpdateScheduleRequest } from '../queries';
import type { ScheduleRequest } from '../types';
import {
  UpdateScheduleRequestValidator,
  type UpdateScheduleRequestInputType,
} from '../validations/update';

type Props = {
  request: ScheduleRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const REVIEW_STATUSES: UpdateScheduleRequestInputType['status'][] = [
  'APPROVED',
  'REJECTED',
];

const UpdateScheduleRequestForm = ({ request, open, onOpenChange }: Props) => {
  const { mutate, isPending } = useUpdateScheduleRequest();

  const resolver = zodResolver(
    UpdateScheduleRequestValidator,
  ) as Resolver<UpdateScheduleRequestInputType>;

  const form = useForm<UpdateScheduleRequestInputType>({
    resolver,
    defaultValues: {
      status:
        request.status === 'APPROVED' || request.status === 'REJECTED'
          ? request.status
          : undefined,
      admin_note: request.admin_note ?? '',
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      form.reset();
    }
    onOpenChange(nextOpen);
  };

  const onSubmit = (data: UpdateScheduleRequestInputType) => {
    mutate(
      { id: request.id, data },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Request #{request.id}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <MultiSelect
                  values={field.value ? [field.value] : []}
                  onValuesChange={(values) =>
                    field.onChange(values[0] ?? undefined)
                  }
                  single={true}
                >
                  <MultiSelectTrigger id="status" className="w-full">
                    <MultiSelectValue placeholder="Select status" />
                  </MultiSelectTrigger>
                  <MultiSelectContent search={false}>
                    <MultiSelectGroup>
                      {REVIEW_STATUSES.map((status) => (
                        <MultiSelectItem key={status} value={status}>
                          {status}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="admin_note"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="admin_note">Admin Note</FieldLabel>
                <Textarea
                  id="admin_note"
                  placeholder="Enter admin note"
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateScheduleRequestForm;
