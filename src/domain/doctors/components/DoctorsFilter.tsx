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
  setDefaultDoctorsFilterValues,
  DoctorsFilterValidator,
  type DoctorsFilterInputType
} from "../validations/filter";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { Field } from "@/shared/components/ui/field";
import { DOCTOR_STATUSES } from "@/common/constants/doctor";

type UsersFilterProps = {
  values: DoctorsFilterInputType;
  onSearch: (values: DoctorsFilterInputType) => void;
  layout?: "row" | "col";
};

const UsersFilter = ({
  values,
  onSearch,
  layout = "row"
}: UsersFilterProps) => {
  const resolver = zodResolver(
    DoctorsFilterValidator
  ) as Resolver<DoctorsFilterInputType>;

  const form = useForm<DoctorsFilterInputType>({
    resolver,
    defaultValues: setDefaultDoctorsFilterValues(values)
  });

  const onSubmit = (data: DoctorsFilterInputType) => {
    onSearch(data);
  };

  const formLayout = layout === "row" ? "flex-row" : "flex-col px-4";
  const inputClass = layout === "row" ? "w-52 h-10" : "w-full h-10";
  const selectClass = layout === "row" ? "w-40 h-10" : "w-full h-10";
  const buttonClass = layout === "row" ? "w-10 h-10" : "grow h-10";

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={`flex flex-wrap gap-3 mb-4 ${formLayout}`}
    >
      <Controller
        name="search"
        control={form.control}
        render={({ field }) => (
          <Field className={inputClass}>
            <Input
              {...field}
              placeholder="Search by name"
              className={inputClass}
            />
          </Field>
        )}
      />

      <Controller
        name="email"
        control={form.control}
        render={({ field }) => (
          <Field className={inputClass}>
            <Input {...field} placeholder="Email" className={inputClass} />
          </Field>
        )}
      />

      <Controller
        name="phone_number"
        control={form.control}
        render={({ field }) => (
          <Field className={inputClass}>
            <Input
              {...field}
              placeholder="Phone Number"
              className={inputClass}
            />
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
              <MultiSelectContent search={true}>
                <MultiSelectGroup>
                  {DOCTOR_STATUSES.map((status) => (
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
      <div className="flex gap-2 flex-row">
        <Button
          type="reset"
          variant="outline"
          className={buttonClass + " border-border"}
          onClick={() => {
            form.setValues(setDefaultDoctorsFilterValues(undefined));
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

export default UsersFilter;
