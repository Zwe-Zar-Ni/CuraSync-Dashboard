import { RotateCcw, Search } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/shared/components/ui/multi-select';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  setDefaultScheduleRequestsFilterValues,
  ScheduleRequestsFilterValidator,
  type ScheduleRequestFilterInputType,
} from '../validations/filter';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { Field } from '@/shared/components/ui/field';
import {
  SCHEDULE_REQUEST_STATUSES,
  SCHEDULE_REQUEST_TYPES,
} from '../constants';
import { DatePicker } from '@/shared/components/ui/date-picker';
import { DAYS } from '@/common/utils/doctor';

type ScheduleRequestsFilterProps = {
  values: ScheduleRequestFilterInputType;
  onSearch: (values: ScheduleRequestFilterInputType) => void;
  layout?: 'row' | 'col';
};

const ScheduleRequestsFilter = ({
  values,
  onSearch,
  layout = 'row',
}: ScheduleRequestsFilterProps) => {
  const resolver = zodResolver(
    ScheduleRequestsFilterValidator,
  ) as Resolver<ScheduleRequestFilterInputType>;

  const form = useForm<ScheduleRequestFilterInputType>({
    resolver,
    defaultValues: setDefaultScheduleRequestsFilterValues(values),
  });

  const onSubmit = (data: ScheduleRequestFilterInputType) => {
    onSearch(data);
  };

  const formLayout = layout === 'row' ? 'flex-row' : 'flex-col px-4';
  const inputClass = layout === 'row' ? 'w-44 h-10' : 'w-full h-10';
  const buttonClass = layout === 'row' ? 'w-10 h-10' : 'grow h-10';

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={`flex flex-wrap gap-3 mb-4 ${formLayout}`}
    >
      <Controller
        name="request_type"
        control={form.control}
        render={({ field }) => (
          <Field className={inputClass}>
            <MultiSelect
              values={field.value ? [field.value.toString()] : []}
              onValuesChange={(values) => field.onChange(values[0])}
              single={true}
            >
              <MultiSelectTrigger className={inputClass}>
                <MultiSelectValue placeholder="Request Type" />
              </MultiSelectTrigger>
              <MultiSelectContent search={false}>
                <MultiSelectGroup>
                  {SCHEDULE_REQUEST_TYPES.map((type) => (
                    <MultiSelectItem key={type} value={type}>
                      {type}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          </Field>
        )}
      />

      <Controller
        name="status"
        control={form.control}
        render={({ field }) => (
          <Field className={inputClass}>
            <MultiSelect
              values={field.value ? [field.value.toString()] : []}
              onValuesChange={(values) => field.onChange(values[0])}
              single={true}
            >
              <MultiSelectTrigger className={inputClass}>
                <MultiSelectValue placeholder="Status" />
              </MultiSelectTrigger>
              <MultiSelectContent search={false}>
                <MultiSelectGroup>
                  {SCHEDULE_REQUEST_STATUSES.map((status) => (
                    <MultiSelectItem key={status} value={status}>
                      {status}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          </Field>
        )}
      />

      <Controller
        name="day_of_week"
        control={form.control}
        render={({ field }) => (
          <Field className={inputClass}>
            <MultiSelect
              values={field.value !== undefined ? [field.value.toString()] : []}
              onValuesChange={(values) =>
                field.onChange(
                  values[0] !== undefined ? Number(values[0]) : undefined,
                )
              }
              single={true}
            >
              <MultiSelectTrigger className={inputClass}>
                <MultiSelectValue placeholder="Day of Week" />
              </MultiSelectTrigger>
              <MultiSelectContent search={false}>
                <MultiSelectGroup>
                  {DAYS.map((day, index) => (
                    <MultiSelectItem key={index} value={index.toString()}>
                      {day.en}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          </Field>
        )}
      />

      <Controller
        name="from_date"
        control={form.control}
        render={({ field }) => (
          <Field className={inputClass}>
            <DatePicker
              value={field.value ?? undefined}
              onChange={field.onChange}
              placeholder="From"
              className={inputClass}
            />
          </Field>
        )}
      />

      <Controller
        name="to_date"
        control={form.control}
        render={({ field }) => (
          <Field className={inputClass}>
            <DatePicker
              value={field.value ?? undefined}
              onChange={field.onChange}
              placeholder="To"
              className={inputClass}
            />
          </Field>
        )}
      />

      <div className="flex gap-2 flex-row">
        <Button
          type="reset"
          variant="outline"
          className={buttonClass}
          onClick={() => {
            form.reset(setDefaultScheduleRequestsFilterValues());
            form.handleSubmit(onSubmit)();
          }}
        >
          <RotateCcw />
        </Button>
        <Button type="submit" className={buttonClass}>
          <Search />
        </Button>
      </div>
    </form>
  );
};

export default ScheduleRequestsFilter;
