import { RotateCcw, Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue
} from "@/shared/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  setDefaultScheduleRequestsFilterValues,
  ScheduleRequestsFilterValidator,
  type ScheduleRequestFilterInputType
} from "../validations/filter";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { Field } from "@/shared/components/ui/field";
import {
  DAYS_OF_WEEK,
  SCHEDULE_REQUEST_STATUSES,
  SCHEDULE_REQUEST_TYPES
} from "../constants";

type ScheduleRequestsFilterProps = {
  values: ScheduleRequestFilterInputType;
  onSearch: (values: ScheduleRequestFilterInputType) => void;
  layout?: "row" | "col";
};

const ScheduleRequestsFilter = ({
  values,
  onSearch,
  layout = "row"
}: ScheduleRequestsFilterProps) => {
  const resolver = zodResolver(
    ScheduleRequestsFilterValidator
  ) as Resolver<ScheduleRequestFilterInputType>;

  const form = useForm<ScheduleRequestFilterInputType>({
    resolver,
    defaultValues: setDefaultScheduleRequestsFilterValues(values)
  });

  const onSubmit = (data: ScheduleRequestFilterInputType) => {
    onSearch(data);
  };

  console.log(form.formState.errors);
  const formLayout = layout === "row" ? "flex-row" : "flex-col px-4";
  const inputClass = layout === "row" ? "w-44 h-10" : "w-full h-10";
  const selectClass = layout === "row" ? "w-36 h-10" : "w-full h-10";
  const buttonClass = layout === "row" ? "w-10 h-10" : "grow h-10";

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={`flex flex-wrap gap-3 mb-4 ${formLayout}`}
    >
      <Controller
        name="doctor_id"
        control={form.control}
        render={({ field }) => (
          <Field className={inputClass}>
            <Input
              {...field}
              value={field.value?.toString() ?? ""}
              onChange={(event) =>
                field.onChange(
                  event.target.value ? Number(event.target.value) : undefined
                )
              }
              placeholder="Doctor ID"
              className={inputClass}
            />
          </Field>
        )}
      />

      <Controller
        name="request_type"
        control={form.control}
        render={({ field }) => (
          <Field className={selectClass}>
            <MultiSelect
              values={field.value ? [field.value.toString()] : []}
              onValuesChange={(values) => field.onChange(values[0])}
              single={true}
            >
              <MultiSelectTrigger className={selectClass}>
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
          <Field className={selectClass}>
            <MultiSelect
              values={field.value ? [field.value.toString()] : []}
              onValuesChange={(values) => field.onChange(values[0])}
              single={true}
            >
              <MultiSelectTrigger className={selectClass}>
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
          <Field className={selectClass}>
            <MultiSelect
              values={field.value !== undefined ? [field.value.toString()] : []}
              onValuesChange={(values) =>
                field.onChange(
                  values[0] !== undefined ? Number(values[0]) : undefined
                )
              }
              single={true}
            >
              <MultiSelectTrigger className={selectClass}>
                <MultiSelectValue placeholder="Day of Week" />
              </MultiSelectTrigger>
              <MultiSelectContent search={false}>
                <MultiSelectGroup>
                  {DAYS_OF_WEEK.map((day) => (
                    <MultiSelectItem
                      key={day.value}
                      value={day.value.toString()}
                    >
                      {day.label}
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
            <Input
              {...field}
              value={field.value ?? ""}
              type="date"
              placeholder="From Date"
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
            <Input
              {...field}
              value={field.value ?? ""}
              type="date"
              placeholder="To Date"
              className={inputClass}
            />
          </Field>
        )}
      />

      <div className="flex gap-2 flex-row">
        <Button
          type="reset"
          variant="outline"
          className={buttonClass + " border-border"}
          onClick={() => {
            form.reset();
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
