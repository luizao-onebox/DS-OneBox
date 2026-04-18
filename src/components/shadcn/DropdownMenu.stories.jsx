import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu"
import { Button } from "./Button"

export default {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
}

export const DropdownMenuPlayground = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>New Tab</DropdownMenuItem>
        <DropdownMenuItem>New Window</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Print</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const DropdownMenuGallery = {
  render: () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>New Tab</DropdownMenuItem>
            <DropdownMenuItem>New Window</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Print</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">With Labels</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Team</DropdownMenuLabel>
            <DropdownMenuItem>Add Team Member</DropdownMenuItem>
            <DropdownMenuItem>Remove Team Member</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Checkbox Items</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">Preferences</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>Show Toolbar</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Show Sidebar</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Show Status Bar</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  ),
}
