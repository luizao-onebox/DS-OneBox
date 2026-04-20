import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./Command"

export default {
  title: "Components/Command",
  component: CommandDialog,
  tags: ["autodocs"],
}

export const CommandPlayground = {
  render: () => (
    <CommandDialog open={false}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>Create Project</CommandItem>
          <CommandItem>Delete Project</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
}

export const CommandGallery = {
  render: () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Command Palette</h2>
        <CommandDialog open={true}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem>Create Project</CommandItem>
              <CommandItem>Delete Project</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </section>
    </div>
  ),
}
