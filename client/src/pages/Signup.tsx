import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
type NewUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const fields = [
  {
    id: "username",
    type: "text",
    placeholder: "Choose a username",
    label: "Username",
  },
  {
    id: "email",
    type: "email",
    placeholder: "m@example.com",
    label: "Email",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Create a password",
    label: "Password",
  },
  {
    id: "confirmPassword",
    type: "password",
    placeholder: "Confirm your password",
    label: "Confirm Password",
  },
];

export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Omit<NewUser, "id">>();
  const password = watch("password");

  const onSubmit = (data: Omit<NewUser, "id">) => {
    const formData: NewUser = {
      id: Date.now(),
      ...data,
    };

    console.log("signup form data", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">Enter your details to get started</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map(({ id, type, placeholder, label }) => (
            <div key={id} className="space-y-2">
              <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete={id}
                className={errors[id as keyof Omit<NewUser, "id">] ? "border-red-500" : ""}
                {...register(id as keyof Omit<NewUser, "id">, {
                  required: `${label} is required`,
                  ...(id === "confirmPassword" && {
                    validate: (value) => value === password || "Passwords do not match",
                  }),
                  ...(id === "email" && {
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please enter a valid email",
                    },
                  }),
                  ...(id === "password" && {
                    pattern: {
                      value: /^.{8,}$/,
                      message: "Password should contain 8 char",
                    },
                  }),
                })}
              />

              {errors[id as keyof Omit<NewUser, "id">] && (
                <p className="text-red-500 text-sm">{errors[id as keyof Omit<NewUser, "id">]?.message as string}</p>
              )}
            </div>
          ))}

          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account?</span>{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
