import { Alert, AlertDescription, AlertTitle } from "./Alert"

export default {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
}

export const AlertPlayground = {
  render: () => (
    <Alert>
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>
        This is a default alert message.
      </AlertDescription>
    </Alert>
  ),
}

export const AlertGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Variants</h2>
        <div className="flex flex-col gap-4">
          <Alert>
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>Default alert variant.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Destructive</AlertTitle>
            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved successfully.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This action may have unintended consequences.</AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  ),
}
