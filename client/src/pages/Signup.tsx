import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import ifpbLogo from '../assets/ifpb.svg';

const signupSchema = z.object({
  name: z
    .string({ required_error: 'O nome não pode estar vazio' })
    .min(3, 'O nome deve ter pelo menos 3 letras'),
  registration: z
    .string({ required_error: 'A matrícula não pode estar vazia' })
    .min(4, 'A matrícula deve ter pelo menos 4 caracteres'),
  email: z
    .string({ required_error: 'Endereço de e-mail inválido' })
    .email('Endereço de e-mail inválido'),
  phone: z
    .string({ required_error: 'Número de telefone inválido' })
    .min(8, 'O telefone deve ter pelo menos 8 digitos'),
  password: z
    .string({ required_error: 'Senha deve ter ao menos 6 caracteres' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type ILogin = z.infer<typeof signupSchema>;

export function Signup() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ILogin>({
      resolver: zodResolver(signupSchema),
    });

    function handleSignup(data: ILogin) {
      console.log(data);
    }

  return (
    <main className="bg-slate-100 h-screen w-screen flex items-center justify-center gap-20">
      <img src={ifpbLogo} alt="IFPB" width={260} />

      <div className="bg-white px-14 py-8 h-[750px] flex flex-col items-center justify-center w-[527px] gap-20">
        <div className="text-center">
          <h1 className="text-4xl text-gray-600 font-semibold">Cadastrar-se</h1>
        </div>

        <div className="w-full max-w-80 gap-5 flex flex-col">
          <Input
            {...register('name')}
            placeholder="Nome"
            name="name"
            error={errors.name?.message}
            autoComplete="off"
          />

          <Input
            {...register('registration')}
            placeholder="Matrícula"
            name="registration"
            error={errors.registration?.message}
            autoComplete="off"
          />

          <Input
            {...register('email')}
            placeholder="Email"
            inputMode="email"
            name="email"
            error={errors.email?.message}
          />

          <Input
            {...register('phone')}
            placeholder="Telefone"
            inputMode="tel"
            name="phone"
            error={errors.phone?.message}
            autoComplete='off'
          />

          <Input
            {...register('password')}
            placeholder="Senha"
            type="password"
            name="password"
            error={errors.password?.message}
          />

          <Button onClick={handleSubmit(handleSignup)}>Cadastrar-se</Button>

          <span className="text-center text-gray-600">Já possui cadastro?</span>

          <Link
            to="/login"
            className="underline text-blue-500 font-medium text-center"
          >
            Faça o login aqui!
          </Link>
        </div>
      </div>
    </main>
  );
}