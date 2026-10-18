import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LoginValidator, type LoginSchema } from "../validations";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../queries";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/shared/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/shared/components/ui/input-group";
import { setToken } from "@/common/utils/auth";

const LoginPage = () => {
  const { t } = useTranslation();
  const mutation = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginValidator),
    defaultValues: undefined
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        setToken(data.token);
        window.location.assign("/dashboard");
      },
      onError: (error) => {
        Object.entries(error.data.errors).forEach(([key, value]) => {
          form.setError(key as keyof LoginSchema, {
            message: value[0]
          });
        });
      }
    });
  };

  return (
    <div className="[@media(min-height:900px)]:p-4 p-7.5 flex md:flex-row flex-col-reverse h-screen items-center gap-4 md:gap-20 max-w-7xl mx-auto">
      <div className="h-full flex-1 bg-primary overflow-hidden rounded-2xl flex-col flex justify-between items-center md:gap-16 md:px-15 md:py-10 [@media(min-height:900px)]:py-4">
        <img
          src="/welcome.png"
          alt="Welcome"
          className="md:w-45 md:h-45 w-24 h-24"
        />
      </div>
      <div className="flex-1">
        <h1 className="[@media(min-height:900px)]:text-[32px] text-[24px] mb-1 md:mb-4 font-semibold text-text-primary text-center">
          {t("auth.sign_in")}
        </h1>
        <h3 className="[@media(min-height:900px)]:text-[24px] text-base font-semibold text-text-secondary text-center mb-8 [@media(min-height:900px)]:mb-16">
          {t("auth.welcome_back")}
        </h3>
        <form onSubmit={form.handleSubmit(onSubmit)} id="login-form">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email">
                    {t("labels.email")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="login-email"
                      aria-invalid={fieldState.invalid}
                      placeholder={t("auth.email_placeholder")}
                    />
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password">
                    {t("labels.password")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="login-password"
                      aria-invalid={fieldState.invalid}
                      placeholder={t("auth.password_placeholder")}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputGroupAddon>
                      <Lock />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <Button
                        variant="ghost"
                        className="h-6 w-6"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldError errors={[fieldState.error]} />
                  <FieldError errors={[form.formState.errors.root]} />
                </Field>
              )}
            />
          </FieldGroup>
          <Field orientation="horizontal">
            <Button
              className="mt-8 w-full"
              type="submit"
              form="login-form"
              disabled={mutation.isPending}
            >
              {t("auth.submit")}
            </Button>
          </Field>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
