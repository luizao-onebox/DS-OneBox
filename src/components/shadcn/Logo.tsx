import * as React from "react"
import { cn } from "../../lib/utils"

import logoLight from "../../assets/logos/logo-light.svg"
import logoDark from "../../assets/logos/logo-dark.svg"
import logoIconLight from "../../assets/logos/logo-icon-light.svg"
import logoIconDark from "../../assets/logos/logo-icon-dark.svg"

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tipo do logo a ser renderizado.
   * 'full' = Logotipo completo com nome "onebox"
   * 'icon' = Apenas o ícone (Bolinha com o recorte)
   */
  variant?: "full" | "icon"
  /**
   * Força um tema específico para o logo.
   * Se não fornecido, o logo adotará o padrão 'light'.
   */
  theme?: "light" | "dark" | "auto"
}

export function Logo({ 
  className, 
  variant = "full", 
  theme = "light",
  ...props 
}: LogoProps) {
  
  const isIcon = variant === "icon"
  const lightSrc = isIcon ? logoIconLight : logoLight
  const darkSrc = isIcon ? logoIconDark : logoDark

  // Renderiza a versão clara (padrão)
  if (theme === "light") {
    return (
      <div className={cn("flex items-center justify-center", className)} {...props}>
        <img 
          src={lightSrc} 
          alt={`Onebox ${variant} logo`} 
          className="h-full w-full object-contain"
        />
      </div>
    )
  }

  // Renderiza a versão escura
  if (theme === "dark") {
    return (
      <div className={cn("flex items-center justify-center", className)} {...props}>
        <img 
          src={darkSrc} 
          alt={`Onebox ${variant} logo`} 
          className="h-full w-full object-contain"
        />
      </div>
    )
  }

  // Renderiza auto adaptável (muda sozinho usando classes Tailwind)
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <img 
        src={lightSrc} 
        alt={`Onebox ${variant} logo`} 
        className="h-full w-full object-contain dark:hidden block"
      />
      <img 
        src={darkSrc} 
        alt={`Onebox ${variant} logo`} 
        className="h-full w-full object-contain dark:block hidden"
      />
    </div>
  )
}
