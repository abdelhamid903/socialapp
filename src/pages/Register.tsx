import { Button, Datepicker, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Zod from "zod";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const validSchema = Zod.object({
  name: Zod.string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be at most 20 characters"),

  email: Zod.email("Enter a valid email"),

  username: Zod.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Enter a valid username"),

  password: Zod.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain lowercase letter")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain special character"),

  rePassword: Zod.string(),

  gender: Zod.enum(["male", "female"]),

  dateOfBirth: Zod.date({
    error: "Date of birth is required",
  }),
}).refine((data) => data.password === data.rePassword, {
  error: "Passwords do not match",
  path: ["rePassword"],
});

type User = Zod.infer<typeof validSchema>;

export default function Register() {
  
    const nav=useNavigate()

 const {
  handleSubmit,
  register,
  setValue,
  formState: { errors },
} = useForm<User>({
  defaultValues: {
    name: "",
    username: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: undefined,
    gender: "male",
  },

  resolver: zodResolver(validSchema),
});


  async function handleApi(values: User) {
  try {

    const userData = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      rePassword: values.rePassword,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
    };


    const { data } = await axios.post(
      "https://route-posts.routemisr.com/users/signup",
      userData
    );

    Swal.fire({
      title: "Registration Successful!",
      text: data.message,
      icon: "success",
      confirmButtonText: "Cool",
    })
    setTimeout(() => {
        nav('/login')
    }, 2000);
    
  } catch (error) {

    if (axios.isAxiosError(error)) {
      Swal.fire({
        title: "Registration Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
}


  return (
    <form
      onSubmit={handleSubmit(handleApi)}
      className="mx-auto flex max-w-md flex-col gap-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">Your Name</Label>
        </div>

        <TextInput
          id="name"
          {...register("name")}
          type="text"
          placeholder="EX: ABDO AHMED"
        />

        {errors.name && (
          <p className="text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="username">Your Username</Label>
        </div>

        <TextInput
          id="username"
          {...register("username")}
          type="text"
          placeholder="EX: abdo123"
        />

        {errors.username && (
          <p className="text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email">Your Email</Label>
        </div>

        <TextInput
          id="email"
          {...register("email")}
          type="email"
          placeholder="name@example.com"
        />

        {errors.email && (
          <p className="text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
  <div className="mb-2 block">
    <Label htmlFor="dateOfBirth">Date Of Birth</Label>
  </div>

  <Datepicker
    id="dateOfBirth"
    autoHide={false}
    onChange={(date) => {
      if (date) {
        setValue("dateOfBirth", date, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }}
  />

  {errors.dateOfBirth && (
    <p className="text-red-600">
      {errors.dateOfBirth.message}
    </p>
  )}
</div>


      <div>
        <div className="mb-2 block">
          <Label htmlFor="gender">Select Your Gender</Label>
        </div>

        <select
          {...register("gender")}
          id="gender"
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {errors.gender && (
          <p className="text-red-600">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Your Password</Label>
        </div>

        <TextInput
          {...register("password")}
          id="password"
          type="password"
          placeholder="Password"
        />

        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="rePassword">Repeat Password</Label>
        </div>

        <TextInput
          {...register("rePassword")}
          id="rePassword"
          type="password"
          placeholder="Repeat password"
        />

        {errors.rePassword && (
          <p className="text-red-600">
            {errors.rePassword.message}
          </p>
        )}
      </div>

      <Button type="submit">
        Submit
      </Button>
    </form>
  );
}
