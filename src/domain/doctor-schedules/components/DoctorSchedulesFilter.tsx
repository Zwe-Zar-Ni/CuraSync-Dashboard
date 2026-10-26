import { RotateCcw, Search } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  setDefaultDoctorSchedulesFilterValues,
  DoctorSchedulesFilterValidator,
  type DoctorSchedulesFilterInputType,
} from '../validations/filter';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { Field } from '@/shared/components/ui/field';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/shared/components/ui/multi-select';
import { DAYS } from '@/common/utils/doctor';
import { Switch } from '@/shared/components/ui/switch';

type DoctorSchedulesFilterProps = {
  values: DoctorSchedulesFilterInputType;
  onSearch: (values: DoctorSchedulesFilterInputType) => void;
  layout?: 'row' | 'col';
};

const DoctorSchedulesFilter = ({
  values,
  onSearch,
  layout = 'row',
}: DoctorSchedulesFilterProps) => {
  const resolver = zodResolver(
    DoctorSchedulesFilterValidator,
  ) as Resolver<DoctorSchedulesFilterInputType>;

  const form = useForm<DoctorSchedulesFilterInputType>({
    resolver,
    defaultValues: setDefaultDoctorSchedulesFilterValues(values),
  });

  const onSubmit = (data: DoctorSchedulesFilterInputType) => {
    onSearch(data);
  };

  const formLayout = layout === 'row' ? 'flex-row' : 'flex-col px-4';
  const inputClass = layout === 'row' ? 'w-52 h-10' : 'w-full h-10';
  const buttonClass = layout === 'row' ? 'w-10 h-10' : 'grow h-10';

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={`flex flex-wrap gap-3 mb-4 ${formLayout}`}
    >
      <Controller
        name="is_active"
        control={form.control}
        render={({ field }) => (
          <Field
            className={
              inputClass +
              'flex items-center gap-2 flex-row border rounded-lg dark:bg-input/30 px-3 h-10'
            }
          >
            <Switch checked={field.value} onCheckedChange={field.onChange} />
            <label htmlFor="is_active">Show active Only</label>
          </Field>
        )}
      />

      <Controller
        name="day_of_week"
        control={form.control}
        render={({ field }) => (
          <Field className={inputClass}>
            <MultiSelect
              values={
                field.value || field.value === 0 ? [field.value.toString()] : []
              }
              onValuesChange={(values) => field.onChange(Number(values[0]))}
              single={true}
            >
              <MultiSelectTrigger className={inputClass}>
                <MultiSelectValue placeholder="Status" />
              </MultiSelectTrigger>
              <MultiSelectContent search={true}>
                <MultiSelectGroup>
                  {DAYS.map((day, index) => (
                    <MultiSelectItem key={day.en} value={index.toString()}>
                      {day.en}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          </Field>
        )}
      />

      <div className="flex gap-2 flex-row">
        <Button
          type="reset"
          variant="outline"
          className={buttonClass}
          onClick={() => {
            form.reset(setDefaultDoctorSchedulesFilterValues());
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

export default DoctorSchedulesFilter;
