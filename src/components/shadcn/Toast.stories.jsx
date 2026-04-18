import { Toast, ToastTitle, ToastDescription } from "./Toast"
import { Button } from "./Button"

export default {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
}

export const ToastPlayground = {
  render: () => (
    <Toast>
      <div className="grid gap-1">
        <ToastTitle>Scheduled: Catch up</ToastTitle>
        <ToastDescription>
          Friday, February 10, 2024 at 5:57 PM
        </ToastDescription>
      </div>
    </Toast>
  ),
}

export const ToastGallery = {
  render: () => (
    <div className="flex flex-col gap-3">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Default</h2>
        <Toast>
          <div className="grid gap-1">
            <ToastTitle>Scheduled: Catch up</ToastTitle>
            <ToastDescription>Friday, February 10, 2024 at 5:57 PM</ToastDescription>
          </div>
        </Toast>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Success</h2>
        <Toast>
          <div className="grid gap-1">
            <ToastTitle>Success</ToastTitle>
            <ToastDescription>Your changes have been saved successfully.</ToastDescription>
          </div>
        </Toast>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Error</h2>
        <Toast>
          <div className="grid gap-1">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>Something went wrong. Please try again.</ToastDescription>
          </div>
        </Toast>
      </section>
    </div>
  ),
}
