"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth";

/* -------------------- */
/* Zod schema (JS-safe) */
/* -------------------- */
const loginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(18, "Password must be at most 18 characters"),
});

function LoginPage() {
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      await login(values);
      navigate("/dashboard");
    } catch (err) {
      setError("root", {
        type: "server",
        message: err.message || "Login failed",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex justify-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(handleLogin)}>
          <CardContent>
            <FieldGroup>
              {/* Email */}
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="login-email">Email</FieldLabel>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="johndoe@email.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email", {
                    onChange: () => {
                      clearErrors("root");
                    },
                  })}
                />
                {errors.email && <FieldError errors={[errors.email]} />}
              </Field>

              {/* Password */}
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  {...register("password", {
                    onChange: () => clearErrors("root"),
                  })}
                />
                {errors.password && <FieldError errors={[errors.password]} />}
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="mt-5 flex flex-col gap-4">
            {errors.root && (
              <p className="text-sm text-red-500 text-center">
                {errors.root.message}
              </p>
            )}
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
            <span>
              Create an Account ?{" "}
              <NavLink className="text-blue-500" to="/register">
                Register
              </NavLink>
            </span>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
