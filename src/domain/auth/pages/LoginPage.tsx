import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLogin } from "../queries";
import { LoginValidator, type LoginSchema } from "../validations/login";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

const LoginPage = () => {
  const { t } = useTranslation();

  const { mutate, isPending } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: LoginSchema) => {
    // router.push("/doctor/home");
    mutate(data, {
      onSuccess: (response) => {
        console.log("response - ", response);
      },
      onError: (error) => {
        console.log("error - ", error);
      }
    });
  };

  console.log(errors);

  return (
    <div className="bg-background px-3 flex justify-center items-center h-screen">
      <div className="shadow-md  sm:flex justify-center items-center gap-4 border w-fit rounded-lg p-2 md:p-4 lg:p-8">
        <div className="">
          <img
            src="/welcome.png"
            alt="Welcome"
            className=""
            style={{ filter: "grayscale(1)" }}
          />
        </div>
        <div>
          <div className="mb-4">
            <p className="text-3xl leading-12 text-center font-medium text-text-primary">
              {t("auth.welcomeBack")}
            </p>
          </div>
          <div className="gap-4 flex-col flex">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <div>
                  <label className="text-sm" htmlFor="email">
                    {t("labels.email")}
                  </label>
                  <Input
                    type="email"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder="Enter your email"
                    // label={t("labels.email")}
                  />
                  {errors.email && errors.email.message ? (
                    <p className="text-error text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <div>
                  <label className="text-sm" htmlFor="password">
                    {t("labels.password")}
                  </label>
                  <Input
                    type="password"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder="Enter your password"
                    // label={t("labels.password")}
                  />
                  {errors.password && errors.password.message ? (
                    <p className="text-error text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Button
              onClick={handleSubmit(onSubmit)}
              className="mt-4"
              disabled={isSubmitting || isPending}
            >
              {t("actions.login")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
