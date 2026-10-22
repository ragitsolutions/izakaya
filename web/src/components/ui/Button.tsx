import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 px-7 py-3 text-sm tracking-wide uppercase transition-colors duration-200 focus-visible:outline-offset-4 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-paper hover:bg-accent-dark',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:text-accent',
}

interface CommonProps {
  variant?: Variant
  className?: string
  children: ReactNode
}

type ButtonAsLink = CommonProps & Omit<LinkProps, 'className' | 'children'>
type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { to?: never }
type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never }

type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if ('to' in rest && rest.to !== undefined) {
    const linkProps = rest as Omit<LinkProps, 'className' | 'children'>
    return (
      <Link className={classes} {...linkProps}>
        {children}
      </Link>
    )
  }

  if ('href' in rest && rest.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
