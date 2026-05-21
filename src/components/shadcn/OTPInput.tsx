import * as React from "react"
import { cn } from "../../lib/utils"

interface OTPInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  length?: number
  onChange?: (value: string) => void
  error?: boolean
}

const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  ({ className, length = 6, onChange, error = false, disabled, ...props }, ref) => {
    const [otp, setOtp] = React.useState<string[]>(Array(length).fill(""))
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (value: string, index: number) => {
      if (!/^\d*$/.test(value)) return

      const newOtp = [...otp]
      newOtp[index] = value.slice(-1)
      setOtp(newOtp)
      onChange?.(newOtp.join(""))

      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
      if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
      const newOtp = [...otp]
      pastedData.split("").forEach((char, i) => {
        if (i < length) newOtp[i] = char
      })
      setOtp(newOtp)
      onChange?.(newOtp.join(""))
      const lastFilledIndex = Math.min(pastedData.length, length) - 1
      inputRefs.current[lastFilledIndex]?.focus()
    }

    return (
      <div ref={ref} className={cn("flex gap-2", className)}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              "h-12 w-10 rounded-md border text-center text-body-lg font-semibold transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-destructive focus-visible:ring-destructive/50"
                : "border-input bg-background hover:border-primary/50",
              otp[index] && !error && "border-primary bg-primary/5"
            )}
            {...props}
          />
        ))}
      </div>
    )
  }
)
OTPInput.displayName = "OTPInput"

export { OTPInput }
