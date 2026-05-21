// @ts-nocheck
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"

export default {
  title: "Componentes Nativos/Tabs",
  component: Tabs,
  tags: ["autodocs"],
}

export const TabsPlayground = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-body-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-body-sm text-muted-foreground">
          Change your password here.
        </p>
      </TabsContent>
    </Tabs>
  ),
}

export const TabsGallery = {
  render: () => (
    <div className="space-y-6 w-full">
      <section>
        <h2 className="text-label-md font-semibold mb-3 text-muted-foreground">Default</h2>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p className="text-body-sm text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </TabsContent>
          <TabsContent value="password">
            <p className="text-body-sm text-muted-foreground">
              Change your password here.
            </p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-body-sm text-muted-foreground">
              Manage your application settings.
            </p>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  ),
}
