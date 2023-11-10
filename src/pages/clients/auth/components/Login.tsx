import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../../Theme/color";
import { BaseAPi } from "../../../../configs/BaseApi";
import HttpAccountController from "../../../../submodules/controllers/http/httpAccountController";
import { User } from "../../../../submodules/models/UserModel/User";

const Login = () => {
  const http = new HttpAccountController(BaseAPi);
  const redirect = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({
    mode: "all",
  });
  const handleLogin = async (data: User) => {
    try {
      const login = await http.login(data);
      if (login) {
        toast.success("Login successful", {
          position: "bottom-right",
        });
        const { account, token } = login;
        localStorage.setItem("user", JSON.stringify(account));
        localStorage.setItem("token", JSON.stringify(token));
      }
      redirect("/");
    } catch (err: any) {
      if (err.response.data.message === "invalid email") {
        toast.error("Invalid email exits", {
          position: "bottom-right",
        });
      }
      if (err.response.data.message === "Invalid password.") {
        toast.error("sai password", {
          position: "bottom-right",
        });
      }
    }
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
      <FormControl
        sx={{
          mt: "10px",
        }}
        fullWidth
      >
        <label>Email</label>
        <Controller
          control={control}
          name="email"
          defaultValue="" // Set an initial value here
          rules={{
            required: "Vui lòng nhập email của bạn!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              key={2}
              fullWidth
              placeholder="Vui lòng nhập Email của bạn!"
            />
          )}
        />
      </FormControl>
      <Typography variant="caption" color={color.error}>
        {errors.email && errors.email.message}
      </Typography>
      <FormControl
        sx={{
          mt: "20px",
        }}
        fullWidth
      >
        <label>Mật khẩu</label>
        <Controller
          control={control}
          defaultValue="" // Set an initial value here
          name="password"
          rules={{
            required: "Vui lòng nhập mật khẩu của bạn!",
          }}
          render={({ field }) => (
            <OutlinedInput
              key={1}
              {...field}
              fullWidth
              placeholder="Vui lòng nhập mật khẩu"
            />
          )}
        />
      </FormControl>
      <Typography variant="caption" color={color.error}>
        {errors.password && errors.password.message}
      </Typography>
      <Typography
        variant="caption"
        display={"flex"}
        textAlign={"end"}
        justifyContent={"end"}
        pt={2}
      >
        <Link to={"ChangePassword"} style={{ color: "red" }}>
          Đổi mật khẩu
        </Link>
      </Typography>
      <Box
        mt={2}
        sx={{
          clear: "both",
          display: "flex",
          direction: "column",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          variant="outlined"
          style={{
            width: "100%",
            fontSize: "12px",
            fontWeight: "bold",
            background: "#BDB5B5",
            color: "#000",
            border: "none",
            padding: "8px 0",
          }}
        >
          Đăng nhập
        </Button>
      </Box>
      <Box
        mt={2}
        sx={{
          clear: "both",
          display: "flex",
          direction: "column",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          variant="outlined"
          style={{
            width: "100%",
            fontSize: "12px",
            fontWeight: "bold",
            background: "#2489F4",
            color: "#fff",
            border: "none",
            padding: "8px 0",
          }}
        >
          Đăng nhập bằng facebook
        </Button>
      </Box>
    </form>
  );
};

export default Login;
