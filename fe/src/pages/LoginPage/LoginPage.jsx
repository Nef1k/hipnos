import s from './LoginPage.module.css';
import {Box, Button, Link, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {axiosInstance} from "../../api/axios";

const LoginPage = () => {
  const {auth, setAuth} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('Произошла какая-то дичь');

  useEffect(() => {
    if (auth?.accessToken) {
      navigate(from, {replace: true});
    }
  }, []);
  useEffect(() => {
    setError('');
  }, [username, password]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const tokenResponse = await axiosInstance.post('users/token/', {
        username, password
      }, {withCredentials: true});
      const accessToken = tokenResponse?.data?.access;

      setAuth({username, accessToken});

      setUsername('');
      setPassword('');

      navigate(from, {replace: true});
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 400) {
        setError('Неправильный логин или пароль');
      } else {
        setError('Ошибка сервера. Попробуйте позднее');
      }
    }
  }

  return (
    <Box className={s.mainWrapper}>
      <Box component="form" onSubmit={handleFormSubmit} className={s.formWrapper}>
        <TextField
          fullWidth
          required
          autoFocus
          label="Имя пользователя"
          id="username"
          autoComplete="username"
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
        <TextField
          fullWidth
          required
          label="Пароль"
          id="password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >Войти</Button>
        <Box className={s.bottomLinks}>
          <Link href="/hipnos">
            <Typography>Экран ГИПНОСа</Typography>
          </Link>
          <Link href="/no" style={{marginLeft: "20px"}}>
            <Typography>Помощь</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage;
