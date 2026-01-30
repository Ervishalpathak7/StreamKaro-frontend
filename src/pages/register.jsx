import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "@/services/auth";

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

function RegisterPage() {
  const {
    register,
    clearErrors,
    setError,
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
  const navigate = useNavigate();
  const handleRegister = async (data) => {
    try {
      await signup(data);
      navigate("/dashboard");
    } catch (err) {
      if (err.message === "Email already registered") {
        setError("email", {
          type: "server",
          message: err.message,
        });
      } else {
        setError("root", {
          type: "server",
          message: err.message || "Signup failed",
        });
      }
    }
  };
  return (
    <div className=" bg-black min-h-screen flex justify-center items-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex justify-center">
          <CardTitle>Signup</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(handleRegister)}>
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
            {errors.root && (
              <p className="text-sm text-red-500 text-center">
                {errors.root.message}{" "}
              </p>
            )}
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
