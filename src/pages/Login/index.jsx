import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useSignInMutation } from '../../redux/api'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { useSelector } from 'react-redux'

export const Login = () => {
  const [signIn, { data, status }] = useSignInMutation()
  const isAuth = useSelector((state) => state.auth.isAuth)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'test@test123.ru',
      password: '12345665',
    },
    mode: 'onChange',
  })

  /* Нужно подумать как здесь обрабатывать ошибку, мб передавать ее в redux? */
  const onSubmit = async (values) => {
    const data = await signIn(values).unwrap()
    if ('token' in data) {
      window.localStorage.setItem('token', data.token)
    } else {
      alert('Не удалось авторизоваться!')
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          className={styles.field}
          error={Boolean(errors.password?.message)}
          label="Пароль"
          fullWidth
          {...register('password', { required: 'Укажите пароль' })}
          helperText={errors.password?.message}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  )
}
