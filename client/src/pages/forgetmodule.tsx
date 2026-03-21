import { resetPasswordMutation } from "@/apolloClient/querys";
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface changePasswordDetails {
  username: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const ForgetModule = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<changePasswordDetails>();

  const newPasswprd = watch("newPassword");
  const [ResetPassword] = useMutation(resetPasswordMutation);

  const navigate = useNavigate();


  const inputs = [
    {
      label: "User Name",
      type: "text",
      id: "username",
      placeholder: "User Name",
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      placeholder: "Email",
    },
    {
      label: "New Password",
      type: "password",
      id: "newPassword",
      placeholder: "New Password",
    },
    {
      label: "Confirm Password",
      type: "password",
      id: "confirmPassword",
      placeholder: "Confirm Password",
    },
  ];

  const onSubmit = async (data: changePasswordDetails) => {
    const resetPasswordData = {
      username: data.username,
      email: data.email,
      password: data.newPassword,
    }
    try {
      const response = await ResetPassword({
        variables: resetPasswordData
      });
      const meassage = (response.data as { resetPassword: string }) || { resetPassword: "" }

      if (meassage?.resetPassword === "Password reset successfully") {
        toast.success(meassage?.resetPassword, { position: "top-center" });
        navigate("/login");
      } else {
        toast.error(meassage?.resetPassword, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">Enter your email address and we'll send you a OTP to reset your password</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            {inputs.map(({ id, label, placeholder, type }) => (
              <div key={"l" + id}>
                <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {label}
                </label>

                <Input
                  key={id}
                  id={id}
                  type={type}
                  autoComplete={id}
                  placeholder={placeholder}
                  {...register(id as keyof changePasswordDetails, {
                    required: `${label} is required`,
                    ...(id === "confirmPassword" && { validate: (value) => value === newPasswprd || "Passwords do not match" }),
                  })}
                />
                {errors[id as keyof changePasswordDetails] && (
                  <p className="text-red-500 text-sm">{errors[id as keyof changePasswordDetails]?.message as string}</p>
                )}
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Remember your password? </span>
          <Link to="/login" className="text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetModule;
