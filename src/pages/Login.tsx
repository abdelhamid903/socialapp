import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Zod from "zod";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const validSchema = Zod.object({
    email: Zod.email("Enter a valid email"),

    password: Zod.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain lowercase letter")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain special character"),

})

type User = Zod.infer<typeof validSchema>;

export default function Login() {
    let {setUser}=useContext(AuthContext)
    const nav=useNavigate()

 const {
  handleSubmit,
  register,
  formState: { errors },
} = useForm<User>({
  defaultValues: {
    
    email: "",
    password: "",
  },

  resolver: zodResolver(validSchema),
});


  async function handleApi(values: User) {
  try {

    const userData = {
      email: values.email,
      password: values.password
    };


    const { data } = await axios.post(
      "https://route-posts.routemisr.com/users/signin",
      userData
    );

    Swal.fire({
      title: "Registration Successful!",
      text: data.message,
      icon: "success",
      confirmButtonText: "Cool",
    })

    setUser(data?.data?.user)
    localStorage.setItem('userToken',data.data.token)
    setTimeout(() => {
        nav('/feed')
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


      <Button type="submit">
        Submit
      </Button>
    </form>
  );
}
