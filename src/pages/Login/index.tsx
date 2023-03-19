import React, {FormEvent} from "react";
import styles from './Login.module.scss';
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material';
import useFormWithValidation from "../../utils/useFormWithValidation";
import {authorize} from "../../utils/AuthApi";

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const {values, errors, isValid, handleChange} = useFormWithValidation({user: '', password: ''}, {user: '', password: ''})

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleLogin = async () => {
        try {
            const token = await authorize<string>(values.user, values.password)
            localStorage.setItem('JWT', token)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleLogin()
    }

    return (
        <main className={styles.page}>
            <h1>Вход в систему</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    error={!!errors.user}
                    required
                    sx={{ mb: '10px', width: '300px' }}
                    inputProps={{pattern: '^user[0-9]{1,}'}}
                    label="user"
                    name="user"
                    helperText={errors.user}
                    variant="standard"
                    value={values.user}
                    onChange={handleChange}
                />
                <FormControl sx={{ mb: '70px', width: '300px' }} error={!!errors.password} variant="standard">
                    <InputLabel htmlFor="input-pass">password</InputLabel>
                    <Input
                        required
                        inputProps={{minLength: 8}}
                        id="input-pass"
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText>{errors.password}</FormHelperText>
                </FormControl>
                {/*<FormHelperText>Error</FormHelperText>*/}
                <Button type='submit' variant="contained" disabled={!isValid}>Войти</Button>
            </form>
        </main>
    )
}

export default Login
