import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError, Input, Label, TextField } from '@heroui/react'
import { useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '../../components/Button'
import { dataUser } from '../../lib/Dummy/dataUser'
import { loginSchema } from '../../lib/Schema/loginSchema'
import type { LoginFormValues } from '../../lib/Schema/loginSchema'
import { useAuth } from '../Auth/useAuth'

const demoAccounts = [dataUser[0], dataUser[1]]

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (values: LoginFormValues) => {
    const user = login(values.email, values.password)
    if (!user) {
      setError('root', { message: 'Email atau password salah' })
      return
    }
    navigate({ to: user.role === 'admin' ? '/admin' : '/client' })
  }

  const fillDemo = (email: string, password: string) => {
    clearErrors()
    setValue('email', email, { shouldValidate: true })
    setValue('password', password, { shouldValidate: true })
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      {/* Panel brand */}
      <section className="plum-pattern relative hidden flex-col justify-between overflow-hidden p-14 lg:flex">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-gold font-display text-2xl font-bold text-plum">
            A
          </span>
          <span className="font-display text-2xl font-semibold text-gold">Assist</span>
        </div>

        <div className="max-w-md">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold/70">
            Portal Laporan Tim
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.1] text-white">
            Pantau kerja tim,
            <span className="text-gold"> dari mana saja.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-plum-100/70">
            Satu tempat untuk menyusun laporan, meninjau progres, dan menjaga
            seluruh tim tetap selaras — tanpa harus bertemu di kantor.
          </p>
        </div>

        <p className="text-xs text-plum-100/40">© 2026 Assist. Semua hak dilindungi.</p>

        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-gold/15" />
        <div className="pointer-events-none absolute -right-8 -top-8 size-80 rounded-full border border-gold/10" />
      </section>

      {/* Form */}
      <section className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid size-10 place-items-center rounded-xl bg-plum font-display text-xl font-bold text-gold">
              A
            </span>
            <span className="font-display text-xl font-semibold text-plum">Assist</span>
          </div>

          <h2 className="font-display text-4xl font-semibold text-plum">Selamat datang</h2>
          <p className="mt-2 text-sm text-muted">Masuk untuk melanjutkan ke dashboard kamu.</p>

          <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  type="email"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  isInvalid={fieldState.invalid}
                  autoComplete="email"
                >
                  <Label>Email</Label>
                  <Input ref={field.ref} placeholder="nama@assist.id" />
                  <FieldError>{fieldState.error?.message}</FieldError>
                </TextField>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  isInvalid={fieldState.invalid}
                  autoComplete="current-password"
                >
                  <Label>Password</Label>
                  <div className="relative">
                    <Input ref={field.ref} placeholder="••••••••" className="w-full pr-11" />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-plum"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </TextField>
              )}
            />

            {errors.root && (
              <p
                role="alert"
                className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
              >
                {errors.root.message}
              </p>
            )}

            <Button type="submit" size="lg" fullWidth isPending={isSubmitting}>
              <LogIn size={18} />
              Masuk
            </Button>
          </form>

          <div className="mt-8 rounded-2xl border border-dashed border-gold-600/50 bg-gold-100/60 p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-plum-700">
              <ShieldCheck size={14} /> Akun demo — klik untuk isi otomatis
            </p>
            <div className="flex flex-col gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => fillDemo(acc.email, acc.password)}
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-left text-sm shadow-sm ring-1 ring-border transition hover:ring-gold-600"
                >
                  <span>
                    <span className="block font-semibold text-plum">
                      {acc.role === 'admin' ? 'Admin' : 'Client'}
                    </span>
                    <span className="text-xs text-muted">
                      {acc.email} · {acc.password}
                    </span>
                  </span>
                  <span className="text-xs font-medium text-gold-600">Pakai</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
