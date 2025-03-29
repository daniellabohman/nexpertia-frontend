'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormControl, InputLabel, OutlinedInput, FormHelperText, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  Firstname: z.string().min(1, { message: 'Fornavn skal udfyldes' }),
  Lastname: z.string().min(1, { message: 'Efternavn skal udfyldes' }),
  email: z.string().min(1, { message: 'Email skal udfyldes' }).email(),
  password: z.string().min(6, { message: 'Password skal være mindst 6 karakterer' }),
});

type Values = z.infer<typeof schema>;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', {  
        first_name: values.Firstname,
        last_name: values.Lastname,
        email: values.email,
        password: values.password,
      });

      if (response.status === 201) {
        router.push('/auth/login'); // Redirect til login-side
      }
    } catch (error) {
      console.error('Fejl ved registrering:', error);
      // Eventuelt vis fejlmeddelelse i UI
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormControl error={Boolean(errors.Firstname)}>
          <InputLabel>Fornavn</InputLabel>
          <OutlinedInput {...register("Firstname")} />
          {errors.Firstname && <FormHelperText>{errors.Firstname.message}</FormHelperText>}
        </FormControl>

        <FormControl error={Boolean(errors.Lastname)}>
          <InputLabel>Efternavn</InputLabel>
          <OutlinedInput {...register("Lastname")} />
          {errors.Lastname && <FormHelperText>{errors.Lastname.message}</FormHelperText>}
        </FormControl>

        <FormControl error={Boolean(errors.email)}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput type="email" {...register("email")} />
          {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
        </FormControl>

        <FormControl error={Boolean(errors.password)}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput type="password" {...register("password")} />
          {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
        </FormControl>

        <Button type="submit" variant="contained">Tilmeld</Button>
      </Stack>
    </form>
  );
}
