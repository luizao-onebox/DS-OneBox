/**
 * Button component with support for multiple variants, sizes, and icons.
 * @see {@link https://ui.shadcn.com/docs/components/button}
 */
import { Button } from "./Button"
import { Badge } from "./Badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./Card"
import { Mail, Download, Plus, Trash2, Edit, Save, Settings, Bell, Heart, Search, User, PlusCircle, ArrowLeft, ArrowRight, Share2, Home, Star } from "lucide-react"

const iconOptions = {
  None: null,
  Mail,
  Download,
  Plus,
  Trash2,
  Edit,
  Save,
  Settings,
  Bell,
  Heart,
  Search,
  User,
  PlusCircle,
  ArrowLeft,
  ArrowRight,
  Share2,
  Home,
  Star,
}

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "destructiveOutline", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    icon: {
      control: "select",
      options: Object.keys(iconOptions),
      mapping: iconOptions,
    },
    iconPosition: {
      control: "radio",
      options: ["left", "right"],
    },
    disabled: {
      control: "boolean",
    },
  },
}

export const ButtonPlayground = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    icon: "None",
    iconPosition: "left",
    disabled: false,
  },
  render: (args) => {
    const { icon, ...rest } = args
    return <Button {...rest} icon={icon || undefined} />
  },
}

export const ButtonGallery = {
  render: () => (
    <div className="space-y-8 p-6">
      <section>
        <h2 className="text-lg font-semibold mb-4">Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="destructiveOutline">Destructive Outline</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">With Icons</h2>
        <div className="flex flex-wrap gap-3">
          <Button icon={Mail} iconPosition="left">Email</Button>
          <Button icon={Download} iconPosition="right">Download</Button>
          <Button icon={Plus}>New Item</Button>
          <Button icon={Save} variant="secondary">Save</Button>
          <Button icon={Trash2} variant="destructive">Delete</Button>
          <Button icon={Edit} variant="outline">Edit</Button>
          <Button icon={Settings} variant="ghost">Settings</Button>
          <Button icon={Search} variant="outline">Search</Button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Icon Only</h2>
        <div className="flex items-center gap-3">
          <Button icon={Bell} size="icon" variant="default" />
          <Button icon={Plus} size="icon" variant="outline" />
          <Button icon={Heart} size="icon" variant="ghost" />
          <Button icon={Star} size="icon" variant="secondary" />
          <Button icon={Trash2} size="icon" variant="destructive" />
          <Button icon={Home} size="icon" />
          <Button icon={Search} size="icon" variant="outline" />
          <Button icon={Settings} size="icon" variant="ghost" />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Sizes</h2>
        <div className="flex items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon-sm" icon={Plus} />
          <Button size="icon" icon={Bell} />
          <Button size="icon-lg" icon={PlusCircle} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Disabled</h2>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Default</Button>
          <Button disabled variant="outline">Outline</Button>
          <Button disabled variant="secondary">Secondary</Button>
          <Button disabled variant="destructive">Destructive</Button>
          <Button disabled icon={Bell}>With Icon</Button>
          <Button disabled icon={Plus} size="icon" />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Use Cases</h2>
        <div className="flex flex-wrap gap-3">
          <Button icon={Plus}>Create New</Button>
          <Button icon={Save} variant="secondary">Save Changes</Button>
          <Button icon={Trash2} variant="destructive">Delete</Button>
          <Button icon={Share2} variant="ghost">Share</Button>
          <Button icon={ArrowLeft} iconPosition="left">Back</Button>
          <Button icon={ArrowRight} iconPosition="right">Next</Button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">With Badge</h2>
        <div className="flex items-center gap-3">
          <Button icon={Bell}>
            Notifications
            <Badge variant="secondary" className="ml-2">3</Badge>
          </Button>
          <Button icon={Heart}>
            Likes
            <Badge variant="destructive" className="ml-2">99+</Badge>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">In Context</h2>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
            <CardDescription>Manage your project preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email notifications</span>
              <Button size="sm" icon={Settings}>Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Team members</span>
              <Button size="sm" variant="secondary" icon={User}>Manage</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-destructive">Danger zone</span>
              <Button size="sm" variant="destructiveOutline" icon={Trash2}>Delete</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  ),
}