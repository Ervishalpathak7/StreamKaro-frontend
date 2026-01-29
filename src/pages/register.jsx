import * as z from "zod";
import { useForm , Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NavLink } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";

/* ---------------- Schema ---------------- */
const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
  email: z.email("Invalid email address").toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
  terms: z.literal(true, {
    error: "You must accept the terms",
  }),
});

const onSubmit = async (data) => {
  console.log(data);
};

function RegisterPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
    mode: "onSubmit",
  });

  return (
    <div className=" bg-black min-h-screen flex justify-center items-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex justify-center">
          <CardTitle>Signup</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <FieldGroup>
              {/* Name */}
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John-doe"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && <FieldError errors={[errors.name]} />}
              </Field>

              {/* Email */}
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Johndoe@email.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && <FieldError errors={[errors.email]} />}
              </Field>

              {/* Password */}
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                {errors.password && <FieldError errors={[errors.password]} />}
              </Field>

              {/* Terms */}
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Field data-invalid={!!errors.terms}>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) =>
                          field.onChange(value === true)
                        }
                      />
                      I agree to the terms & conditions
                    </label>
                    {errors.terms && <FieldError errors={[errors.terms]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
          <CardFooter className="mt-5 flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
            <span>
              Already have an Account ?{" "}
              <NavLink className="text-blue-500" to="/login">
                Login
              </NavLink>
            </span>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
