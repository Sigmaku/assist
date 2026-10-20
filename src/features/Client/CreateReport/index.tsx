import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError, Input, Label, ListBox, Select, TextArea, TextField } from '@heroui/react'
import { useNavigate } from '@tanstack/react-router'
import { Send } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import { REPORT_CATEGORIES, reportFormSchema } from '../../../lib/Schema/reportSchema'
import type { ReportFormValues } from '../../../lib/Schema/reportSchema'
import PageHeader from '../../common/PageHeader'
import { useReports } from '../../common/ReportProvider/useReports'
import { useAuth } from '../../Auth/useAuth'

const CreateReport = () => {
  const { user } = useAuth()
  const { addReport } = useReports()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: { title: '', category: '', summary: '' },
  })

  const onSubmit = (values: ReportFormValues) => {
    if (!user) return
    addReport(user.id, values)
    navigate({ to: '/client/reports' })
  }

  return (
    <>
      <PageHeader
        eyebrow="Client"
        title="Buat Laporan"
        description="Tulis laporan singkat dan jelas. Leader akan meninjaunya setelah dikirim."
      />

      <Card className="max-w-2xl">
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                isInvalid={fieldState.invalid}
              >
                <Label>Judul laporan</Label>
                <Input ref={field.ref} placeholder="Contoh: Progres modul pembayaran" />
                <FieldError>{fieldState.error?.message}</FieldError>
              </TextField>
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                fullWidth
                placeholder="Pilih kategori"
                value={field.value || null}
                onChange={(key) => field.onChange(key ?? '')}
                onBlur={field.onBlur}
                isInvalid={fieldState.invalid}
              >
                <Label>Kategori</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {REPORT_CATEGORIES.map((c) => (
                      <ListBox.Item key={c} id={c} textValue={c}>
                        {c}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Select>
            )}
          />

          <Controller
            name="summary"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                isInvalid={fieldState.invalid}
              >
                <Label>Isi laporan</Label>
                <TextArea
                  ref={field.ref}
                  rows={6}
                  placeholder="Apa yang sudah dikerjakan, hasilnya, dan kendala (jika ada)…"
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </TextField>
            )}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button tone="outline" onPress={() => navigate({ to: '/client/reports' })}>
              Batal
            </Button>
            <Button type="submit" isPending={isSubmitting}>
              <Send size={16} /> Kirim laporan
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
}

export default CreateReport
