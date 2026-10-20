import { Button as HeroButton } from '@heroui/react'
import type { ComponentProps } from 'react'

type HeroButtonProps = ComponentProps<typeof HeroButton>

export interface ButtonProps extends Omit<HeroButtonProps, 'variant'> {
  /** plum = aksi utama, gold = aksen/CTA, outline & ghost = aksi sekunder */
  tone?: 'plum' | 'gold' | 'outline' | 'ghost' | 'danger'
}

const toneMap = {
  plum: { variant: 'primary', className: '' },
  gold: { variant: 'primary', className: 'btn-gold' },
  outline: { variant: 'outline', className: '' },
  ghost: { variant: 'ghost', className: '' },
  danger: { variant: 'danger-soft', className: '' },
} as const

const Button = ({ tone = 'plum', className, ...props }: ButtonProps) => {
  const { variant, className: toneClass } = toneMap[tone]
  const merged = [toneClass, typeof className === 'string' ? className : '']
    .filter(Boolean)
    .join(' ')

  return <HeroButton variant={variant} className={merged || undefined} {...props} />
}

export default Button
